/**
 * Demo script to show generated questions
 * Run with: npx ts-node -r tsconfig-paths/register src/lib/quiz/__tests__/show-questions.ts
 */

import { generateQuestion } from '../question-generator';

console.log('=== QUIZ QUESTION GENERATOR DEMO ===\n');

// Sample knowledge data
const leftSidedCHF = { id: 10, label: 'Left-sided CHF' };
const rightSidedCHF = { id: 11, label: 'Right-sided CHF' };
const symptoms = { id: 100, label: 'Symptoms' };
const causes = { id: 101, label: 'Causes' };

const pulmonaryEdema = { id: 1001, label: 'Pulmonary edema' };
const dyspnea = { id: 1002, label: 'Dyspnea' };
const orthopnea = { id: 1003, label: 'Orthopnea' };
const peripheralEdema = { id: 2001, label: 'Peripheral edema' };
const jugularVeinDistention = { id: 2002, label: 'Jugular vein distention' };
const hepatomegaly = { id: 2003, label: 'Hepatomegaly' };

const hypertension = { id: 3001, label: 'Hypertension' };
const aorticStenosis = { id: 3002, label: 'Aortic stenosis' };

console.log('📝 DOWNWARD QUESTION (category | attribute → facts)\n');

const downwardQuestion = generateQuestion(
  {
    direction: 'downward',
    category: leftSidedCHF,
    attribute: symptoms,
    correctFacts: [pulmonaryEdema, dyspnea, orthopnea],
    distractorPool: [peripheralEdema, jugularVeinDistention, hepatomegaly],
    numDistractors: 3,
  },
  12345
);

console.log(`Prompt: "${downwardQuestion.prompt}"`);
console.log(`Direction: ${downwardQuestion.direction}`);
console.log(`Category ID: ${downwardQuestion.category_id}`);
console.log(`Attribute ID: ${downwardQuestion.attribute_id}`);
console.log(`\nAnswer Options (${downwardQuestion.answerOptions.length} total):\n`);

downwardQuestion.answerOptions.forEach((option, idx) => {
  const marker = option.is_correct ? '✓ CORRECT' : '✗ DISTRACTOR';
  console.log(`${idx + 1}. [${marker}] ${option.option_text}`);
  console.log(`   Components: [${option.components.join(', ')}]`);
  console.log('');
});

console.log('\n' + '='.repeat(70) + '\n');
console.log('📝 UPWARD QUESTION (attribute | fact → categories)\n');

const upwardQuestion = generateQuestion(
  {
    direction: 'upward',
    attribute: symptoms,
    fact: pulmonaryEdema,
    correctCategories: [leftSidedCHF],
    distractorPool: [rightSidedCHF],
    numDistractors: 2,
  },
  54321
);

console.log(`Prompt: "${upwardQuestion.prompt}"`);
console.log(`Direction: ${upwardQuestion.direction}`);
console.log(`Attribute ID: ${upwardQuestion.attribute_id}`);
console.log(`Fact ID: ${upwardQuestion.fact_id}`);
console.log(`\nAnswer Options (${upwardQuestion.answerOptions.length} total):\n`);

upwardQuestion.answerOptions.forEach((option, idx) => {
  const marker = option.is_correct ? '✓ CORRECT' : '✗ DISTRACTOR';
  console.log(`${idx + 1}. [${marker}] ${option.option_text}`);
  console.log(`   Components: [${option.components.join(', ')}]`);
  console.log('');
});

console.log('\n' + '='.repeat(70) + '\n');
console.log('📝 ADAPTIVE STRATEGY (with confusing facts added)\n');

const adaptiveQuestion = generateQuestion(
  {
    direction: 'downward',
    category: leftSidedCHF,
    attribute: symptoms,
    correctFacts: [pulmonaryEdema, dyspnea],
    distractorPool: [peripheralEdema, jugularVeinDistention],
    confusingFacts: [hypertension], // User always gets this right, so add to distractors
    numDistractors: 2,
  },
  99999
);

console.log(`Prompt: "${adaptiveQuestion.prompt}"`);
console.log(`Strategy: ADAPTIVE (adding confusing facts to increase difficulty)`);
console.log(`Confusing fact: ${hypertension.label} (user always gets this right)\n`);
console.log(`Answer Options (${adaptiveQuestion.answerOptions.length} total):\n`);

adaptiveQuestion.answerOptions.forEach((option, idx) => {
  const marker = option.is_correct ? '✓ CORRECT' : '✗ DISTRACTOR';
  const hasConfusingFact = option.components.includes(hypertension.id);
  const note = hasConfusingFact ? ' ⚡ (includes confusing fact!)' : '';

  console.log(`${idx + 1}. [${marker}] ${option.option_text}${note}`);
  console.log(`   Components: [${option.components.join(', ')}]`);
  console.log('');
});

console.log('\n' + '='.repeat(70) + '\n');
console.log('📝 DETERMINISTIC TEST (same seed = same question)\n');

const q1 = generateQuestion(
  {
    direction: 'downward',
    category: leftSidedCHF,
    attribute: symptoms,
    correctFacts: [pulmonaryEdema, dyspnea],
    distractorPool: [peripheralEdema],
    numDistractors: 1,
  },
  777
);

const q2 = generateQuestion(
  {
    direction: 'downward',
    category: leftSidedCHF,
    attribute: symptoms,
    correctFacts: [pulmonaryEdema, dyspnea],
    distractorPool: [peripheralEdema],
    numDistractors: 1,
  },
  777
);

console.log('Question 1 (seed: 777):');
q1.answerOptions.forEach((opt, idx) => {
  console.log(`  ${idx + 1}. ${opt.option_text} [${opt.is_correct ? 'CORRECT' : 'WRONG'}]`);
});

console.log('\nQuestion 2 (seed: 777):');
q2.answerOptions.forEach((opt, idx) => {
  console.log(`  ${idx + 1}. ${opt.option_text} [${opt.is_correct ? 'CORRECT' : 'WRONG'}]`);
});

console.log(`\n✅ Questions are identical: ${JSON.stringify(q1.answerOptions) === JSON.stringify(q2.answerOptions)}`);
