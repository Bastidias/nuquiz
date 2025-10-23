/**
 * Knowledge Pure Functions - Unit Tests (NO DATABASE)
 *
 * These tests run against pure functions with NO side effects.
 * ✅ No database needed
 * ✅ Fast (~1ms per test)
 * ✅ Can run in parallel
 *
 * Following Eric Elliott's RITEway principles:
 * - Readable: Clear "given/when/then" format
 * - Isolated: Each test is independent
 * - Thorough: Cover all cases
 * - Explicit: One assertion per test
 */

import { strict as assert } from 'assert';
import {
  validateHierarchyRule,
  buildPathNotation,
  parsePathNotation,
  buildFindChildrenQuery,
  buildFindByTypeQuery,
  buildSubtreeQuery,
  buildFindFactsQuery,
  validateKnowledgeData,
  getNodeDepth,
  canHaveChildren,
  getAllowedChildTypes,
  HIERARCHY_RULES,
} from '../knowledge-pure';

describe('validateHierarchyRule()', () => {
  // Root level tests
  it('given null parent and topic child, returns true', () => {
    const result = validateHierarchyRule(null, 'topic');
    assert.equal(result, true);
  });

  it('given null parent and category child, returns false', () => {
    const result = validateHierarchyRule(null, 'category');
    assert.equal(result, false);
  });

  it('given null parent and attribute child, returns false', () => {
    const result = validateHierarchyRule(null, 'attribute');
    assert.equal(result, false);
  });

  it('given null parent and fact child, returns false', () => {
    const result = validateHierarchyRule(null, 'fact');
    assert.equal(result, false);
  });

  // Topic parent tests
  it('given topic parent and topic child, returns true', () => {
    const result = validateHierarchyRule('topic', 'topic');
    assert.equal(result, true);
  });

  it('given topic parent and category child, returns true', () => {
    const result = validateHierarchyRule('topic', 'category');
    assert.equal(result, true);
  });

  it('given topic parent and attribute child, returns false', () => {
    const result = validateHierarchyRule('topic', 'attribute');
    assert.equal(result, false);
  });

  it('given topic parent and fact child, returns false', () => {
    const result = validateHierarchyRule('topic', 'fact');
    assert.equal(result, false);
  });

  // Category parent tests
  it('given category parent and attribute child, returns true', () => {
    const result = validateHierarchyRule('category', 'attribute');
    assert.equal(result, true);
  });

  it('given category parent and topic child, returns false', () => {
    const result = validateHierarchyRule('category', 'topic');
    assert.equal(result, false);
  });

  it('given category parent and category child, returns false', () => {
    const result = validateHierarchyRule('category', 'category');
    assert.equal(result, false);
  });

  it('given category parent and fact child, returns false', () => {
    const result = validateHierarchyRule('category', 'fact');
    assert.equal(result, false);
  });

  // Attribute parent tests
  it('given attribute parent and fact child, returns true', () => {
    const result = validateHierarchyRule('attribute', 'fact');
    assert.equal(result, true);
  });

  it('given attribute parent and topic child, returns false', () => {
    const result = validateHierarchyRule('attribute', 'topic');
    assert.equal(result, false);
  });

  it('given attribute parent and category child, returns false', () => {
    const result = validateHierarchyRule('attribute', 'category');
    assert.equal(result, false);
  });

  it('given attribute parent and attribute child, returns false', () => {
    const result = validateHierarchyRule('attribute', 'attribute');
    assert.equal(result, false);
  });

  // Fact parent tests
  it('given fact parent and any child type, returns false', () => {
    assert.equal(validateHierarchyRule('fact', 'topic'), false);
    assert.equal(validateHierarchyRule('fact', 'category'), false);
    assert.equal(validateHierarchyRule('fact', 'attribute'), false);
    assert.equal(validateHierarchyRule('fact', 'fact'), false);
  });
});

