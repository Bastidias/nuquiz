import type { PredicateGroup, ClassifiedObjects } from "./types.js";

export function classifyObjects(group: PredicateGroup): ClassifiedObjects {
  // Build a map: object -> set of subjects that have it
  const objectSubjects = new Map<string, Set<string>>();

  for (const triple of group.triples) {
    const subjects = objectSubjects.get(triple.object);
    if (subjects) {
      subjects.add(triple.subject);
    } else {
      objectSubjects.set(triple.object, new Set([triple.subject]));
    }
  }

  const shared: string[] = [];
  const bySubject = new Map<string, string[]>();

  for (const [object, subjects] of objectSubjects) {
    if (subjects.size >= 2) {
      shared.push(object);
    } else {
      // Unique to exactly one subject
      const subject = [...subjects][0];
      const existing = bySubject.get(subject);
      if (existing) {
        existing.push(object);
      } else {
        bySubject.set(subject, [object]);
      }
    }
  }

  return { shared, bySubject };
}
