import { groupByPredicate } from "../../domain/engine/group.js";
import type { QuizTriple } from "../../domain/engine/types.js";
import { tcpUdpTriples, medicalTriples } from "./fixtures.js";

describe("groupByPredicate", () => {
  test("TCP/UDP dataset produces 3 predicate groups", () => {
    // Arrange
    const triples = tcpUdpTriples;

    // Act
    const groups = groupByPredicate(triples);

    // Assert
    expect(groups).toHaveLength(3);
    const predicates = groups.map((g) => g.predicate);
    expect(predicates).toEqual(["Reliability", "Flow Control", "OSI Layer"]);
  });

  test("TCP/UDP groups have correct subjects", () => {
    // Arrange
    const triples = tcpUdpTriples;

    // Act
    const groups = groupByPredicate(triples);

    // Assert
    for (const group of groups) {
      expect(group.subjects.sort()).toEqual(["TCP", "UDP"]);
    }
  });

  test("TCP/UDP groups have correct triple counts", () => {
    // Arrange
    const triples = tcpUdpTriples;

    // Act
    const groups = groupByPredicate(triples);

    // Assert
    for (const group of groups) {
      expect(group.triples).toHaveLength(2);
    }
  });

  test("medical dataset produces 5 predicate groups", () => {
    // Arrange
    const triples = medicalTriples;

    // Act
    const groups = groupByPredicate(triples);

    // Assert
    expect(groups).toHaveLength(5);
    const predicates = groups.map((g) => g.predicate);
    expect(predicates).toEqual([
      "Energy Level",
      "Mental State",
      "Neurological",
      "Autonomic",
      "GI",
    ]);
  });

  test("medical groups have correct triple counts", () => {
    // Arrange
    const triples = medicalTriples;

    // Act
    const groups = groupByPredicate(triples);
    const countByPredicate = new Map(groups.map((g) => [g.predicate, g.triples.length]));

    // Assert
    expect(countByPredicate.get("Energy Level")).toBe(4);
    expect(countByPredicate.get("Mental State")).toBe(4);
    expect(countByPredicate.get("Neurological")).toBe(7);
    expect(countByPredicate.get("Autonomic")).toBe(7);
    expect(countByPredicate.get("GI")).toBe(5);
  });

  test("medical groups have correct subjects", () => {
    // Arrange
    const triples = medicalTriples;

    // Act
    const groups = groupByPredicate(triples);

    // Assert
    for (const group of groups) {
      expect(group.subjects.sort()).toEqual(["Hyperglycemia", "Hypoglycemia"]);
    }
  });

  test("empty input returns empty array", () => {
    // Arrange
    const triples: QuizTriple[] = [];

    // Act
    const groups = groupByPredicate(triples);

    // Assert
    expect(groups).toEqual([]);
  });
});
