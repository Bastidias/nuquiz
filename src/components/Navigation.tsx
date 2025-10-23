import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import styles from '@/styles/Navigation.module.css';

export default function Navigation() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/">Nuquiz</Link>
        </div>

        <div className={styles.links}>
          {/* Public links */}
          <Link href="/about">About</Link>

          {/* Loading state */}
          {loading && <span className={styles.loading}>...</span>}

          {/* Logged out */}
          {!loading && !session && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register" className={styles.primary}>
                Sign Up
              </Link>
            </>
          )}

          {/* Logged in */}
          {!loading && session && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/content-packs">Content Packs</Link>

              {/* Admin links */}
              {(session.user.role === 'admin' ||
                session.user.role === 'superadmin') && (
                <Link href="/admin/dashboard">Admin</Link>
              )}

              {/* Superadmin links */}
              {session.user.role === 'superadmin' && (
                <Link href="/admin/users">Users</Link>
              )}

              {/* User info */}
              <span className={styles.userInfo}>
                {session.user.email}
                <span className={styles.role}>{session.user.role}</span>
              </span>

              {/* Logout */}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className={styles.logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
