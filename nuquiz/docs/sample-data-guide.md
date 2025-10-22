# Sample Data Guide

## Overview

The sample dataset demonstrates Nuquiz's compare/contrast quiz model using **States of Matter** - a middle school science topic that's easy to understand and perfect for testing the hierarchy system.

## Content Structure

### Topic 1: States of Matter

Four categories (states) with comparable attributes:

```
States of Matter (topic)
├── Solid (category)
│   ├── Shape (attribute)
│   │   ├── Definite shape (fact)
│   │   ├── Maintains its own shape (fact)
│   │   └── Rigid structure (fact)
│   ├── Volume (attribute)
│   │   ├── Definite volume (fact)
│   │   └── Fixed volume (fact)
│   ├── Particle Movement (attribute)
│   │   ├── Particles vibrate in place (fact)
│   │   ├── Particles are closely packed (fact)
│   │   └── Low kinetic energy (fact)
│   ├── Compressibility (attribute)
│   │   ├── Not easily compressible (fact)
│   │   └── Nearly incompressible (fact)
│   └── Examples (attribute)
│       ├── Ice (fact)
│       ├── Rock (fact)
│       ├── Wood (fact)
│       └── Metal (fact)
├── Liquid (category)
│   ├── Shape (attribute)
│   │   ├── No definite shape (fact)
│   │   ├── Takes shape of container (fact)
│   │   └── Flows freely (fact)
│   ├── Volume (attribute)
│   │   ├── Definite volume (fact)
│   │   └── Constant volume (fact)
│   ├── Particle Movement (attribute)
│   │   ├── Particles slide past each other (fact)
│   │   ├── Particles are loosely packed (fact)
│   │   └── Medium kinetic energy (fact)
│   ├── Compressibility (attribute)
│   │   ├── Not easily compressible (fact)
│   │   └── Nearly incompressible (fact)
│   └── Examples (attribute)
│       ├── Water (fact)
│       ├── Milk (fact)
│       ├── Oil (fact)
│       └── Juice (fact)
├── Gas (category)
│   ├── Shape (attribute)
│   │   ├── No definite shape (fact)
│   │   ├── Fills entire container (fact)
│   │   └── Expands freely (fact)
│   ├── Volume (attribute)
│   │   ├── No definite volume (fact)
│   │   └── Variable volume (fact)
│   ├── Particle Movement (attribute)
│   │   ├── Particles move rapidly (fact)
│   │   ├── Particles are far apart (fact)
│   │   ├── High kinetic energy (fact)
│   │   └── Random motion (fact)
│   ├── Compressibility (attribute)
│   │   ├── Highly compressible (fact)
│   │   └── Easily compressed (fact)
│   └── Examples (attribute)
│       ├── Oxygen (fact)
│       ├── Nitrogen (fact)
│       ├── Carbon dioxide (fact)
│       └── Water vapor (fact)
└── Plasma (category) [bonus]
    ├── Shape (attribute)
    │   ├── No definite shape (fact)
    │   └── Glowing appearance (fact)
    ├── Particle Movement (attribute)
    │   ├── Ionized particles (fact)
    │   ├── Very high kinetic energy (fact)
    │   └── Conducts electricity (fact)
    └── Examples (attribute)
        ├── Lightning (fact)
        ├── Stars (fact)
        └── Neon signs (fact)
```

### Topic 2: Water Cycle (nested topic)

Three categories (phases) showing state changes:

```
Water Cycle (topic, nested under States of Matter)
├── Evaporation (category)
│   ├── Process (attribute)
│   │   ├── Liquid changes to gas (fact)
│   │   ├── Requires heat energy (fact)
│   │   └── Occurs at surface (fact)
│   └── Where It Occurs (attribute)
│       ├── Oceans (fact)
│       ├── Lakes (fact)
│       └── Puddles (fact)
├── Condensation (category)
│   ├── Process (attribute)
│   │   ├── Gas changes to liquid (fact)
│   │   ├── Releases heat energy (fact)
│   │   └── Forms tiny droplets (fact)
│   └── Where It Occurs (attribute)
│       ├── Clouds (fact)
│       ├── Dew on grass (fact)
│       └── Fog on mirror (fact)
└── Precipitation (category)
    ├── Process (attribute)
    │   ├── Water falls from clouds (fact)
    │   ├── Driven by gravity (fact)
    │   └── Returns water to Earth (fact)
    └── Types (attribute)
        ├── Rain (fact)
        ├── Snow (fact)
        ├── Sleet (fact)
        └── Hail (fact)
```

## Quiz Question Examples

### Example 1: Shape Comparison

**Question**: "Select all properties that describe the **shape** of a **solid**"

**Correct Answers** (from `solid | shape`):
- Definite shape
- Maintains its own shape
- Rigid structure

