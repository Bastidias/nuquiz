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

interface AdminDashboardProps {
  user: {
    email: string;
    username: string | null;
    role: string;
  };
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  return (
    <>
      <Head>
        <title>Admin Dashboard - Nuquiz</title>
        <meta name="description" content="Admin dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${inter.variable} ${robotoMono.variable}`}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.container}>
            <h1>Admin Dashboard</h1>

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
              <h2>Content Management</h2>
              <p>
                As an admin, you can create and manage content packs for students.
              </p>
              <div className={styles.ctas}>
                <Link href="/admin/content-packs/create" className={styles.primary}>
                  Create New Content Pack
                </Link>
                <Link href="/admin/content-packs" className={styles.primary}>
                  My Content Packs
                </Link>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Quick Links</h2>
              <div className={styles.ctas}>
                <Link href="/content-packs" className={styles.primary}>
                  Browse All Content Packs
                </Link>
                <Link href="/dashboard" className={styles.primary}>
                  Student Dashboard
                </Link>
              </div>
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

  // Redirect to student dashboard if not admin/superadmin
  if (session.user.role !== 'admin' && session.user.role !== 'superadmin') {
    return {
      redirect: {
        destination: '/dashboard',
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
