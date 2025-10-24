/**
 * Quiz Taking Page
 * /quiz/[sessionId]
 *
 * Displays quiz questions and allows user to select answers
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface AnswerOption {
  id: number;
  display_text: string;
  option_order: number;
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
  started_at: string;
  completed_at: string | null;
  questions: Question[];
}

export default function QuizPage() {
  const router = useRouter();
  const { sessionId } = router.query;
  const { data: session, status } = useSession();

  const [quiz, setQuiz] = useState<QuizSession | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading' || !sessionId) return;

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quiz-sessions/${sessionId}`);

        if (!response.ok) {
          throw new Error('Failed to load quiz');
        }

        const data = await response.json();

        // If quiz is already completed, redirect to results
        if (data.completed_at) {
          router.push(`/quiz/${sessionId}/results`);
          return;
        }

        setQuiz(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [sessionId, status, router]);

  const toggleOption = (optionId: number) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const handleSubmit = async () => {
    if (selectedOptions.size === 0) {
      alert('Please select at least one answer');
      return;
    }

    if (!confirm('Are you sure you want to submit your quiz? You cannot change your answers after submission.')) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/quiz-sessions/${sessionId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selected_option_ids: Array.from(selectedOptions),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      // Redirect to results page
      router.push(`/quiz/${sessionId}/results`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Loading quiz...</p>
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

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard">← Back to Dashboard</Link>
      </div>

      <h1>Quiz Session #{quiz.session_id}</h1>
      <p>Total Questions: {quiz.total_questions}</p>

      <div style={{ marginTop: '2rem' }}>
        {quiz.questions.map((question) => (
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
              {question.options.map((option) => (
                <label
                  key={option.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: selectedOptions.has(option.id) ? '#e3f2fd' : '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.has(option.id)}
                    onChange={() => toggleOption(option.id)}
                    style={{ marginRight: '0.75rem' }}
                  />
                  {option.display_text}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={handleSubmit}
          disabled={submitting || selectedOptions.size === 0}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: submitting ? '#ccc' : '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>

        <p style={{ alignSelf: 'center', color: '#666' }}>
          Selected: {selectedOptions.size} option{selectedOptions.size !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
