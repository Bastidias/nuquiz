import Head from 'next/head';
import Link from 'next/link';
import { Inter, Roboto_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Nuquiz - Master Knowledge Through Comparison</title>
        <meta
          name="description"
          content="Quiz application that helps you master complex subjects by comparing and contrasting related concepts"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${inter.variable} ${robotoMono.variable}`}
      >
        <main className={styles.main}>
          <div className={styles.intro}>
            <h1>Master Knowledge Through Comparison</h1>
            <p>
              Nuquiz helps you understand complex subjects by comparing and
              contrasting related concepts. Take quizzes that challenge you to
              distinguish between similar ideas, building deep comprehension
              through active learning.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3>📚 Hierarchical Knowledge</h3>
                <p>
                  Content organized into topics, categories, and facts for
                  structured learning
                </p>
              </div>
              <div className={styles.feature}>
                <h3>🎯 Comparison-Based Questions</h3>
                <p>
                  Questions designed to help you distinguish between related
                  concepts
                </p>
              </div>
              <div className={styles.feature}>
                <h3>📊 Track Your Progress</h3>
                <p>
                  Monitor your mastery across different topics and categories
                </p>
              </div>
            </div>
          </div>
          <div className={styles.ctas}>
            <Link href="/register" className={styles.primary}>
              Get Started
            </Link>
            <Link href="/login" className={styles.secondary}>
              Login
            </Link>
            <Link href="/about" className={styles.secondary}>
              Learn More
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
