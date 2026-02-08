// ── Session Orchestrator ─────────────────────────────────────────
// Pure domain service: takes triples + config, returns generated Questions.
// No DB access, no HTTP — this is the Quiz bounded context's orchestrator.

import type { Axis, Format, QuizTriple, Question } from "./types.js";
import { groupByPredicate } from "./group.js";
import { assembleQuestion } from "./assemble.js";

export interface OrchestrateParams {
  triples: QuizTriple[];
  axis?: Axis;
  format?: Format;
  seed?: number;
  count?: number;
}

function seededRng(seed: number): () => number {
  // Simple mulberry32 PRNG for deterministic question generation
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DEFAULT_FORMATS: Format[] = [
  "multiple_choice",
  "true_false",
  "fill_blank",
];

const MULTI_TRIPLE_FORMATS: Format[] = ["select_all", "matching"];

/**
 * Generate questions from a set of triples.
 *
 * Pipeline: triples → groupByPredicate → for each group, assemble questions
 * for each axis/format combination → shuffle and trim to count.
 */
export function orchestrate(params: OrchestrateParams): Question[] {
  const { triples, axis, format, seed, count } = params;

  if (triples.length === 0) return [];

  const rng = seededRng(seed ?? Date.now());
  const groups = groupByPredicate(triples);

  const questions: Question[] = [];

  // Determine which axes to generate for
  const axes: Axis[] = axis ? [axis] : ["object", "subject", "predicate"];

  // Determine which formats to generate for
  const singleFormats: Format[] = format
    ? [format]
    : DEFAULT_FORMATS;
  const multiFormats: Format[] = format
    ? MULTI_TRIPLE_FORMATS.includes(format) ? [format] : []
    : MULTI_TRIPLE_FORMATS;

  for (const group of groups) {
    for (const currentAxis of axes) {
      // Single-triple formats: one question per triple
      for (const currentFormat of singleFormats) {
        for (const triple of group.triples) {
          questions.push(
            assembleQuestion({
              axis: currentAxis,
              scope: group.subjects.length > 1 ? "cross_subject" : "single",
              format: currentFormat,
              triples: [triple],
              groups,
              rng,
            })
          );
        }
      }

      // Multi-triple formats: one question per group (need 2+ triples)
      if (group.triples.length >= 2) {
        for (const currentFormat of multiFormats) {
          questions.push(
            assembleQuestion({
              axis: currentAxis,
              scope: "cross_subject",
              format: currentFormat,
              triples: group.triples,
              groups,
              rng,
            })
          );
        }
      }
    }
  }

  // Shuffle questions deterministically
  const shuffled = shuffle(questions, rng);

  // Trim to requested count
  const limit = count ?? shuffled.length;
  return shuffled.slice(0, limit);
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
