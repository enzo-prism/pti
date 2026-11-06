export type PracticeType = "general" | "specialty";

/** Educational scenario assumptions, not a dataset of completed transactions. */
export const PRACTICE_VALUE_ASSUMPTIONS = {
  general: { collections: { low: 0.6, high: 0.85 }, earnings: { low: 2.5, high: 4 } },
  specialty: { collections: { low: 0.62, high: 0.9 }, earnings: { low: 3, high: 5.5 } },
} as const;

export const calculatePracticeValue = (collections: number, ownerBenefitMargin: number, type: PracticeType) => {
  if (!Number.isFinite(collections) || collections <= 0 || collections > 1_000_000_000 || !Number.isFinite(ownerBenefitMargin) || ownerBenefitMargin < 0 || ownerBenefitMargin > 100) return null;
  const model = PRACTICE_VALUE_ASSUMPTIONS[type];
  const adjustedEarnings = collections * ownerBenefitMargin / 100;
  const collLow = collections * model.collections.low;
  const collHigh = collections * model.collections.high;
  const earnLow = adjustedEarnings * model.earnings.low;
  const earnHigh = adjustedEarnings * model.earnings.high;
  return { collLow, collHigh, earnLow, earnHigh, adjustedEarnings, low: Math.round((collLow + earnLow) / 2), high: Math.round((collHigh + earnHigh) / 2) };
};
