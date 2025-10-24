import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Navigation from '@/components/Navigation';
import Button from '@/components/atoms/Button';
import { Inter, Roboto_Mono } from 'next/font/google';
import styles from '@/styles/ContentPacks.module.css';
import { getSessionSSR } from '@/lib/auth-helpers';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const robotoMono = Roboto_Mono({ variable: '--font-roboto-mono', subsets: ['latin'] });

interface ContentPack {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export default function MyContentPacks() {
  const [packs, setPacks] = useState<ContentPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await fetch('/api/content-packs/mine');
        if (!response.ok) throw new Error('Failed to fetch packs');

        const result = await response.json();
        setPacks(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPacks();
  }, []);

  return (
    <>
      <Head>
        <title>My Content Packs - Nuquiz</title>
      </Head>
      <div className={`${inter.variable} ${robotoMono.variable}`}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.container}>
            <h1>My Content Packs</h1>

            <div style={{ marginBottom: '24px' }}>
              <Link href="/admin/content-packs/create">
                <Button>Create New Pack</Button>
              </Link>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {loading ? (
              <p>Loading...</p>
            ) : packs.length === 0 ? (
              <div className={styles.empty}>
                <p>You haven't created any content packs yet.</p>
                <Link href="/admin/content-packs/create">
                  <Button>Create Your First Pack</Button>
                </Link>
              </div>
            ) : (
              <div className={styles.packGrid}>
                {packs.map((pack) => (
                  <Link key={pack.id} href={`/content-packs/${pack.id}`} className={styles.packCard}>
                    <h3>{pack.name}</h3>
                    <p>{pack.description || 'No description'}</p>
                    <div className={styles.meta}>
                      <span>{pack.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
