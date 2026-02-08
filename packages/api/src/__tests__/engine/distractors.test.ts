import { sourceDistractors } from "../../domain/engine/distractors.js";
import { groupByPredicate } from "../../domain/engine/group.js";
import type { QuizTriple } from "../../domain/engine/types.js";
import { tcpUdpTriples, tcpUdpGroups } from "./fixtures.js";

describe("sourceDistractors", () => {
  test("same-predicate distractors sourced first", () => {
    // Arrange
    const target = tcpUdpTriples[0]; // TCP | Reliability → Guaranteed

    // Act
    const result = sourceDistractors(target, tcpUdpGroups, 1);

    // Assert — should get UDP's Reliability value first
    expect(result).toEqual(["Best-effort (No retransmission)"]);
  });

  test("falls back to adjacent-predicate when not enough same-predicate", () => {
    // Arrange
    const target = tcpUdpTriples[0]; // TCP | Reliability → Guaranteed
    // Only 1 same-predicate distractor available (UDP's Reliability), need 3 total

    // Act
    const result = sourceDistractors(target, tcpUdpGroups, 3);

    // Assert — first is same-predicate, rest are from other predicates
    expect(result[0]).toBe("Best-effort (No retransmission)");
    expect(result).toHaveLength(3);
    // The remaining distractors come from adjacent predicates
    for (const d of result.slice(1)) {
      expect(d).not.toBe("Guaranteed (Retransmission)");
    }
  });

  test("never returns own object", () => {
    // Arrange
    const target = tcpUdpTriples[0]; // TCP | Reliability → Guaranteed (Retransmission)

    // Act
    const result = sourceDistractors(target, tcpUdpGroups, 10);

    // Assert
    expect(result).not.toContain("Guaranteed (Retransmission)");
  });

  test("returns at most count items", () => {
    // Arrange
    const target = tcpUdpTriples[0];

    // Act
    const result = sourceDistractors(target, tcpUdpGroups, 2);

    // Assert
    expect(result.length).toBeLessThanOrEqual(2);
  });

  test("returns empty array when count is 0", () => {
    // Arrange
    const target = tcpUdpTriples[0];

    // Act
    const result = sourceDistractors(target, tcpUdpGroups, 0);

    // Assert
    expect(result).toEqual([]);
  });

  test("distractors only sourced from passed-in triples", () => {
    // Arrange — small isolated group with only 1 predicate, 1 subject
    const isolatedTriples: QuizTriple[] = [
      { id: "x1", subject: "A", predicate: "P1", object: "Val1" },
    ];
    const isolatedGroups = groupByPredicate(isolatedTriples);
    const target = isolatedTriples[0];

    // Act
    const result = sourceDistractors(target, isolatedGroups, 3);

    // Assert — no distractors possible from this tiny dataset
    expect(result).toEqual([]);
  });

  test("no duplicate distractors returned", () => {
    // Arrange
    const target = tcpUdpTriples[0]; // TCP | Reliability → Guaranteed

    // Act
    const result = sourceDistractors(target, tcpUdpGroups, 10);

    // Assert
    const uniqueValues = new Set(result);
    expect(uniqueValues.size).toBe(result.length);
  });

  test("shared objects from same predicate are not used as distractors", () => {
    // Arrange — OSI Layer is shared (both TCP and UDP have same value)
    const target = tcpUdpTriples[4]; // TCP | OSI Layer → Transport Layer (Layer 4)
    // UDP has the same value, so it can't be a distractor for same-predicate

    // Act
    const result = sourceDistractors(target, tcpUdpGroups, 3);

    // Assert — "Transport Layer (Layer 4)" should not appear as a distractor
    expect(result).not.toContain("Transport Layer (Layer 4)");
  });
});
