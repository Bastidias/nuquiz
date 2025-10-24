/**
 * Quiz Results Page
 * /quiz/[sessionId]/results
 *
 * Displays quiz results after submission
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface AnswerOption {
  id: number;
  display_text: string;
  option_order: number;
  is_correct?: boolean;
}

interface Question {
  id: number;
  question_text: string;
  question_order: number;
  options: AnswerOption[];
}

interface QuizSession {
  session_id: number;
  content_pack_id: number;
  total_questions: number;
  correct_answers: number;
  score: string;
  started_at: string;
  completed_at: string | null;
  questions: Question[];
}

export default function QuizResultsPage() {
  const router = useRouter();
  const { sessionId } = router.query;
  const { data: session, status } = useSession();

  const [quiz, setQuiz] = useState<QuizSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading' || !sessionId) return;

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/quiz-sessions/${sessionId}`);

        if (!response.ok) {
          throw new Error('Failed to load quiz results');
        }

        const data = await response.json();

        // If quiz is not completed, redirect to quiz page
        if (!data.completed_at) {
          router.push(`/quiz/${sessionId}`);
          return;
        }

        setQuiz(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [sessionId, status, router]);

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Error</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <Link href="/dashboard">← Back to Dashboard</Link>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Quiz not found</h1>
        <Link href="/dashboard">← Back to Dashboard</Link>
      </div>
    );
  }

  const scoreNum = parseFloat(quiz.score);
  const scoreColor = scoreNum >= 80 ? 'green' : scoreNum >= 60 ? 'orange' : 'red';

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard">← Back to Dashboard</Link>
      </div>

      <h1>Quiz Results</h1>

      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ marginTop: 0, color: scoreColor }}>Score: {scoreNum.toFixed(0)}%</h2>
        <p>
          Correct Answers: {quiz.correct_answers} / {quiz.total_questions}
        </p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Completed: {new Date(quiz.completed_at!).toLocaleString()}
        </p>
      </div>

      <h2>Question Review</h2>

      <div style={{ marginTop: '1rem' }}>
        {quiz.questions.map((question) => {
          const correctOptions = question.options.filter((o) => o.is_correct);
          const correctIds = new Set(correctOptions.map((o) => o.id));

          return (
            <div
              key={question.id}
              style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3 style={{ marginBottom: '1rem' }}>
                Question {question.question_order}: {question.question_text}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {question.options.map((option) => {
                  const isCorrect = option.is_correct === true;
                  const backgroundColor = isCorrect ? '#c8e6c9' : '#fff';

                  return (
                    <div
                      key={option.id}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor,
                      }}
                    >
                      <span style={{ fontWeight: isCorrect ? 'bold' : 'normal' }}>
                        {isCorrect && '✓ '}
                        {option.display_text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#666' }}>
                Correct answer{correctOptions.length > 1 ? 's' : ''}:{' '}
                {correctOptions.map((o) => o.display_text).join(', ')}
              </p>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link href="/dashboard">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
