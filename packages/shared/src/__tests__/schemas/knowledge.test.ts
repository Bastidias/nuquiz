import {
  createDeckSchema,
  updateDeckSchema,
  createTopicSchema,
  updateTopicSchema,
  createConceptSchema,
  updateConceptSchema,
  createTripleSchema,
  updateTripleSchema,
  createTagSchema,
  tripleTagSchema,
  importDeckSchema,
} from "../../schemas/knowledge.js";

// ── Deck Schemas ─────────────────────────────────────────────────

describe("createDeckSchema", () => {
  test("accepts valid deck with title, description, and sortOrder", () => {
    const input = { title: "Biology 101", description: "Intro to biology", sortOrder: 0 };
    const result = createDeckSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("accepts deck with null description", () => {
    const input = { title: "Chemistry", description: null, sortOrder: 0 };
    const result = createDeckSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("rejects empty title", () => {
    const input = { title: "", description: null, sortOrder: 0 };
    const result = createDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects title exceeding 200 characters", () => {
    const input = { title: "x".repeat(201), description: null, sortOrder: 0 };
    const result = createDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects description exceeding 1000 characters", () => {
    const input = { title: "Valid Title", description: "x".repeat(1001), sortOrder: 0 };
    const result = createDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects missing title", () => {
    const input = { description: "Some description", sortOrder: 0 };
    const result = createDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects negative sortOrder", () => {
    const input = { title: "Valid", description: null, sortOrder: -1 };
    const result = createDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects non-integer sortOrder", () => {
    const input = { title: "Valid", description: null, sortOrder: 1.5 };
    const result = createDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("updateDeckSchema", () => {
  test("accepts partial update with only title", () => {
    const input = { title: "Updated Biology" };
    const result = updateDeckSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("accepts partial update with only description", () => {
    const input = { description: "Updated description" };
    const result = updateDeckSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("accepts partial update with only sortOrder", () => {
    const input = { sortOrder: 5 };
    const result = updateDeckSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("accepts empty object (no fields to update)", () => {
    const result = updateDeckSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("still validates field constraints on partial update", () => {
    const input = { title: "" };
    const result = updateDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// ── Topic Schemas ────────────────────────────────────────────────

describe("createTopicSchema", () => {
  test("accepts valid topic with all fields", () => {
    const input = { title: "Cell Biology", description: "Study of cells", sortOrder: 0 };
    const result = createTopicSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("rejects negative sortOrder", () => {
    const input = { title: "Valid", description: null, sortOrder: -1 };
    const result = createTopicSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects non-integer sortOrder", () => {
    const input = { title: "Valid", description: null, sortOrder: 1.5 };
    const result = createTopicSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("updateTopicSchema", () => {
  test("accepts partial update with only sortOrder", () => {
    const input = { sortOrder: 3 };
    const result = updateTopicSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});

// ── Concept Schemas ──────────────────────────────────────────────

describe("createConceptSchema", () => {
  test("accepts valid concept", () => {
    const input = { title: "Cell Membrane", description: null, sortOrder: 0 };
    const result = createConceptSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("rejects empty title", () => {
    const input = { title: "", description: null, sortOrder: 0 };
    const result = createConceptSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// ── Triple (SPO) Schemas ─────────────────────────────────────────

describe("createTripleSchema", () => {
  test("accepts valid SPO triple with sortOrder", () => {
    const input = {
      subject: "Cell membrane",
      predicate: "is composed of",
      object: "phospholipid bilayer",
      sortOrder: 0,
    };
    const result = createTripleSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("rejects empty subject", () => {
    const input = {
      subject: "",
      predicate: "provides",
      object: "reliable delivery",
      sortOrder: 0,
    };
    const result = createTripleSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects empty predicate", () => {
    const input = {
      subject: "TCP",
      predicate: "",
      object: "reliable delivery",
      sortOrder: 0,
    };
    const result = createTripleSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects empty object", () => {
    const input = {
      subject: "TCP",
      predicate: "provides",
      object: "",
      sortOrder: 0,
    };
    const result = createTripleSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects negative sortOrder", () => {
    const input = {
      subject: "TCP",
      predicate: "provides",
      object: "reliable delivery",
      sortOrder: -1,
    };
    const result = createTripleSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects non-integer sortOrder", () => {
    const input = {
      subject: "TCP",
      predicate: "provides",
      object: "reliable delivery",
      sortOrder: 0.5,
    };
    const result = createTripleSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects subject exceeding 500 characters", () => {
    const input = {
      subject: "x".repeat(501),
      predicate: "provides",
      object: "reliable delivery",
      sortOrder: 0,
    };
    const result = createTripleSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects predicate exceeding 500 characters", () => {
    const input = {
      subject: "TCP",
      predicate: "x".repeat(501),
      object: "reliable delivery",
      sortOrder: 0,
    };
    const result = createTripleSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects object exceeding 500 characters", () => {
    const input = {
      subject: "TCP",
      predicate: "provides",
      object: "x".repeat(501),
      sortOrder: 0,
    };
    const result = createTripleSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("updateTripleSchema", () => {
  test("accepts partial update with only object", () => {
    const input = { object: "updated value" };
    const result = updateTripleSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("accepts partial update with only sortOrder", () => {
    const input = { sortOrder: 5 };
    const result = updateTripleSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("accepts empty object for no-op update", () => {
    const result = updateTripleSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});

// ── Tag Schemas ──────────────────────────────────────────────────

describe("createTagSchema", () => {
  test("accepts valid tag name", () => {
    const result = createTagSchema.safeParse({ name: "networking" });
    expect(result.success).toBe(true);
  });

  test("rejects empty tag name", () => {
    const result = createTagSchema.safeParse({ name: "" });
    expect(result.success).toBe(false);
  });

  test("rejects tag name exceeding 100 characters", () => {
    const result = createTagSchema.safeParse({ name: "x".repeat(101) });
    expect(result.success).toBe(false);
  });
});

describe("tripleTagSchema", () => {
  test("accepts valid triple-tag association", () => {
    const result = tripleTagSchema.safeParse({ tripleId: "t1", tagId: "tag1" });
    expect(result.success).toBe(true);
  });

  test("rejects missing tripleId", () => {
    const result = tripleTagSchema.safeParse({ tagId: "tag1" });
    expect(result.success).toBe(false);
  });

  test("rejects missing tagId", () => {
    const result = tripleTagSchema.safeParse({ tripleId: "t1" });
    expect(result.success).toBe(false);
  });
});

// ── Import Schema ────────────────────────────────────────────────

describe("importDeckSchema", () => {
  const validImport = {
    title: "Biology",
    description: "Intro to biology",
    topics: [
      {
        title: "Cell Biology",
        concepts: [
          {
            title: "Cell Membrane",
            triples: [
              {
                subject: "Cell membrane",
                predicate: "is composed of",
                object: "phospholipid bilayer",
              },
            ],
          },
        ],
      },
    ],
  };

  test("accepts a valid full import structure", () => {
    const result = importDeckSchema.safeParse(validImport);
    expect(result.success).toBe(true);
  });

  test("accepts import with optional fields (tags, descriptions)", () => {
    const input = {
      title: "Chemistry",
      topics: [
        {
          title: "Atoms",
          description: "Atomic structure",
          concepts: [
            {
              title: "Electron Configuration",
              description: "How electrons are arranged",
              triples: [
                {
                  subject: "Hydrogen",
                  predicate: "has electron configuration",
                  object: "1s1",
                  tags: ["elements", "basics"],
                },
              ],
            },
          ],
        },
      ],
    };
    const result = importDeckSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test("rejects import with no topics", () => {
    const input = { title: "Empty Deck", topics: [] };
    const result = importDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects import with topic containing no concepts", () => {
    const input = {
      title: "Bad Deck",
      topics: [{ title: "Empty Topic", concepts: [] }],
    };
    const result = importDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects import with concept containing no triples", () => {
    const input = {
      title: "Bad Deck",
      topics: [
        {
          title: "Topic",
          concepts: [{ title: "Empty Concept", triples: [] }],
        },
      ],
    };
    const result = importDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects import with empty triple subject", () => {
    const input = {
      title: "Deck",
      topics: [
        {
          title: "Topic",
          concepts: [
            {
              title: "Concept",
              triples: [
                {
                  subject: "",
                  predicate: "is",
                  object: "B",
                },
              ],
            },
          ],
        },
      ],
    };
    const result = importDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  test("rejects import with empty triple predicate", () => {
    const input = {
      title: "Deck",
      topics: [
        {
          title: "Topic",
          concepts: [
            {
              title: "Concept",
              triples: [
                {
                  subject: "A",
                  predicate: "",
                  object: "B",
                },
              ],
            },
          ],
        },
      ],
    };
    const result = importDeckSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});
