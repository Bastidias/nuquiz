import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Navigation from '@/components/Navigation';
import { Inter, Roboto_Mono } from 'next/font/google';
import styles from '@/styles/Dashboard.module.css';
import { getSessionSSR } from '@/lib/auth-helpers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

interface DashboardProps {
  user: {
    email: string;
    username: string | null;
    role: string;
  };
}

interface ContentPack {
  id: number;
  name: string;
  description: string | null;
}

export default function Dashboard({ user }: DashboardProps) {
  const [subscriptions, setSubscriptions] = useState<ContentPack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/users/me/subscriptions');
        if (response.ok) {
          const result = await response.json();
          setSubscriptions(result.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch subscriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard - Nuquiz</title>
        <meta name="description" content="Your Nuquiz dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${inter.variable} ${robotoMono.variable}`}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.container}>
            <h1>Welcome to Nuquiz</h1>
            <div className={styles.userCard}>
              <h2>Your Profile</h2>
              <div className={styles.userInfo}>
                <div className={styles.field}>
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                {user.username && (
                  <div className={styles.field}>
                    <label>Username:</label>
                    <span>{user.username}</span>
                  </div>
                )}
                <div className={styles.field}>
                  <label>Role:</label>
                  <span className={styles.roleBadge}>{user.role}</span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>My Subscriptions</h2>
              {loading ? (
                <p>Loading...</p>
              ) : subscriptions.length === 0 ? (
                <div>
                  <p>You haven't subscribed to any content packs yet.</p>
                  <div className={styles.ctas}>
                    <a href="/content-packs" className={styles.primary}>
                      Browse Content Packs
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.packList}>
                    {subscriptions.map((pack) => (
                      <Link
                        key={pack.id}
                        href={`/content-packs/${pack.id}`}
                        className={styles.packItem}
                      >
                        <h3>{pack.name}</h3>
                        <p>{pack.description || 'No description'}</p>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.ctas} style={{ marginTop: '24px' }}>
                    <a href="/content-packs" className={styles.primary}>
                      Browse More Packs
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSessionSSR(context);

  // Redirect to login if not authenticated
  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session.user.email,
        username: session.user.name || null,
        role: session.user.role || 'student',
      },
    },
  };
};
