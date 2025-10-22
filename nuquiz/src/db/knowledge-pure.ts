/**
 * Knowledge Pure Functions (NO SIDE EFFECTS)
 *
 * These functions contain business logic for knowledge hierarchy management.
 * They are pure (same input → same output) and have NO database side effects.
 *
 * ✅ Easy to test (no database needed)
 * ✅ Fast tests (~1ms each)
 * ✅ Can be composed and reused
 */

import type { KnowledgeType } from './types.js';

/**
 * Hierarchy rules: which child types are allowed for each parent type
 */
export const HIERARCHY_RULES: Record<KnowledgeType, KnowledgeType[]> = {
  topic: ['topic', 'category'],
  category: ['attribute'],
  attribute: ['fact'],
  fact: [],
};

/**
 * Validate if a child type is allowed under a parent type
 *
 * PURE FUNCTION - No side effects, no database access
 *
 * @param parentType - Type of parent node (null for root)
 * @param childType - Type of child node to validate
 * @returns true if hierarchy is valid, false otherwise
 *
 * @example
 * validateHierarchyRule(null, 'topic') // true - topics can be root
 * validateHierarchyRule(null, 'category') // false - categories need topic parent
 * validateHierarchyRule('topic', 'category') // true - categories under topics allowed
 * validateHierarchyRule('topic', 'fact') // false - facts can't go under topics
 */
export const validateHierarchyRule = (
  parentType: KnowledgeType | null,
  childType: KnowledgeType
): boolean => {
  // Root nodes can only be topics
  if (parentType === null) {
    return childType === 'topic';
  }

  // Check if child type is allowed for parent type
  return HIERARCHY_RULES[parentType].includes(childType);
};

/**
 * Build path notation for quiz questions
 *
 * PURE FUNCTION - No side effects, no database access
 *
 * @param categoryName - Name of the category
 * @param attributeName - Name of the attribute
 * @returns Path string in format "category | attribute"
 *
 * @example
 * buildPathNotation('solid', 'shape') // "solid | shape"
 * buildPathNotation('liquid', 'volume') // "liquid | volume"
 */
export const buildPathNotation = (
  categoryName: string,
  attributeName: string
): string => {
  return `${categoryName} | ${attributeName}`;
};

/**
 * Parse path notation into components
 *
 * PURE FUNCTION - No side effects
 *
 * @param path - Path string in format "category | attribute"
 * @returns Object with category and attribute names, or null if invalid
 *
 * @example
 * parsePathNotation('solid | shape') // { category: 'solid', attribute: 'shape' }
 * parsePathNotation('invalid') // null
 */
export const parsePathNotation = (
  path: string
): { category: string; attribute: string } | null => {
  const parts = path.split('|').map(p => p.trim());

  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null;
  }

  return {
    category: parts[0],
    attribute: parts[1],
  };
};

/**
 * Build SQL query for finding children of a node
 *
 * PURE FUNCTION - Returns query object, doesn't execute it
 *
 * @param parentId - ID of parent node
 * @returns Query object with SQL and parameters
 */
export const buildFindChildrenQuery = (parentId: number) => ({
  sql: 'SELECT * FROM knowledge WHERE parent_id = $1 ORDER BY order_index, id',
  params: [parentId],
});

/**
 * Build SQL query for finding nodes by type
 *
 * PURE FUNCTION - Returns query object, doesn't execute it
 *
 * @param type - Knowledge type to find
 * @returns Query object with SQL and parameters
 */
export const buildFindByTypeQuery = (type: KnowledgeType) => ({
  sql: 'SELECT * FROM knowledge WHERE type = $1 ORDER BY name',
  params: [type],
});

/**
 * Build SQL query for recursive subtree retrieval
 *
 * PURE FUNCTION - Returns query object, doesn't execute it
 *
 * @param rootId - ID of root node
 * @returns Query object with SQL and parameters
 */
export const buildSubtreeQuery = (rootId: number) => ({
  sql: `
    WITH RECURSIVE subtree AS (
      SELECT * FROM knowledge WHERE id = $1
      UNION ALL
      SELECT k.* FROM knowledge k
      INNER JOIN subtree s ON k.parent_id = s.id
    )
    SELECT * FROM subtree ORDER BY order_index, id
  `,
  params: [rootId],
});

/**
 * Build SQL query for finding facts by category and attribute
 *
 * PURE FUNCTION - Returns query object, doesn't execute it
 *
 * @param attributeId - ID of attribute node
 * @returns Query object with SQL and parameters
 */
export const buildFindFactsQuery = (attributeId: number) => ({
  sql: `SELECT * FROM knowledge WHERE parent_id = $1 AND type = 'fact' ORDER BY order_index, id`,
  params: [attributeId],
});

/**
 * Validate knowledge node data before creation
 *
 * PURE FUNCTION - No side effects, just validation
 *
 * @param data - Node data to validate
 * @returns Array of error messages (empty if valid)
 */
export const validateKnowledgeData = (data: {
  name?: string;
  label?: string;
  type?: KnowledgeType;
  content_pack_id?: number;
}): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('name is required and cannot be empty');
  }

  if (!data.label || data.label.trim().length === 0) {
    errors.push('label is required and cannot be empty');
  }

  if (!data.type) {
    errors.push('type is required');
  } else if (!['topic', 'category', 'attribute', 'fact'].includes(data.type)) {
    errors.push(`type must be one of: topic, category, attribute, fact (got: ${data.type})`);
  }

  if (!data.content_pack_id || data.content_pack_id <= 0) {
    errors.push('content_pack_id is required and must be positive');
  }

  return errors;
};

/**
 * Calculate depth of node in hierarchy
 *
 * PURE FUNCTION - Based only on node type
 *
 * @param type - Knowledge type
 * @returns Depth level (0 = root topic, 1 = nested topic or category, etc.)
 */
export const getNodeDepth = (type: KnowledgeType): number => {
  const depths: Record<KnowledgeType, number> = {
    topic: 0,      // Can be at root or nested
    category: 1,   // Under topic
    attribute: 2,  // Under category
    fact: 3,       // Under attribute
  };

  return depths[type];
};

/**
 * Check if a type can have children
 *
 * PURE FUNCTION
 *
 * @param type - Knowledge type
 * @returns true if type can have children
 */
export const canHaveChildren = (type: KnowledgeType): boolean => {
  return HIERARCHY_RULES[type].length > 0;
};

/**
 * Get allowed child types for a parent type
 *
 * PURE FUNCTION
 *
 * @param parentType - Type of parent node
 * @returns Array of allowed child types
 */
export const getAllowedChildTypes = (parentType: KnowledgeType): KnowledgeType[] => {
  return HIERARCHY_RULES[parentType];
};
