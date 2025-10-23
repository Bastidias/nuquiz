import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Navigation from '@/components/Navigation';
import { Inter, Roboto_Mono } from 'next/font/google';
import styles from '@/styles/Dashboard.module.css';

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

export default function Dashboard({ user }: DashboardProps) {
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
              <h2>Getting Started</h2>
              <p>
                Welcome! You can now browse and subscribe to content packs.
                Once subscribed, you'll be able to take quizzes and track your progress.
              </p>
              <div className={styles.ctas}>
                <a href="/content-packs" className={styles.primary}>
                  Browse Content Packs
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, {});

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
        role: (session.user as any).role || 'student',
      },
    },
  };
};
