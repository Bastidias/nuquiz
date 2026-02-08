import { assembleQuestion } from "../../domain/engine/assemble.js";
import type { QuizTriple, PredicateGroup } from "../../domain/engine/types.js";
import { tcpUdpTriples, tcpUdpGroups, seedRng } from "./fixtures.js";

// Helpers
const tcp = tcpUdpTriples[0]; // TCP | Reliability → Guaranteed (Retransmission)
const udp = tcpUdpTriples[1]; // UDP | Reliability → Best-effort (No retransmission)

function baseParams(overrides: Record<string, unknown> = {}) {
  return {
    axis: "object" as const,
    scope: "single" as const,
    triples: [tcp],
    groups: tcpUdpGroups,
    rng: seedRng(42),
    ...overrides,
  };
}

// ── multiple_choice ─────────────────────────────────────────────

describe("S07: assembleQuestion — multiple_choice", () => {
  test("returns 1 correct + up to 3 distractor options", () => {
    const q = assembleQuestion(baseParams({ format: "multiple_choice" }));
    const correct = q.options.filter((o) => o.correct);
    const incorrect = q.options.filter((o) => !o.correct);
    expect(correct).toHaveLength(1);
    expect(incorrect.length).toBeGreaterThanOrEqual(1);
    expect(incorrect.length).toBeLessThanOrEqual(3);
  });

  test("correctAnswer matches the target axis value", () => {
    const q = assembleQuestion(baseParams({ format: "multiple_choice" }));
    expect(q.correctAnswer).toBe("Guaranteed (Retransmission)");
  });

  test("shuffle is deterministic with same seed", () => {
    const q1 = assembleQuestion(baseParams({ format: "multiple_choice", rng: seedRng(1) }));
    const q2 = assembleQuestion(baseParams({ format: "multiple_choice", rng: seedRng(1) }));
    expect(q1.options.map((o) => o.text)).toEqual(q2.options.map((o) => o.text));
  });

  test("no duplicate option texts", () => {
    const q = assembleQuestion(baseParams({ format: "multiple_choice" }));
    const texts = q.options.map((o) => o.text);
    expect(new Set(texts).size).toBe(texts.length);
  });

  test("prompt uses object axis format", () => {
    const q = assembleQuestion(baseParams({ format: "multiple_choice" }));
    expect(q.prompt).toBe("TCP | Reliability → ?");
  });
});

// ── select_all ──────────────────────────────────────────────────

describe("S07: assembleQuestion — select_all", () => {
  // Use two triples with the same subject+predicate for select_all
  const selectAllTriples: QuizTriple[] = [
    { id: "1", subject: "TCP", predicate: "Reliability", object: "Guaranteed (Retransmission)" },
    { id: "extra", subject: "TCP", predicate: "Reliability", object: "Ordered Delivery" },
  ];

  function selectAllParams(overrides: Record<string, unknown> = {}) {
    return {
      axis: "object" as const,
      scope: "cell" as const,
      format: "select_all" as const,
      triples: selectAllTriples,
      groups: tcpUdpGroups,
      rng: seedRng(42),
      ...overrides,
    };
  }

  test("all correct objects appear as correct options", () => {
    const q = assembleQuestion(selectAllParams());
    const correctTexts = q.options.filter((o) => o.correct).map((o) => o.text);
    expect(correctTexts.sort()).toEqual(["Guaranteed (Retransmission)", "Ordered Delivery"]);
  });

  test("no distractor overlaps with any correct object", () => {
    const q = assembleQuestion(selectAllParams());
    const correctTexts = new Set(q.options.filter((o) => o.correct).map((o) => o.text));
    const distractorTexts = q.options.filter((o) => !o.correct).map((o) => o.text);
    for (const d of distractorTexts) {
      expect(correctTexts.has(d)).toBe(false);
    }
  });

  test("prompt includes (Select all)", () => {
    const q = assembleQuestion(selectAllParams());
    expect(q.prompt).toContain("(Select all)");
    expect(q.prompt).toContain("TCP | Reliability");
  });

  test("tripleIds include all input triples", () => {
    const q = assembleQuestion(selectAllParams());
    expect(q.tripleIds.sort()).toEqual(["1", "extra"]);
  });

  test("correctAnswer joins all correct objects", () => {
    const q = assembleQuestion(selectAllParams());
    expect(q.correctAnswer).toBe("Guaranteed (Retransmission), Ordered Delivery");
  });

  test("shuffle is deterministic with same seed", () => {
    const q1 = assembleQuestion(selectAllParams({ rng: seedRng(7) }));
    const q2 = assembleQuestion(selectAllParams({ rng: seedRng(7) }));
    expect(q1.options.map((o) => o.text)).toEqual(q2.options.map((o) => o.text));
  });
});

// ── true_false ──────────────────────────────────────────────────

