import type {
  Axis,
  Scope,
  Format,
  QuizTriple,
  PredicateGroup,
  Question,
  QuestionOption,
} from "./types.js";
import { sourceDistractors } from "./distractors.js";

interface AssembleParams {
  axis: Axis;
  scope: Scope;
  format: Format;
  triples: QuizTriple[];
  groups: PredicateGroup[];
  rng: () => number;
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildPrompt(triple: QuizTriple, axis: Axis): string {
  switch (axis) {
    case "object":
      return `${triple.subject} | ${triple.predicate} → ?`;
    case "subject":
      return `? | ${triple.predicate} → ${triple.object}`;
    case "predicate":
      return `${triple.subject} | ? → ${triple.object}`;
  }
}

function assembleMultipleChoice(
  params: AssembleParams,
  triple: QuizTriple
): Question {
  const { axis, scope, format, groups } = params;
  const correctAnswer = triple[axis];
  const distractorValues = sourceDistractors(triple, groups, 3);
  const options: QuestionOption[] = shuffle([
    { text: correctAnswer, correct: true },
    ...distractorValues.map((d) => ({ text: d, correct: false })),
  ], params.rng);

  return {
    axis,
    scope,
    format,
    prompt: buildPrompt(triple, axis),
    options,
    correctAnswer,
    tripleIds: [triple.id],
  };
}

function assembleSelectAll(params: AssembleParams): Question {
  const { axis, scope, format, triples, groups } = params;

  // All triples share the same subject+predicate — correct objects are all their objects
  const correctObjects = triples.map((t) => t.object);
  const distractorValues = sourceDistractors(triples[0], groups, 2);

  const options: QuestionOption[] = shuffle([
    ...correctObjects.map((o) => ({ text: o, correct: true })),
    ...distractorValues.map((d) => ({ text: d, correct: false })),
  ], params.rng);

  const prompt = `${triples[0].subject} | ${triples[0].predicate} → ? (Select all)`;
  const correctAnswer = correctObjects.join(", ");

  return {
    axis,
    scope,
    format,
    prompt,
    options,
    correctAnswer,
    tripleIds: triples.map((t) => t.id),
  };
}

function assembleTrueFalse(
  params: AssembleParams,
  triple: QuizTriple
): Question {
  const { axis, scope, format, groups } = params;

  // Randomly decide to present the real triple (true) or a swapped one (false)
  const swapIt = params.rng() < 0.5;

  if (swapIt) {
    const distractorValues = sourceDistractors(triple, groups, 1);
    if (distractorValues.length > 0) {
      const swappedObject = distractorValues[0];
      const prompt = `${triple.subject} | ${triple.predicate} → ${swappedObject}`;
      return {
        axis,
        scope,
        format,
        prompt,
        options: [
          { text: "True", correct: false },
          { text: "False", correct: true },
        ],
        correctAnswer: "false",
        tripleIds: [triple.id],
      };
    }
  }

  // Present the real triple — answer is true
  const prompt = `${triple.subject} | ${triple.predicate} → ${triple.object}`;
  return {
    axis,
    scope,
    format,
    prompt,
    options: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
    correctAnswer: "true",
    tripleIds: [triple.id],
  };
}

function assembleMatching(params: AssembleParams): Question {
  const { axis, scope, format, triples } = params;
  const predicate = triples[0].predicate;

  const options: QuestionOption[] = triples.map((t) => ({
    text: `${t.subject} → ${t.object}`,
    correct: true,
  }));

  return {
    axis,
    scope,
    format,
    prompt: `? | ${predicate} → ? (Match each subject to its object)`,
    options,
    correctAnswer: options.map((o) => o.text).join("; "),
    tripleIds: triples.map((t) => t.id),
  };
}

function assembleFillBlank(
  params: AssembleParams,
  triple: QuizTriple
): Question {
  const { axis, scope, format } = params;
  const correctAnswer = triple[axis];

  let prompt: string;
  switch (axis) {
    case "object":
      prompt = `${triple.subject} | ${triple.predicate} → _________`;
      break;
    case "subject":
      prompt = `_________ | ${triple.predicate} → ${triple.object}`;
      break;
    case "predicate":
      prompt = `${triple.subject} | _________ → ${triple.object}`;
      break;
  }

  return {
    axis,
    scope,
    format,
    prompt,
    options: [],
    correctAnswer,
    tripleIds: [triple.id],
  };
}

export function assembleQuestion(params: AssembleParams): Question {
  const { format, triples } = params;
  const triple = triples[0];

  switch (format) {
    case "multiple_choice":
      return assembleMultipleChoice(params, triple);
    case "select_all":
      return assembleSelectAll(params);
    case "true_false":
      return assembleTrueFalse(params, triple);
    case "matching":
      return assembleMatching(params);
    case "fill_blank":
      return assembleFillBlank(params, triple);
  }
}
