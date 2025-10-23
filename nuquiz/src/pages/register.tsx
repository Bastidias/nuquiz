import { useState, FormEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';
import styles from '@/styles/Auth.module.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setPasswordWarning('');
    setLoading(true);

    try {
      // Call registration API
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username: username || undefined,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Show password warning if present
      if (data.passwordWarning) {
        setPasswordWarning(
          `${data.passwordWarning.warning}. ${data.passwordWarning.suggestions.join('. ')}`
        );
      }

      // Auto-login after successful registration
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError('Account created but login failed. Please try logging in manually.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - Nuquiz</title>
        <meta name="description" content="Create your Nuquiz account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <div className={styles.card}>
            <h1>Create Account</h1>
            <p className={styles.subtitle}>
              Start mastering knowledge through comparison
            </p>

            {error && <div className={styles.error}>{error}</div>}
            {passwordWarning && (
              <div className={styles.warning}>{passwordWarning}</div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="username">Username (optional)</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  disabled={loading}
                  placeholder="Leave blank to use email"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="password">Password *</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                  minLength={8}
                />
                <span className={styles.hint}>
                  Minimum 8 characters. We recommend a strong password with
                  uppercase, lowercase, and numbers.
                </span>
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <p className={styles.footer}>
              Already have an account?{' '}
              <Link href="/login">Log in</Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
