import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Navigation from '@/components/Navigation';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { Inter, Roboto_Mono } from 'next/font/google';
import styles from '@/styles/ContentPacks.module.css';
import { getSessionSSR } from '@/lib/auth-helpers';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const robotoMono = Roboto_Mono({ variable: '--font-roboto-mono', subsets: ['latin'] });

export default function CreateContentPack() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/content-packs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create content pack');
      }

      router.push('/admin/content-packs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Content Pack - Nuquiz</title>
      </Head>
      <div className={`${inter.variable} ${robotoMono.variable}`}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.detailsContainer}>
            <a href="/admin/dashboard" className={styles.backLink}>
              ← Back to Admin Dashboard
            </a>

            <div className={styles.detailsCard}>
              <h2>Create Content Pack</h2>

              {error && <div className={styles.error}>{error}</div>}

              <form onSubmit={handleSubmit}>
                <Input
                  label="Pack Name"
                  value={name}
                  onChange={setName}
                  placeholder="Medical Terminology"
                  required
                />

                <Input
                  label="Description"
                  value={description}
                  onChange={setDescription}
                  placeholder="Common medical terms and definitions"
                  type="textarea"
                />

                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Content Pack'}
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSessionSSR(context);

  if (!session?.user) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  if (session.user.role !== 'admin' && session.user.role !== 'superadmin') {
    return { redirect: { destination: '/dashboard', permanent: false } };
  }

  return { props: {} };
};
