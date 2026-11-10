/** Read positive decimal USD/percentage inputs without turning negative values into positive ones. */
export function parseScenarioNumber(value: string): number | null {
  const cleaned = value.trim().replace(/[$,\s]/g, "");
  if (!/^\d+(?:\.\d+)?$/.test(cleaned)) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
