import type { QuizTriple, PredicateGroup } from "./types.js";

export function groupByPredicate(triples: QuizTriple[]): PredicateGroup[] {
  const map = new Map<string, QuizTriple[]>();

  for (const triple of triples) {
    const existing = map.get(triple.predicate);
    if (existing) {
      existing.push(triple);
    } else {
      map.set(triple.predicate, [triple]);
    }
  }

  const groups: PredicateGroup[] = [];
  for (const [predicate, grouped] of map) {
    const subjects = [...new Set(grouped.map((t) => t.subject))];
    groups.push({ predicate, triples: grouped, subjects });
  }

  return groups;
}
