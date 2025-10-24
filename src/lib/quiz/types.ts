/**
 * Quiz Generation Types
 * See docs/quiz-generation-vocabulary.md for complete documentation
 */

export type QuestionDirection = 'downward' | 'upward';

export type SelectionStrategy =
  | 'untested'
  | 'review'
  | 'struggling'
  | 'targeted'
  | 'adaptive';

export interface KnowledgeNode {
  id: number;
  label: string;
}

/**
 * Input data for generating a downward question
 * (category | attribute → facts)
 */
export interface DownwardQuestionData {
  direction: 'downward';
  category: KnowledgeNode;
  attribute: KnowledgeNode;
  correctFacts: KnowledgeNode[];
  distractorPool: KnowledgeNode[];
  confusingFacts?: KnowledgeNode[]; // For adaptive strategy
  numDistractors: number;
}

/**
 * Input data for generating an upward question
 * (attribute | fact → categories)
 */
export interface UpwardQuestionData {
  direction: 'upward';
  attribute: KnowledgeNode;
  fact: KnowledgeNode;
  correctCategories: KnowledgeNode[];
  distractorPool: KnowledgeNode[];
  confusingFacts?: KnowledgeNode[]; // For adaptive strategy
  numDistractors: number;
}

export type QuestionData = DownwardQuestionData | UpwardQuestionData;

/**
 * Answer option with component tracking
 */
export interface AnswerOption {
  option_text: string;
  is_correct: boolean;
  components: number[]; // Knowledge IDs (fact IDs or category IDs)
  display_order: number;
}

/**
 * Generated question (not yet saved to DB)
 */
export interface GeneratedQuestion {
  prompt: string; // e.g., "select all | Left-sided CHF | Symptoms"
  direction: QuestionDirection;
  category_id: number | null;
  attribute_id: number;
  fact_id: number | null;
  answerOptions: AnswerOption[];
}

/**
 * Quiz generation configuration
 */
export interface QuizGenerationConfig {
  question_count: number;
  direction_mix: {
    downward: number; // 0-1 (percentage)
    upward: number; // 0-1 (percentage)
  };
  distractor_count: number;
  selection_strategy: SelectionStrategy;
  content_pack_id: number;
  scope?: {
    topic_ids?: number[];
    category_ids?: number[];
    attribute_ids?: number[];
  };
}
