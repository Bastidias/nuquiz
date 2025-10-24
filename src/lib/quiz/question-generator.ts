/**
 * Pure Question Generator
 *
 * Deterministic question generation from knowledge paths.
 * Same inputs + seed = same output every time.
 *
 * NO I/O, NO randomness without seed, NO side effects.
 */

import {
  QuestionData,
  GeneratedQuestion,
  AnswerOption,
  KnowledgeNode,
} from './types';

/**
 * Seeded random number generator (deterministic)
 * Uses a simple LCG (Linear Congruential Generator)
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  sample<T>(array: T[], count: number): T[] {
    const shuffled = this.shuffle(array);
    return shuffled.slice(0, count);
  }
}

/**
 * Generate a single question from knowledge data
 *
 * @param data - Question data (downward or upward)
 * @param seed - Random seed for deterministic generation
 * @returns Generated question ready to save to DB
 */
export function generateQuestion(
  data: QuestionData,
  seed: number
): GeneratedQuestion {
  const rng = new SeededRandom(seed);

  if (data.direction === 'downward') {
    return generateDownwardQuestion(data, rng);
  } else {
    return generateUpwardQuestion(data, rng);
  }
}

function generateDownwardQuestion(
  data: QuestionData & { direction: 'downward' },
  rng: SeededRandom
): GeneratedQuestion {
  const { category, attribute, correctFacts, distractorPool, confusingFacts, numDistractors } = data;

  // Generate prompt: "select all | {category} | {attribute}"
  const prompt = `select all | ${category.label} | ${attribute.label}`;

  // Build answer options
  const answerOptions: AnswerOption[] = [];

  // Option 1: All correct facts
  answerOptions.push({
    option_text: correctFacts.map((f) => f.label).join(', '),
    is_correct: true,
    components: correctFacts.map((f) => f.id),
    display_order: 1,
  });

  // Option 2: Some correct facts (if more than 1)
  if (correctFacts.length > 1) {
    const someFacts = rng.sample(correctFacts, Math.ceil(correctFacts.length / 2));
    answerOptions.push({
      option_text: someFacts.map((f) => f.label).join(', '),
      is_correct: true,
      components: someFacts.map((f) => f.id),
      display_order: 2,
    });
  }

  // Option 3+: Mixed options (correct + distractors)
  const numMixedOptions = Math.min(2, distractorPool.length);
  for (let i = 0; i < numMixedOptions; i++) {
    const someCorrect = rng.sample(correctFacts, 1);
    const someWrong = rng.sample(distractorPool, 1);
    const components = [...someCorrect, ...someWrong];

    // Add confusing facts if provided (adaptive strategy)
    if (confusingFacts && confusingFacts.length > 0) {
      components.push(...confusingFacts);
    }

    // Remove duplicates
    const uniqueComponents = Array.from(new Set(components.map((c) => c.id))).map(
      (id) => components.find((c) => c.id === id)!
    );

    answerOptions.push({
      option_text: uniqueComponents.map((f) => f.label).join(', '),
      is_correct: false,
      components: uniqueComponents.map((f) => f.id),
      display_order: answerOptions.length + 1,
    });
  }

  // Option N: Pure distractor (all wrong)
  const pureDistractors = rng.sample(distractorPool, Math.min(2, distractorPool.length));

  // Add confusing facts to pure distractors too (adaptive strategy)
  const distractorComponents = [...pureDistractors];
  if (confusingFacts && confusingFacts.length > 0) {
    distractorComponents.push(...confusingFacts);
  }

  const uniqueDistractors = Array.from(
    new Set(distractorComponents.map((c) => c.id))
  ).map((id) => distractorComponents.find((c) => c.id === id)!);

  answerOptions.push({
    option_text: uniqueDistractors.map((f) => f.label).join(', '),
    is_correct: false,
    components: uniqueDistractors.map((f) => f.id),
    display_order: answerOptions.length + 1,
  });

  // Shuffle options
  const shuffledOptions = rng.shuffle(answerOptions).map((opt, idx) => ({
    ...opt,
    display_order: idx + 1,
  }));

  return {
    prompt,
    direction: 'downward',
    category_id: category.id,
    attribute_id: attribute.id,
    fact_id: null,
    answerOptions: shuffledOptions,
  };
}

function generateUpwardQuestion(
  data: QuestionData & { direction: 'upward' },
  rng: SeededRandom
): GeneratedQuestion {
  const { attribute, fact, correctCategories, distractorPool, numDistractors } = data;

  // Generate prompt: "select all | {attribute} | {fact}"
  const prompt = `select all | ${attribute.label} | ${fact.label}`;

  // Build answer options
  const answerOptions: AnswerOption[] = [];

  // Option 1: All correct categories
  answerOptions.push({
    option_text: correctCategories.map((c) => c.label).join(', '),
    is_correct: true,
    components: correctCategories.map((c) => c.id),
    display_order: 1,
  });

  // Option 2+: Mixed or pure distractors
  const availableDistractors = [...distractorPool];
  const numOptions = Math.min(numDistractors, availableDistractors.length + 1);

  for (let i = 1; i < numOptions; i++) {
    const isDistractor = i > correctCategories.length;

    if (isDistractor && availableDistractors.length > 0) {
      const selected = rng.sample(availableDistractors, 1);
      answerOptions.push({
        option_text: selected.map((c) => c.label).join(', '),
        is_correct: false,
        components: selected.map((c) => c.id),
        display_order: answerOptions.length + 1,
      });
    }
  }

  // Shuffle options
  const shuffledOptions = rng.shuffle(answerOptions).map((opt, idx) => ({
    ...opt,
    display_order: idx + 1,
  }));

  return {
    prompt,
    direction: 'upward',
    category_id: null,
    attribute_id: attribute.id,
    fact_id: fact.id,
    answerOptions: shuffledOptions,
  };
}
