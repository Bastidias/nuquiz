/**
 * Test Data Factories (NO MOCKS - Real Data for Integration Tests)
 *
 * These factories create real test data in the test database.
 * Following functional programming principles.
 */

import type {
  NewUser,
  NewContentPack,
  NewKnowledge,
  NewQuizSession,
  KnowledgeType,
} from '../../types.js';

// Counter for generating unique values
let counter = 0;
const getUniqueId = () => ++counter;

/**
 * Generate a unique email
 */
export const generateEmail = (prefix = 'test'): string => {
  return `${prefix}-${getUniqueId()}-${Date.now()}@test.com`;
};

/**
 * Generate a unique username
 */
export const generateUsername = (prefix = 'user'): string => {
  return `${prefix}_${getUniqueId()}_${Date.now()}`;
};

// ==========================================
// USER FACTORIES
// ==========================================

/**
 * Create user data (not inserted yet)
 */
export const buildUser = (overrides: Partial<NewUser> = {}): NewUser => ({
  email: generateEmail(),
  username: generateUsername(),
  ...overrides,
});

/**
 * Create multiple user data objects
 */
export const buildUsers = (count: number, overrides: Partial<NewUser> = {}): NewUser[] => {
  return Array.from({ length: count }, () => buildUser(overrides));
};

// ==========================================
// CONTENT PACK FACTORIES
// ==========================================

/**
 * Create content pack data
 */
export const buildContentPack = (
  overrides: Partial<NewContentPack> = {}
): NewContentPack => ({
  name: `Test Pack ${getUniqueId()}`,
  description: `A test content pack for automated testing`,
  ...overrides,
});

/**
 * Create multiple content pack data objects
 */
export const buildContentPacks = (
  count: number,
  overrides: Partial<NewContentPack> = {}
): NewContentPack[] => {
  return Array.from({ length: count }, () => buildContentPack(overrides));
};

// ==========================================
// KNOWLEDGE FACTORIES
// ==========================================

/**
 * Create knowledge node data
 */
export const buildKnowledge = (
  type: KnowledgeType,
  contentPackId: number,
  overrides: Partial<NewKnowledge> = {}
): NewKnowledge => {
  const id = getUniqueId();
  const typeLabels = {
    topic: 'Topic',
    category: 'Category',
    attribute: 'Attribute',
    fact: 'Fact',
  };

  return {
    name: `test_${type}_${id}`,
    label: `Test ${typeLabels[type]} ${id}`,
    type,
    content_pack_id: contentPackId,
    order_index: 0,
    ...overrides,
  };
};

/**
 * Create a topic
 */
export const buildTopic = (
  contentPackId: number,
  overrides: Partial<NewKnowledge> = {}
): NewKnowledge => buildKnowledge('topic', contentPackId, overrides);

/**
 * Create a category
 */
export const buildCategory = (
  contentPackId: number,
  parentId: number,
  overrides: Partial<NewKnowledge> = {}
): NewKnowledge =>
  buildKnowledge('category', contentPackId, { parent_id: parentId, ...overrides });

/**
 * Create an attribute
 */
export const buildAttribute = (
  contentPackId: number,
  parentId: number,
  overrides: Partial<NewKnowledge> = {}
): NewKnowledge =>
  buildKnowledge('attribute', contentPackId, { parent_id: parentId, ...overrides });

/**
 * Create a fact
 */
export const buildFact = (
  contentPackId: number,
  parentId: number,
  overrides: Partial<NewKnowledge> = {}
): NewKnowledge =>
  buildKnowledge('fact', contentPackId, { parent_id: parentId, ...overrides });

/**
 * Build a complete knowledge hierarchy
 * Returns data for: topic, category, attribute, fact
 */
export const buildKnowledgeHierarchy = (contentPackId: number) => {
  const topic = buildTopic(contentPackId, {
    name: 'cardiology',
    label: 'Cardiology',
  });

  const category = buildCategory(contentPackId, 0, {
    name: 'heart_failure',
    label: 'Heart Failure',
  });

  const attribute = buildAttribute(contentPackId, 0, {
    name: 'symptoms',
    label: 'Symptoms',
  });

  const fact = buildFact(contentPackId, 0, {
    name: 'dyspnea',
    label: 'Dyspnea (shortness of breath)',
  });

  return { topic, category, attribute, fact };
};

// ==========================================
// QUIZ SESSION FACTORIES
// ==========================================

/**
 * Create quiz session data
 */
export const buildQuizSession = (
  userId: number,
  overrides: Partial<NewQuizSession> = {}
): NewQuizSession => ({
  user_id: userId,
  ...overrides,
});

// ==========================================
// MEDICAL CONTENT EXAMPLES
// ==========================================

/**
 * Build realistic medical knowledge hierarchy for testing
 * (Congestive Heart Failure example from docs)
 */
export const buildMedicalHierarchy = (contentPackId: number) => {
  return {
    topic: buildTopic(contentPackId, {
      name: 'congestive_heart_failure',
      label: 'Congestive Heart Failure',
    }),
    categories: {
      leftSided: buildCategory(contentPackId, 0, {
        name: 'left_sided',
        label: 'Left-sided Heart Failure',
        order_index: 1,
      }),
      rightSided: buildCategory(contentPackId, 0, {
        name: 'right_sided',
        label: 'Right-sided Heart Failure',
        order_index: 2,
      }),
    },
    attributes: {
      symptoms: {
        name: 'symptoms',
        label: 'Symptoms',
        order_index: 1,
      },
      causes: {
        name: 'causes',
        label: 'Causes',
        order_index: 2,
      },
    },
    facts: {
      leftSidedSymptoms: [
        { name: 'pulmonary_edema', label: 'Pulmonary edema' },
        { name: 'dyspnea', label: 'Dyspnea' },
        { name: 'orthopnea', label: 'Orthopnea' },
      ],
      leftSidedCauses: [
        { name: 'hypertension', label: 'Hypertension' },
        { name: 'mi', label: 'Myocardial infarction' },
      ],
      rightSidedSymptoms: [
        { name: 'peripheral_edema', label: 'Peripheral edema' },
        { name: 'jvd', label: 'Jugular venous distension' },
        { name: 'hepatomegaly', label: 'Hepatomegaly' },
      ],
      rightSidedCauses: [
        { name: 'left_hf', label: 'Left-sided heart failure' },
        { name: 'copd', label: 'COPD' },
      ],
    },
  };
};

/**
 * Reset counter (useful between test suites)
 */
export const resetFactories = () => {
  counter = 0;
};
