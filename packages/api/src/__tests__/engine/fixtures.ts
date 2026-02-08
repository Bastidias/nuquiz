import type { QuizTriple, PredicateGroup } from "../../domain/engine/types.js";
import { groupByPredicate } from "../../domain/engine/group.js";

// ── TCP/UDP dataset (6 triples) ────────────────────────────────
export const tcpUdpTriples: QuizTriple[] = [
  { id: "1", subject: "TCP", predicate: "Reliability", object: "Guaranteed (Retransmission)" },
  { id: "2", subject: "UDP", predicate: "Reliability", object: "Best-effort (No retransmission)" },
  { id: "3", subject: "TCP", predicate: "Flow Control", object: "Yes" },
  { id: "4", subject: "UDP", predicate: "Flow Control", object: "No" },
  { id: "5", subject: "TCP", predicate: "OSI Layer", object: "Transport Layer (Layer 4)" },
  { id: "6", subject: "UDP", predicate: "OSI Layer", object: "Transport Layer (Layer 4)" },
];

// ── Hypo/Hyper dataset (27 triples) ────────────────────────────
export const medicalTriples: QuizTriple[] = [
  { id: "m1", subject: "Hypoglycemia", predicate: "Energy Level", object: "Fatigue" },
  { id: "m2", subject: "Hypoglycemia", predicate: "Energy Level", object: "Weakness" },
  { id: "m3", subject: "Hyperglycemia", predicate: "Energy Level", object: "Fatigue" },
  { id: "m4", subject: "Hyperglycemia", predicate: "Energy Level", object: "Weakness" },
  { id: "m5", subject: "Hypoglycemia", predicate: "Mental State", object: "Confusion" },
  { id: "m6", subject: "Hypoglycemia", predicate: "Mental State", object: "Irritability" },
  { id: "m7", subject: "Hyperglycemia", predicate: "Mental State", object: "Confusion" },
  { id: "m8", subject: "Hyperglycemia", predicate: "Mental State", object: "Lethargy" },
  { id: "m9", subject: "Hypoglycemia", predicate: "Neurological", object: "Blurred Vision" },
  { id: "m10", subject: "Hypoglycemia", predicate: "Neurological", object: "Headache" },
  { id: "m11", subject: "Hypoglycemia", predicate: "Neurological", object: "Dizziness" },
  { id: "m12", subject: "Hypoglycemia", predicate: "Neurological", object: "Seizures" },
  { id: "m13", subject: "Hyperglycemia", predicate: "Neurological", object: "Blurred Vision" },
  { id: "m14", subject: "Hyperglycemia", predicate: "Neurological", object: "Headache" },
  { id: "m15", subject: "Hyperglycemia", predicate: "Neurological", object: "Numbness" },
  { id: "m16", subject: "Hypoglycemia", predicate: "Autonomic", object: "Tachycardia" },
  { id: "m17", subject: "Hypoglycemia", predicate: "Autonomic", object: "Sweating" },
  { id: "m18", subject: "Hypoglycemia", predicate: "Autonomic", object: "Tremor" },
  { id: "m19", subject: "Hypoglycemia", predicate: "Autonomic", object: "Pallor" },
  { id: "m20", subject: "Hyperglycemia", predicate: "Autonomic", object: "Tachycardia" },
  { id: "m21", subject: "Hyperglycemia", predicate: "Autonomic", object: "Extreme Thirst" },
  { id: "m22", subject: "Hyperglycemia", predicate: "Autonomic", object: "Frequent Urination" },
  { id: "m23", subject: "Hypoglycemia", predicate: "GI", object: "Nausea" },
  { id: "m24", subject: "Hypoglycemia", predicate: "GI", object: "Hunger" },
  { id: "m25", subject: "Hyperglycemia", predicate: "GI", object: "Nausea" },
  { id: "m26", subject: "Hyperglycemia", predicate: "GI", object: "Abdominal Pain" },
  { id: "m27", subject: "Hyperglycemia", predicate: "GI", object: "Vomiting" },
];

// ── Predicate groups from the Hypo/Hyper dataset ───────────────

export const energyLevelGroup: PredicateGroup = {
  predicate: "Energy Level",
  triples: [
    { id: "m1", subject: "Hypoglycemia", predicate: "Energy Level", object: "Fatigue" },
    { id: "m2", subject: "Hypoglycemia", predicate: "Energy Level", object: "Weakness" },
    { id: "m3", subject: "Hyperglycemia", predicate: "Energy Level", object: "Fatigue" },
    { id: "m4", subject: "Hyperglycemia", predicate: "Energy Level", object: "Weakness" },
  ],
  subjects: ["Hypoglycemia", "Hyperglycemia"],
};

export const mentalStateGroup: PredicateGroup = {
  predicate: "Mental State",
  triples: [
    { id: "m5", subject: "Hypoglycemia", predicate: "Mental State", object: "Confusion" },
    { id: "m6", subject: "Hypoglycemia", predicate: "Mental State", object: "Irritability" },
    { id: "m7", subject: "Hyperglycemia", predicate: "Mental State", object: "Confusion" },
    { id: "m8", subject: "Hyperglycemia", predicate: "Mental State", object: "Lethargy" },
  ],
  subjects: ["Hypoglycemia", "Hyperglycemia"],
};

export const autonomicGroup: PredicateGroup = {
  predicate: "Autonomic",
  triples: [
    { id: "m16", subject: "Hypoglycemia", predicate: "Autonomic", object: "Tachycardia" },
    { id: "m17", subject: "Hypoglycemia", predicate: "Autonomic", object: "Sweating" },
    { id: "m18", subject: "Hypoglycemia", predicate: "Autonomic", object: "Tremor" },
    { id: "m19", subject: "Hypoglycemia", predicate: "Autonomic", object: "Pallor" },
    { id: "m20", subject: "Hyperglycemia", predicate: "Autonomic", object: "Tachycardia" },
    { id: "m21", subject: "Hyperglycemia", predicate: "Autonomic", object: "Extreme Thirst" },
    { id: "m22", subject: "Hyperglycemia", predicate: "Autonomic", object: "Frequent Urination" },
  ],
  subjects: ["Hypoglycemia", "Hyperglycemia"],
};

// ── Pre-computed predicate groups ───────────────────────────────
export const tcpUdpGroups: PredicateGroup[] = groupByPredicate(tcpUdpTriples);
export const medicalGroups: PredicateGroup[] = groupByPredicate(medicalTriples);

// ── Deterministic RNG for tests ─────────────────────────────────
export function seedRng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