describe('buildPathNotation()', () => {
  it('given category and attribute names, returns path with pipe separator', () => {
    const result = buildPathNotation('solid', 'shape');
    assert.equal(result, 'solid | shape');
  });

  it('given names with spaces, returns path with spaces preserved', () => {
    const result = buildPathNotation('states of matter', 'particle movement');
    assert.equal(result, 'states of matter | particle movement');
  });

  it('given empty strings, returns path with empty strings', () => {
    const result = buildPathNotation('', '');
    assert.equal(result, ' | ');
  });
});

describe('parsePathNotation()', () => {
  it('given valid path notation, returns object with category and attribute', () => {
    const result = parsePathNotation('solid | shape');

    assert.deepEqual(result, {
      category: 'solid',
      attribute: 'shape',
    });
  });

  it('given path with extra spaces, returns trimmed values', () => {
    const result = parsePathNotation('  solid  |  shape  ');

    assert.deepEqual(result, {
      category: 'solid',
      attribute: 'shape',
    });
  });

  it('given path without pipe, returns null', () => {
    const result = parsePathNotation('invalid');
    assert.equal(result, null);
  });

  it('given path with empty category, returns null', () => {
    const result = parsePathNotation(' | shape');
    assert.equal(result, null);
  });

  it('given path with empty attribute, returns null', () => {
    const result = parsePathNotation('solid | ');
    assert.equal(result, null);
  });

  it('given path with multiple pipes, returns null', () => {
    const result = parsePathNotation('solid | shape | extra');
    assert.equal(result, null);
  });
});

describe('buildFindChildrenQuery()', () => {
  it('given parent id, returns query with correct SQL', () => {
    const result = buildFindChildrenQuery(5);

    assert.ok(result.sql.includes('WHERE parent_id = $1'));
    assert.ok(result.sql.includes('ORDER BY order_index, id'));
  });

  it('given parent id, returns params array with id', () => {
    const result = buildFindChildrenQuery(42);

    assert.deepEqual(result.params, [42]);
  });
});

describe('buildFindByTypeQuery()', () => {
  it('given type, returns query with correct SQL', () => {
    const result = buildFindByTypeQuery('topic');

    assert.ok(result.sql.includes('WHERE type = $1'));
    assert.ok(result.sql.includes('ORDER BY name'));
  });

  it('given type, returns params array with type', () => {
    const result = buildFindByTypeQuery('category');

    assert.deepEqual(result.params, ['category']);
  });
});

describe('buildSubtreeQuery()', () => {
  it('given root id, returns query with recursive CTE', () => {
    const result = buildSubtreeQuery(1);

    assert.ok(result.sql.includes('WITH RECURSIVE subtree'));
    assert.ok(result.sql.includes('UNION ALL'));
  });

  it('given root id, returns params array with id', () => {
    const result = buildSubtreeQuery(99);

    assert.deepEqual(result.params, [99]);
  });

  it('given root id, query starts from specified node', () => {
    const result = buildSubtreeQuery(1);

    assert.ok(result.sql.includes('WHERE id = $1'));
  });
});

describe('buildFindFactsQuery()', () => {
  it('given attribute id, returns query filtering by parent_id and type', () => {
    const result = buildFindFactsQuery(10);

    assert.ok(result.sql.includes('WHERE parent_id = $1'));
    assert.ok(result.sql.includes("type = 'fact'"));
  });

  it('given attribute id, returns params array with id', () => {
    const result = buildFindFactsQuery(25);

    assert.deepEqual(result.params, [25]);
  });
});

