# Nuquiz Knowledge Hierarchy Data Model

## Overview

Nuquiz uses a hierarchical knowledge structure to enable comparison-based quiz generation. The system organizes educational content into four distinct types that form a tree structure, allowing for rich question generation by mixing and matching facts across comparison categories.

The core principle: **topics** organize broad subjects, **categories** define what's being compared, **attributes** specify dimensions of comparison, and **facts** contain the actual testable information.

## Glossary

### Topic
- **Definition**: A broad subject area or domain of knowledge
- **Parent**: Can have another topic as parent (unlimited nesting)
- **Purpose**: Organizes content hierarchically, provides context for categories
- **Examples**: "Cardiology", "Heart Failure", "Congestive Heart Failure"

### Category
- **Definition**: A specific variant, type, or classification within a topic that will be compared against other categories
- **Parent**: Must have a topic as parent
- **Purpose**: Defines the entities being compared in quiz questions
- **Examples**: "Left-sided", "Right-sided" (types of heart failure)

### Attribute
- **Definition**: A dimension or aspect used to compare categories
- **Parent**: Must have a category as parent
- **Purpose**: Organizes facts into logical groupings for comparison
- **Examples**: "Symptoms", "Causes", "Treatment", "Pathophysiology"

### Fact
- **Definition**: A specific piece of testable information
- **Parent**: Must have an attribute as parent
- **Purpose**: The actual content that appears in quiz questions and answer options
- **Examples**: "Pulmonary edema", "Dyspnea", "Peripheral edema"

## Database Schema
```sql
knowledge
---------
id                  PRIMARY KEY
parent_id           INTEGER (nullable, references knowledge.id)
name                VARCHAR -- system identifier (e.g., "left_sided", "symptoms")
label               VARCHAR -- human-readable display name (e.g., "Left-sided Heart Failure")
type                ENUM('topic', 'category', 'attribute', 'fact')
content_pack_id     INTEGER (references content_packs)
order               INTEGER -- for consistent display ordering
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

## Hierarchy Rules

1. **Topics** can nest infinitely under other topics
2. **Categories** must have a topic parent (direct or ancestor)
3. **Attributes** must have a category parent
4. **Facts** must have an attribute parent
5. All nodes can have multiple children of the appropriate type

## Examples

### Example 1: Basic Heart Failure Structure
```
Congestive Heart Failure (topic)
├── Left sided (category)
│   ├── Symptoms (attribute)
│   │   ├── Pulmonary edema (fact)
│   │   ├── Dyspnea (fact)
│   │   └── Orthopnea (fact)
│   └── Causes (attribute)
│       ├── Hypertension (fact)
│       └── Myocardial infarction (fact)
└── Right sided (category)
    ├── Symptoms (attribute)
    │   ├── Peripheral edema (fact)
    │   ├── Jugular venous distension (fact)
    │   └── Hepatomegaly (fact)
    └── Causes (attribute)
        ├── Left-sided heart failure (fact)
        └── COPD (fact)
```

**Path notation**: `left sided | symptoms`

**Generated question**: "Select all symptoms of left-sided heart failure"
- **Correct answers**: Pulmonary edema, Dyspnea, Orthopnea
- **Distractors**: Peripheral edema, JVD, Hepatomegaly (from right-sided symptoms)

### Example 2: Nested Topics
```
Cardiology (topic)
└── Heart Failure (topic)
    └── Congestive Heart Failure (topic)
        ├── Left sided (category)
        │   └── Symptoms (attribute)
        │       ├── Pulmonary edema (fact)
        │       └── Dyspnea (fact)
        └── Right sided (category)
            └── Symptoms (attribute)
                └── Peripheral edema (fact)
```

**Path notation**: `cardiology | heart failure | congestive | left sided | symptoms`
**Shortened path**: `congestive | left sided | symptoms`

### Example 3: Multiple Categories for Comparison
```
Anemia (topic)
├── Iron Deficiency Anemia (category)
│   ├── Lab Findings (attribute)
│   │   ├── Low ferritin (fact)
│   │   ├── High TIBC (fact)
│   │   └── Low MCV (fact)
│   └── Symptoms (attribute)
│       └── Pica (fact)
├── Vitamin B12 Deficiency Anemia (category)
│   ├── Lab Findings (attribute)
│   │   ├── Low B12 (fact)
│   │   ├── High MCV (fact)
│   │   └── Elevated homocysteine (fact)
│   └── Symptoms (attribute)
│       ├── Glossitis (fact)
│       └── Peripheral neuropathy (fact)
└── Folate Deficiency Anemia (category)
    └── Lab Findings (attribute)
        ├── Low folate (fact)
        ├── High MCV (fact)
        └── Normal B12 (fact)
```

**Path notation**: `anemia | iron deficiency anemia | lab findings`

**Generated question**: "Select all lab findings associated with iron deficiency anemia"
- **Correct answers**: Low ferritin, High TIBC, Low MCV
- **Distractors**: Low B12, High MCV, Elevated homocysteine (from B12 deficiency), Low folate, Normal B12 (from folate deficiency)

### Example 4: Expanding Question Pool with Broader Topics
```
Diabetes (topic)
├── Type 1 Diabetes (category)
│   ├── Pathophysiology (attribute)
│   │   ├── Autoimmune destruction (fact)
│   │   └── Absolute insulin deficiency (fact)
│   └── Treatment (attribute)
│       └── Insulin required (fact)
└── Type 2 Diabetes (category)
    ├── Pathophysiology (attribute)
    │   ├── Insulin resistance (fact)
    │   └── Relative insulin deficiency (fact)
    └── Treatment (attribute)
        ├── Lifestyle modification (fact)
        ├── Metformin (fact)
        └── May require insulin (fact)
```

**Path options for questions**:
- `type 1 diabetes | pathophysiology` (narrow focus)
- `diabetes | pathophysiology` (broader - pulls from both Type 1 and Type 2)
- `type 1 diabetes | treatment` mixed with `type 1 diabetes | pathophysiology` as distractors

## Quiz Generation Strategy

### Question Prompt Formula
`"Select all {attribute.label} of {category.label}"`

### Answer Pool Construction
1. **Correct answers**: All facts under the specified category + attribute path
2. **Distractors**: Facts from:
   - Sibling categories (same attribute, different category)
   - Same category, different attributes
   - Related topics at the same level

### Example Question Generation

**Data structure**:
- Path: `congestive | left sided | symptoms`
- Correct facts: [Pulmonary edema, Dyspnea, Orthopnea]
- Distractor sources:
  - `congestive | right sided | symptoms`
  - `congestive | left sided | causes`

**Generated question**:
- **Prompt**: "Select all symptoms of left-sided heart failure"
- **Options shown** (randomized):
  - ✓ Pulmonary edema
  - ✓ Dyspnea
  - ✗ Peripheral edema (from right-sided)
  - ✓ Orthopnea
  - ✗ Hypertension (from causes)
  - ✗ JVD (from right-sided)