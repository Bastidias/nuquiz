/**
 * Knowledge Table Data Access Layer (Functional Style)
 *
 * Handles the hierarchical knowledge structure:
 * Topics → Categories → Attributes → Facts
 *
 * NO MOCKS - All functions operate on real database.
 */

import { query, queryOne, queryMany, transaction } from './connection.js';
import type {
  Knowledge,
  NewKnowledge,
  KnowledgeType,
  PartialUpdate,
} from './types.js';

// ==========================================
// HIERARCHY VALIDATION
// ==========================================

/**
 * Hierarchy rules for parent-child relationships
 */
const HIERARCHY_RULES: Record<KnowledgeType, KnowledgeType[]> = {
  topic: ['topic', 'category'], // topics can have topics or categories as children
  category: ['attribute'], // categories can only have attributes
  attribute: ['fact'], // attributes can only have facts
  fact: [], // facts have no children
};

/**
 * Validate if a child type can be added to a parent
 */
export const validateHierarchy = async (
  parentId: number | null,
  childType: KnowledgeType
): Promise<boolean> => {
  // Root level can only be topics
  if (parentId === null) {
    return childType === 'topic';
  }

  const parent = await findById(parentId);
  if (!parent) {
    throw new Error(`Parent node with id ${parentId} not found`);
  }

  const allowedChildren = HIERARCHY_RULES[parent.type];
  return allowedChildren.includes(childType);
};

/**
 * Build path string for a knowledge node (category | attribute)
 */
export const buildPath = async (nodeId: number): Promise<string> => {
  const nodes: string[] = [];
  let currentId: number | null = nodeId;

  while (currentId !== null) {
    const node = await findById(currentId);
    if (!node) break;

    // Only include category and attribute in path (not topic or fact)
    if (node.type === 'category' || node.type === 'attribute') {
      nodes.unshift(node.name);
    }

    currentId = node.parent_id;
  }

  return nodes.join(' | ');
};

// ==========================================
// QUERY FUNCTIONS
// ==========================================

/**
 * Find knowledge node by ID
 */
export const findById = async (id: number): Promise<Knowledge | null> => {
  return queryOne<Knowledge>(
    'SELECT * FROM knowledge WHERE id = $1',
    [id]
  );
};

/**
 * Find all knowledge nodes of a specific type
 */
export const findByType = async (type: KnowledgeType): Promise<Knowledge[]> => {
  return queryMany<Knowledge>(
    'SELECT * FROM knowledge WHERE type = $1 ORDER BY order_index, id',
    [type]
  );
};

/**
 * Find all children of a knowledge node
 */
export const findChildren = async (parentId: number): Promise<Knowledge[]> => {
  return queryMany<Knowledge>(
    'SELECT * FROM knowledge WHERE parent_id = $1 ORDER BY order_index, id',
    [parentId]
  );
};

/**
 * Find all knowledge nodes in a content pack
 */
export const findByContentPack = async (contentPackId: number): Promise<Knowledge[]> => {
  return queryMany<Knowledge>(
    'SELECT * FROM knowledge WHERE content_pack_id = $1 ORDER BY order_index, id',
    [contentPackId]
  );
};

/**
 * Find facts for a specific category and attribute combination
 * This is used for quiz question generation
 */
export const findFactsForCategoryAttribute = async (
  categoryId: number,
  attributeId: number
): Promise<Knowledge[]> => {
  // First verify category and attribute exist and are related
  const category = await findById(categoryId);
  const attribute = await findById(attributeId);

  if (!category || category.type !== 'category') {
    throw new Error(`Invalid category ID: ${categoryId}`);
  }

  if (!attribute || attribute.type !== 'attribute') {
    throw new Error(`Invalid attribute ID: ${attributeId}`);
  }

  // Attribute must be child of category
  if (attribute.parent_id !== categoryId) {
    throw new Error(
      `Attribute ${attributeId} is not a child of category ${categoryId}`
    );
  }

  // Get all facts under this attribute
  return queryMany<Knowledge>(
    `SELECT * FROM knowledge
     WHERE parent_id = $1 AND type = 'fact'
     ORDER BY order_index, id`,
    [attributeId]
  );
};

/**
 * Find knowledge nodes by path (category name, attribute name)
 * Example: findByPath(['left_sided', 'symptoms'])
 */