describe("S07: assembleQuestion — true_false", () => {
  test("swaps when rng < 0.5 and distractors exist", () => {
    // rng that always returns a value < 0.5
    const q = assembleQuestion(baseParams({
      format: "true_false",
      rng: () => 0.1,
    }));
    expect(q.correctAnswer).toBe("false");
    expect(q.prompt).not.toContain("Guaranteed (Retransmission)");
  });

  test("no swap when rng >= 0.5", () => {
    const q = assembleQuestion(baseParams({
      format: "true_false",
      rng: () => 0.9,
    }));
    expect(q.correctAnswer).toBe("true");
    expect(q.prompt).toContain("Guaranteed (Retransmission)");
  });

  test("always true when no distractors available", () => {
    const isolatedTriple: QuizTriple = { id: "x1", subject: "A", predicate: "P1", object: "V1" };
    const isolatedGroups: PredicateGroup[] = [
      { predicate: "P1", triples: [isolatedTriple], subjects: ["A"] },
    ];
    // rng < 0.5 would swap, but no distractors exist
    const q = assembleQuestion({
      axis: "object",
      scope: "single",
      format: "true_false",
      triples: [isolatedTriple],
      groups: isolatedGroups,
      rng: () => 0.1,
    });
    expect(q.correctAnswer).toBe("true");
  });

  test("prompt contains the triple content", () => {
    const q = assembleQuestion(baseParams({
      format: "true_false",
      rng: () => 0.9,
    }));
    expect(q.prompt).toBe("TCP | Reliability → Guaranteed (Retransmission)");
  });

  test("options are True and False", () => {
    const q = assembleQuestion(baseParams({
      format: "true_false",
      rng: () => 0.9,
    }));
    const texts = q.options.map((o) => o.text).sort();
    expect(texts).toEqual(["False", "True"]);
  });

  test("swapped prompt uses distractor object", () => {
    const q = assembleQuestion(baseParams({
      format: "true_false",
      rng: () => 0.1,
    }));
    // Should contain TCP | Reliability → <distractor>
    expect(q.prompt).toMatch(/^TCP \| Reliability → .+$/);
    expect(q.prompt).not.toContain("Guaranteed (Retransmission)");
  });
});

// ── matching ────────────────────────────────────────────────────

describe("S07: assembleQuestion — matching", () => {
  const reliabilityTriples = [tcpUdpTriples[0], tcpUdpTriples[1]];

  function matchingParams(overrides: Record<string, unknown> = {}) {
    return {
      axis: "object" as const,
      scope: "paired" as const,
      format: "matching" as const,
      triples: reliabilityTriples,
      groups: tcpUdpGroups,
      rng: seedRng(42),
      ...overrides,
    };
  }

  test("each option is subject → object format", () => {
    const q = assembleQuestion(matchingParams());
    for (const opt of q.options) {
      expect(opt.text).toMatch(/^.+ → .+$/);
    }
  });

  test("prompt includes predicate and (Match each subject to its object)", () => {
    const q = assembleQuestion(matchingParams());
    expect(q.prompt).toBe("? | Reliability → ? (Match each subject to its object)");
  });

  test("all options marked correct", () => {
    const q = assembleQuestion(matchingParams());
    expect(q.options.every((o) => o.correct)).toBe(true);
  });

  test("tripleIds match input triples", () => {
    const q = assembleQuestion(matchingParams());
    expect(q.tripleIds).toEqual(["1", "2"]);
  });

  test("correctAnswer joins all option texts with semicolons", () => {
    const q = assembleQuestion(matchingParams());
    expect(q.correctAnswer).toBe(
      "TCP → Guaranteed (Retransmission); UDP → Best-effort (No retransmission)"
    );
  });
});

// ── fill_blank ──────────────────────────────────────────────────

describe("S07: assembleQuestion — fill_blank", () => {
  test("object axis: blank at the end", () => {
    const q = assembleQuestion(baseParams({ format: "fill_blank", axis: "object" }));
    expect(q.prompt).toBe("TCP | Reliability → _________");
    expect(q.correctAnswer).toBe("Guaranteed (Retransmission)");
  });

  test("subject axis: blank at the start", () => {
    const q = assembleQuestion(baseParams({ format: "fill_blank", axis: "subject" }));
    expect(q.prompt).toBe("_________ | Reliability → Guaranteed (Retransmission)");
    expect(q.correctAnswer).toBe("TCP");
  });

  test("predicate axis: blank in the middle", () => {
    const q = assembleQuestion(baseParams({ format: "fill_blank", axis: "predicate" }));
    expect(q.prompt).toBe("TCP | _________ → Guaranteed (Retransmission)");
    expect(q.correctAnswer).toBe("Reliability");
  });

  test("options are empty for fill_blank", () => {
    const q = assembleQuestion(baseParams({ format: "fill_blank" }));
    expect(q.options).toEqual([]);
  });

  test("tripleIds contains the single triple", () => {
    const q = assembleQuestion(baseParams({ format: "fill_blank" }));
    expect(q.tripleIds).toEqual(["1"]);
  });
});
