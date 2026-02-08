import type { QuizTriple, PredicateGroup } from "./types.js";

export function sourceDistractors(
  target: QuizTriple,
  groups: PredicateGroup[],
  count: number
): string[] {
  if (count <= 0) return [];

  const targetObject = target.object;
  const distractors: string[] = [];
  const seen = new Set<string>([targetObject]);

  // Priority 1: same-predicate, different-subject objects
  const samePredicateGroup = groups.find(
    (g) => g.predicate === target.predicate
  );
  if (samePredicateGroup) {
    for (const triple of samePredicateGroup.triples) {
      if (distractors.length >= count) break;
      if (triple.subject !== target.subject && !seen.has(triple.object)) {
        seen.add(triple.object);
        distractors.push(triple.object);
      }
    }
  }

  // Priority 2: adjacent-predicate objects (any predicate != target predicate)
  if (distractors.length < count) {
    for (const group of groups) {
      if (group.predicate === target.predicate) continue;
      for (const triple of group.triples) {
        if (distractors.length >= count) break;
        if (!seen.has(triple.object)) {
          seen.add(triple.object);
          distractors.push(triple.object);
        }
      }
      if (distractors.length >= count) break;
    }
  }

  return distractors.slice(0, count);
}