export const findByPath = async (
  path: string[],
  contentPackId: number
): Promise<Knowledge[]> => {
  if (path.length === 0) {
    return [];
  }

  // Build recursive query to traverse hierarchy
  let currentParentId: number | null = null;
  const results: Knowledge[] = [];

  for (const name of path) {
    const nodes = await queryMany<Knowledge>(
      `SELECT * FROM knowledge
       WHERE name = $1
       AND content_pack_id = $2
       AND ($3::integer IS NULL AND parent_id IS NULL OR parent_id = $3)`,
      [name, contentPackId, currentParentId]
    );

    if (nodes.length === 0) {
      throw new Error(`Node with name '${name}' not found in path`);
    }

    const node = nodes[0];
    results.push(node);
    currentParentId = node.id;
  }

  return results;
};

/**
 * Get entire subtree starting from a node (recursive)
 */
export const getSubtree = async (rootId: number): Promise<Knowledge[]> => {
  const result = await query<Knowledge>(
    `WITH RECURSIVE subtree AS (
      SELECT * FROM knowledge WHERE id = $1
      UNION ALL
      SELECT k.* FROM knowledge k
      INNER JOIN subtree s ON k.parent_id = s.id
    )
    SELECT * FROM subtree ORDER BY order_index, id`,
    [rootId]
  );

  return result.rows;
};

// ==========================================
// MUTATION FUNCTIONS
// ==========================================

/**
 * Create a new knowledge node
 */
export const create = async (data: NewKnowledge): Promise<Knowledge> => {
  // Validate hierarchy
  const isValid = await validateHierarchy(data.parent_id ?? null, data.type);
  if (!isValid) {
    const parent = data.parent_id ? await findById(data.parent_id) : null;
    throw new Error(
      `Cannot add ${data.type} as child of ${parent?.type || 'root'}. ` +
      `Check hierarchy rules: topics → categories → attributes → facts`
    );
  }

  const result = await queryOne<Knowledge>(
    `INSERT INTO knowledge
     (parent_id, name, label, type, content_pack_id, order_index)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.parent_id ?? null,
      data.name,
      data.label,
      data.type,
      data.content_pack_id,
      data.order_index ?? 0,
    ]
  );

  if (!result) {
    throw new Error('Failed to create knowledge node');
  }

  return result;
};

/**
 * Update a knowledge node
 */
export const update = async (
  id: number,
  data: PartialUpdate<Knowledge>
): Promise<Knowledge> => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  // Build dynamic UPDATE query
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  });

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(id);

  const result = await queryOne<Knowledge>(
    `UPDATE knowledge
     SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $${paramCount}
     RETURNING *`,
    values
  );

  if (!result) {
    throw new Error(`Knowledge node with id ${id} not found`);
  }

  return result;
};

/**
 * Delete a knowledge node (cascades to children)
 */
export const remove = async (id: number): Promise<void> => {
  const result = await query(
    'DELETE FROM knowledge WHERE id = $1',
    [id]
  );

  if (result.rowCount === 0) {
    throw new Error(`Knowledge node with id ${id} not found`);
  }
};

/**
 * Reorder children of a parent node
 */
export const reorderChildren = async (
  parentId: number | null,
  orderedIds: number[]
): Promise<Knowledge[]> => {
  return transaction(async (client) => {
    const updated: Knowledge[] = [];

    for (let i = 0; i < orderedIds.length; i++) {
      const result = await client.query<Knowledge>(
        `UPDATE knowledge
         SET order_index = $1, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2 AND ($3::integer IS NULL AND parent_id IS NULL OR parent_id = $3)
         RETURNING *`,
        [i, orderedIds[i], parentId]
      );

      if (result.rows[0]) {
        updated.push(result.rows[0]);
      }
    }

    return updated;
  });
};

// ==========================================
// AGGREGATE QUERIES
// ==========================================

/**
 * Count knowledge nodes by type in a content pack
 */
export const countByType = async (
  contentPackId: number
): Promise<Record<KnowledgeType, number>> => {
  const results = await queryMany<{ type: KnowledgeType; count: string }>(
    `SELECT type, COUNT(*) as count
     FROM knowledge
     WHERE content_pack_id = $1
     GROUP BY type`,
    [contentPackId]
  );

  const counts: Record<KnowledgeType, number> = {
    topic: 0,
    category: 0,
    attribute: 0,
    fact: 0,
  };

  results.forEach(row => {
    counts[row.type] = parseInt(row.count, 10);
  });

  return counts;
};

/**
 * Check if a node has children
 */
export const hasChildren = async (id: number): Promise<boolean> => {
  const result = await queryOne<{ count: string }>(
    'SELECT COUNT(*) as count FROM knowledge WHERE parent_id = $1',
    [id]
  );

  return result ? parseInt(result.count, 10) > 0 : false;
};
