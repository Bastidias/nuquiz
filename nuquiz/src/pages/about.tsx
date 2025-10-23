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

export default function About() {
  return (
    <>
      <Head>
        <title>About Nuquiz - How It Works</title>
        <meta
          name="description"
          content="Learn how Nuquiz uses hierarchical knowledge and comparison-based questions to help you master complex subjects"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${inter.variable} ${robotoMono.variable}`}
      >
        <main className={styles.main}>
          <div className={styles.intro}>
            <h1>How Nuquiz Works</h1>
            <p>
              Nuquiz is built around a simple idea: you learn best when you can
              compare and contrast related concepts. Instead of simple
              memorization, our quizzes challenge you to understand the
              differences between similar ideas.
            </p>

            <h2>The Knowledge Hierarchy</h2>
            <p>
              Content is organized in a four-level hierarchy:
            </p>
            <ul>
              <li>
                <strong>Topics</strong> - Broad subject areas (e.g., &quot;Congestive
                Heart Failure&quot;)
              </li>
              <li>
                <strong>Categories</strong> - Specific variants to compare
                (e.g., &quot;Left-sided&quot; vs &quot;Right-sided&quot;)
              </li>
              <li>
                <strong>Attributes</strong> - Dimensions of comparison (e.g.,
                &quot;Symptoms&quot;, &quot;Causes&quot;)
              </li>
              <li>
                <strong>Facts</strong> - Testable information (e.g., &quot;Pulmonary
                edema&quot;, &quot;Peripheral edema&quot;)
              </li>
            </ul>

            <h2>Question Format</h2>
            <p>
              Questions follow the pattern: &quot;Select all [attribute] of
              [category]&quot;
            </p>
            <p>
              For example: &quot;Select all symptoms of left-sided heart
              failure&quot;
            </p>
            <p>
              Answer options include correct facts from that category/attribute
              combination, plus distractors from related categories. This
              forces you to really understand the distinctions.
            </p>

            <h2>Content Packs</h2>
            <p>
              Knowledge is organized into content packs that you can subscribe
              to. Each pack focuses on a specific domain with carefully
              structured content designed for comparison-based learning.
            </p>

            <h2>Track Your Progress</h2>
            <p>
              As you take quizzes, Nuquiz tracks your mastery at different
              levels of the hierarchy. You'll see where you're strong and
              where you need more practice.
            </p>
          </div>
          <div className={styles.ctas}>
            <Link href="/register" className={styles.primary}>
              Get Started
            </Link>
            <Link href="/" className={styles.secondary}>
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