describe('validateKnowledgeData()', () => {
  it('given valid complete data, returns empty error array', () => {
    const result = validateKnowledgeData({
      name: 'test',
      label: 'Test',
      type: 'topic',
      content_pack_id: 1,
    });

    assert.deepEqual(result, []);
  });

  it('given missing name, returns error about name', () => {
    const result = validateKnowledgeData({
      label: 'Test',
      type: 'topic',
      content_pack_id: 1,
    });

    assert.equal(result.length, 1);
    assert.ok(result[0].includes('name'));
  });

  it('given empty name, returns error about name', () => {
    const result = validateKnowledgeData({
      name: '  ',
      label: 'Test',
      type: 'topic',
      content_pack_id: 1,
    });

    assert.equal(result.length, 1);
    assert.ok(result[0].includes('name'));
  });

  it('given missing label, returns error about label', () => {
    const result = validateKnowledgeData({
      name: 'test',
      type: 'topic',
      content_pack_id: 1,
    });

    assert.equal(result.length, 1);
    assert.ok(result[0].includes('label'));
  });

  it('given missing type, returns error about type', () => {
    const result = validateKnowledgeData({
      name: 'test',
      label: 'Test',
      content_pack_id: 1,
    });

    assert.equal(result.length, 1);
    assert.ok(result[0].includes('type'));
  });

  it('given invalid type, returns error about type', () => {
    const result = validateKnowledgeData({
      name: 'test',
      label: 'Test',
      type: 'invalid' as any,
      content_pack_id: 1,
    });

    assert.equal(result.length, 1);
    assert.ok(result[0].includes('type'));
    assert.ok(result[0].includes('invalid'));
  });

  it('given missing content_pack_id, returns error about content_pack_id', () => {
    const result = validateKnowledgeData({
      name: 'test',
      label: 'Test',
      type: 'topic',
    });

    assert.equal(result.length, 1);
    assert.ok(result[0].includes('content_pack_id'));
  });

  it('given zero content_pack_id, returns error about content_pack_id', () => {
    const result = validateKnowledgeData({
      name: 'test',
      label: 'Test',
      type: 'topic',
      content_pack_id: 0,
    });

    assert.equal(result.length, 1);
    assert.ok(result[0].includes('content_pack_id'));
  });

  it('given multiple missing fields, returns error for each field', () => {
    const result = validateKnowledgeData({});

    assert.ok(result.length >= 4);
  });
});

describe('getNodeDepth()', () => {
  it('given topic type, returns 0', () => {
    const result = getNodeDepth('topic');
    assert.equal(result, 0);
  });

  it('given category type, returns 1', () => {
    const result = getNodeDepth('category');
    assert.equal(result, 1);
  });

  it('given attribute type, returns 2', () => {
    const result = getNodeDepth('attribute');
    assert.equal(result, 2);
  });

  it('given fact type, returns 3', () => {
    const result = getNodeDepth('fact');
    assert.equal(result, 3);
  });
});

describe('canHaveChildren()', () => {
  it('given topic type, returns true', () => {
    const result = canHaveChildren('topic');
    assert.equal(result, true);
  });

  it('given category type, returns true', () => {
    const result = canHaveChildren('category');
    assert.equal(result, true);
  });

  it('given attribute type, returns true', () => {
    const result = canHaveChildren('attribute');
    assert.equal(result, true);
  });

  it('given fact type, returns false', () => {
    const result = canHaveChildren('fact');
    assert.equal(result, false);
  });
});

describe('getAllowedChildTypes()', () => {
  it('given topic parent, returns array with topic and category', () => {
    const result = getAllowedChildTypes('topic');

    assert.deepEqual(result, ['topic', 'category']);
  });

  it('given category parent, returns array with attribute', () => {
    const result = getAllowedChildTypes('category');

    assert.deepEqual(result, ['attribute']);
  });

  it('given attribute parent, returns array with fact', () => {
    const result = getAllowedChildTypes('attribute');

    assert.deepEqual(result, ['fact']);
  });

  it('given fact parent, returns empty array', () => {
    const result = getAllowedChildTypes('fact');

    assert.deepEqual(result, []);
  });
});

describe('HIERARCHY_RULES constant', () => {
  it('given topic, has topic and category as allowed children', () => {
    assert.ok(HIERARCHY_RULES.topic.includes('topic'));
    assert.ok(HIERARCHY_RULES.topic.includes('category'));
  });

  it('given category, has only attribute as allowed child', () => {
    assert.deepEqual(HIERARCHY_RULES.category, ['attribute']);
  });

  it('given attribute, has only fact as allowed child', () => {
    assert.deepEqual(HIERARCHY_RULES.attribute, ['fact']);
  });

  it('given fact, has no allowed children', () => {
    assert.deepEqual(HIERARCHY_RULES.fact, []);
  });
});
