import { classifyObjects } from "../../domain/engine/classify.js";
import type { PredicateGroup } from "../../domain/engine/types.js";
import { energyLevelGroup, mentalStateGroup, autonomicGroup } from "./fixtures.js";

describe("classifyObjects", () => {
  test("Energy Level: fully shared, no discriminating objects", () => {
    // Arrange
    const group = energyLevelGroup;

    // Act
    const result = classifyObjects(group);

    // Assert
    expect(result.shared.sort()).toEqual(["Fatigue", "Weakness"]);
    expect(result.bySubject.size).toBe(0);
  });

  test("Mental State: one shared, two discriminating", () => {
    // Arrange
    const group = mentalStateGroup;

    // Act
    const result = classifyObjects(group);

    // Assert
    expect(result.shared).toEqual(["Confusion"]);
    expect(result.bySubject.get("Hypoglycemia")).toEqual(["Irritability"]);
    expect(result.bySubject.get("Hyperglycemia")).toEqual(["Lethargy"]);
  });

  test("Autonomic: one shared, multiple discriminating per subject", () => {
    // Arrange
    const group = autonomicGroup;

    // Act
    const result = classifyObjects(group);

    // Assert
    expect(result.shared).toEqual(["Tachycardia"]);
    expect(result.bySubject.get("Hypoglycemia")?.sort()).toEqual(
      ["Pallor", "Sweating", "Tremor"]
    );
    expect(result.bySubject.get("Hyperglycemia")?.sort()).toEqual(
      ["Extreme Thirst", "Frequent Urination"]
    );
  });

  test("single-subject group: all objects are discriminating", () => {
    // Arrange
    const group: PredicateGroup = {
      predicate: "Test",
      triples: [
        { id: "t1", subject: "A", predicate: "Test", object: "X" },
        { id: "t2", subject: "A", predicate: "Test", object: "Y" },
      ],
      subjects: ["A"],
    };

    // Act
    const result = classifyObjects(group);

    // Assert
    expect(result.shared).toEqual([]);
    expect(result.bySubject.get("A")?.sort()).toEqual(["X", "Y"]);
  });
});
