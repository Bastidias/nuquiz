import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Navigation from '@/components/Navigation';
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

interface ContentPackDetails {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  subscriber_count: number;
  user_has_access: boolean;
}

export default function ContentPackDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [pack, setPack] = useState<ContentPackDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscribing, setSubscribing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [startingQuiz, setStartingQuiz] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPack = async () => {
      try {
        const response = await fetch(`/api/content-packs/${id}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch content pack');
        }

        const result = await response.json();
        setPack(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPack();
  }, [id]);

  const handleSubscribe = async () => {
    if (!id || subscribing) return;

    setSubscribing(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/content-packs/${id}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to subscribe');
      }

      setSuccessMessage('Successfully subscribed!');

      // Refresh pack data to update subscription status
      const refreshResponse = await fetch(`/api/content-packs/${id}`);
      if (refreshResponse.ok) {
        const refreshResult = await refreshResponse.json();
        setPack(refreshResult.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubscribing(false);
    }
  };

  const handleStartQuiz = async () => {
    if (!id || startingQuiz) return;

    setStartingQuiz(true);
    setError(null);

    try {
      const response = await fetch('/api/quiz-sessions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content_pack_id: parseInt(id as string, 10),
          question_count: 10,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create quiz');
      }

      const result = await response.json();
      router.push(`/quiz/${result.session_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStartingQuiz(false);
    }
  };

  return (
    <>
      <Head>
        <title>{pack?.name || 'Content Pack'} - Nuquiz</title>
        <meta name="description" content={pack?.description || 'Content pack details'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${inter.variable} ${robotoMono.variable}`}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.detailsContainer}>
            <Link href="/content-packs" className={styles.backLink}>
              ← Back to Content Packs
            </Link>

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            {successMessage && (
              <div className={styles.success}>
                {successMessage}
              </div>
            )}

            {loading ? (
              <p>Loading content pack...</p>
            ) : !pack ? (
              <div className={styles.empty}>
                <p>Content pack not found.</p>
              </div>
            ) : (
              <div className={styles.detailsCard}>
                <h2>{pack.name}</h2>

                <p>
                  {pack.description || 'No description available'}
                </p>

                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <label>Subscribers</label>
                    <span>{pack.subscriber_count}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <label>Status</label>
                    <span>{pack.is_active ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>

                {pack.user_has_access ? (
                  <div>
                    <div className={styles.subscribedBadge}>
                      ✓ Subscribed
                    </div>
                    <button
                      onClick={handleStartQuiz}
                      disabled={startingQuiz}
                      className={styles.button}
                      style={{ marginTop: '1rem' }}
                    >
                      {startingQuiz ? 'Starting Quiz...' : 'Start Quiz (10 Questions)'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    disabled={subscribing || !pack.is_active}
                    className={styles.button}
                  >
                    {subscribing ? 'Subscribing...' : 'Subscribe'}
                  </button>
                )}
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
    props: {},
  };
};