**Distractors** (from `liquid | shape` and `gas | shape`):
- No definite shape (liquid/gas)
- Takes shape of container (liquid)
- Flows freely (liquid)
- Fills entire container (gas)
- Expands freely (gas)

---

### Example 2: Particle Movement

**Question**: "Select all characteristics of **particle movement** in **gases**"

**Correct Answers** (from `gas | particle_movement`):
- Particles move rapidly
- Particles are far apart
- High kinetic energy
- Random motion

**Distractors** (from `solid | particle_movement` and `liquid | particle_movement`):
- Particles vibrate in place (solid)
- Particles are closely packed (solid)
- Low kinetic energy (solid)
- Particles slide past each other (liquid)
- Medium kinetic energy (liquid)

---

### Example 3: Examples Identification

**Question**: "Select all **examples** of a **liquid**"

**Correct Answers** (from `liquid | examples`):
- Water
- Milk
- Oil
- Juice

**Distractors** (from `solid | examples` and `gas | examples`):
- Ice (solid)
- Rock (solid)
- Wood (solid)
- Oxygen (gas)
- Nitrogen (gas)
- Carbon dioxide (gas)

---

### Example 4: Water Cycle Process

**Question**: "What **processes** occur during **evaporation**?"

**Correct Answers** (from `evaporation | process`):
- Liquid changes to gas
- Requires heat energy
- Occurs at surface

**Distractors** (from `condensation | process` and `precipitation | process`):
- Gas changes to liquid (condensation)
- Releases heat energy (condensation)
- Water falls from clouds (precipitation)
- Driven by gravity (precipitation)

---

## Why This Dataset?

### 1. **Easy to Understand**
Middle school science topic - anyone can eyeball the questions and verify correctness.

### 2. **Perfect for Compare/Contrast**
- **3-4 categories** with same attributes
- **Clear differences** between states
- **Overlapping properties** (e.g., "No definite shape" for both liquid and gas)

### 3. **Rich Distractor Pool**
Each category has 4-5 attributes with 2-4 facts each = plenty of distractors.

### 4. **Demonstrates Hierarchy**
- **Nested topics** (Water Cycle under States of Matter)
- **Shared attributes** across categories (Shape, Volume, etc.)
- **Multiple fact types** (properties, examples, processes)

### 5. **Real-World Testing**
This mirrors actual educational content - hierarchical, comparable, with clear learning objectives.

## Dataset Statistics

| Type | Count |
|------|-------|
| Topics | 2 |
| Categories | 7 |
| Attributes | 26 |
| Facts | 70+ |

**Total Possible Questions**: Hundreds of combinations!

## Loading the Data

### Into Dev Database
```bash
npm run db:seed
```

### Into Test Database
```bash
NODE_ENV=test npm run db:seed
```

### Manual Load
```bash
docker exec -i nuquiz-postgres-dev psql -U nuquiz_user -d nuquiz_dev < db/sample-data.sql
```

## Querying Sample Data

### View all categories
```sql
SELECT name, label FROM knowledge WHERE type = 'category';
```

### View facts for "Solid | Shape"
```sql
WITH RECURSIVE tree AS (
  SELECT * FROM knowledge WHERE name = 'solid' AND type = 'category'
  UNION ALL
  SELECT k.* FROM knowledge k
  INNER JOIN tree t ON k.parent_id = t.id
)
SELECT label FROM tree WHERE type = 'fact' AND parent_id IN (
  SELECT id FROM tree WHERE name = 'shape' AND type = 'attribute'
);
```

### Count by type
```sql
SELECT type, COUNT(*) FROM knowledge GROUP BY type ORDER BY type;
```

## Using in Tests

```typescript
import { loadSampleData } from '../helpers/sample-data';

beforeAll(async () => {
  await loadSampleData();
});

it('should generate quiz about solid shapes', async () => {
  const category = await findCategoryByName('solid');
  const attribute = await findAttributeByName('shape', category.id);
  const facts = await findFactsForCategoryAttribute(category.id, attribute.id);

  expect(facts).toHaveLength(3);
  expect(facts.map(f => f.label)).toContain('Definite shape');
});
```

## Extending the Dataset

Want to add more content? Follow the same pattern:

1. **Pick a topic** with clear categories to compare
   - Animal types (Mammals, Birds, Reptiles)
   - Geometric shapes (Triangles, Quadrilaterals, Circles)
   - Rock types (Igneous, Sedimentary, Metamorphic)

2. **Identify shared attributes**
   - Properties all categories have in common
   - Allow for meaningful comparison

3. **Add distinguishing facts**
   - Clear differences between categories
   - Good distractor potential

4. **Create SQL insert** following the pattern in `sample-data.sql`

---

**This sample data provides a solid foundation for testing and demonstrating Nuquiz's quiz generation capabilities.**
