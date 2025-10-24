import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Navigation from '@/components/Navigation';
import Button from '@/components/atoms/Button';
import { Inter, Roboto_Mono } from 'next/font/google';
import styles from '@/styles/ContentPacks.module.css';
import { getSessionSSR } from '@/lib/auth-helpers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

interface ContentPack {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ContentPacksPageProps {
  isAdmin: boolean;
}

export default function ContentPacksPage({ isAdmin }: ContentPacksPageProps) {
  const [packs, setPacks] = useState<ContentPack[]>([]);
  const [subscribedIds, setSubscribedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all packs
        const packsResponse = await fetch('/api/content-packs');
        if (!packsResponse.ok) {
          throw new Error('Failed to fetch content packs');
        }
        const packsResult = await packsResponse.json();
        setPacks(packsResult.data || []);

        // Fetch subscriptions
        const subsResponse = await fetch('/api/users/me/subscriptions');
        if (subsResponse.ok) {
          const subsResult = await subsResponse.json();
          const ids = new Set((subsResult.data || []).map((p: ContentPack) => p.id));
          setSubscribedIds(ids);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Content Packs - Nuquiz</title>
        <meta name="description" content="Browse and subscribe to content packs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${inter.variable} ${robotoMono.variable}`}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.container}>
            <h1>Content Packs</h1>

            {isAdmin && (
              <div style={{ marginBottom: '24px' }}>
                <Link href="/admin/content-packs/create">
                  <Button>Create New Pack</Button>
                </Link>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            {loading ? (
              <p>Loading content packs...</p>
            ) : packs.length === 0 ? (
              <div className={styles.empty}>
                <p>No content packs available yet.</p>
                <p>Check back soon!</p>
              </div>
            ) : (
              <div className={styles.packGrid}>
                {packs.map((pack) => (
                  <Link
                    key={pack.id}
                    href={`/content-packs/${pack.id}`}
                    className={styles.packCard}
                  >
                    <h3>
                      {pack.name}
                      {subscribedIds.has(pack.id) && (
                        <span className={styles.subscribedBadge}>✓</span>
                      )}
                    </h3>
                    <p>
                      {pack.description || 'No description available'}
                    </p>
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
      isAdmin: session.user.role === 'admin' || session.user.role === 'superadmin',
    },
  };
};
