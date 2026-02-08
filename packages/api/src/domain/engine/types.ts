// ── Engine Value Objects ─────────────────────────────────────────
// Pure domain types for the question generation engine.
// No DB imports, no HTTP — these are the Quiz bounded context's model.

export type Axis = "subject" | "predicate" | "object";

export type Scope =
  | "single"
  | "cell"
  | "paired"
  | "subject_profile"
  | "cross_subject";

export type Format =
  | "multiple_choice"
  | "select_all"
  | "true_false"
  | "matching"
  | "fill_blank";

export interface QuizTriple {
  id: string;
  subject: string;
  predicate: string;
  object: string;
}

export interface PredicateGroup {
  predicate: string;
  triples: QuizTriple[];
  subjects: string[];
}

export interface ClassifiedObjects {
  shared: string[];
  bySubject: Map<string, string[]>;
}

export interface DistractorPool {
  predicate: string;
  distractors: string[];
}

export interface QuestionOption {
  text: string;
  correct: boolean;
}

export interface Question {
  axis: Axis;
  scope: Scope;
  format: Format;
  prompt: string;
  options: QuestionOption[];
  correctAnswer: string;
  tripleIds: string[];
}
