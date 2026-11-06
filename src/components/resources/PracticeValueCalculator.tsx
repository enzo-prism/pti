"use client";

import Link from "next/link";
import { parseScenarioNumber } from "@/lib/scenarioInput";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, Info } from "lucide-react";
import { trackEvent, trackSelectCta } from "@/lib/analytics";
import { calculatePracticeValue, PRACTICE_VALUE_ASSUMPTIONS, type PracticeType } from "@/lib/practiceValue";

const CALCULATION_SETTLE_MS = 1200;

const DEFAULT_MARGIN = 40; // An editable scenario, not a typical market margin.

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const parseNumber = parseScenarioNumber;

const collectionsBucket = (collections: number): string => {
  if (collections < 500_000) return "under_500k";
  if (collections < 1_000_000) return "500k_1m";
  if (collections < 2_000_000) return "1m_2m";
  return "2m_plus";
};

export function PracticeValueCalculator() {
  const [collectionsInput, setCollectionsInput] = useState("");
  const [practiceType, setPracticeType] = useState<PracticeType>("general");
  const [marginInput, setMarginInput] = useState(String(DEFAULT_MARGIN));
  const hasTrackedRef = useRef(false);
  const trackTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(trackTimerRef.current), []);

  const collections = parseNumber(collectionsInput);
  const marginPct = (() => {
    if (!/^\d+(\.\d+)?$/.test(marginInput)) return NaN;
    return Number(marginInput);
  })();

  const result = useMemo(() => {
    if (!collections) return null;

    return calculatePracticeValue(collections, marginPct, practiceType);
  }, [collections, practiceType, marginPct]);

  // Record one calculation once the visitor stops typing. Tracking the first
  // keystroke would bucket almost every entry by its first digit.
  const handleCollectionsChange = (value: string) => {
    setCollectionsInput(value);
    if (hasTrackedRef.current) return;
    window.clearTimeout(trackTimerRef.current);
    const parsed = parseNumber(value);
    if (!parsed) return;
    trackTimerRef.current = window.setTimeout(() => {
      hasTrackedRef.current = true;
      trackEvent("calculate_practice_value", {
        practice_type: practiceType,
        collections_bucket: collectionsBucket(parsed),
      });
    }, CALCULATION_SETTLE_MS);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white px-6 py-5 flex items-center gap-3">
          <Calculator className="h-6 w-6 flex-shrink-0" />
          <div>
            <h2 className="text-lg md:text-xl font-semibold leading-tight">
              Dental Practice Value Estimator
            </h2>
            <p className="text-sm text-blue-50/90">
              Explore how two illustrative methods respond to your assumptions.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="annual-collections">Annual collections</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="annual-collections"
                  inputMode="numeric"
                  placeholder="1,200,000"
                  className="h-11 pl-7 text-base md:text-sm"
                  value={collectionsInput}
                  onChange={(event) => handleCollectionsChange(event.target.value)}
                  aria-describedby="collections-help"
                  aria-invalid={collectionsInput !== "" && collections === null}
                />
              </div>
              <p id="collections-help" className="text-xs text-gray-500">
                Your practice&apos;s total annual collections (not production).
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profit-margin">Owner benefit margin</Label>
              <div className="relative">
                <Input
                  id="profit-margin"
                  inputMode="numeric"
                  className="h-11 pr-8 text-base md:text-sm"
                  value={marginInput}
                  onChange={(event) => setMarginInput(event.target.value)}
                  aria-describedby="margin-help"
                  aria-invalid={!Number.isFinite(marginPct) || marginPct < 0 || marginPct > 100}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
              <p id="margin-help" className="text-xs text-gray-500">
                Owner benefit before owner-dentist pay, as a percentage of collections (0–100%). The default 40% is an example, not a market benchmark or adjusted EBITDA.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Practice type</Label>
            <RadioGroup
              value={practiceType}
              onValueChange={(value) => setPracticeType(value as PracticeType)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {(
                [
                  { value: "general", label: "General dentistry" },
                  { value: "specialty", label: "Specialty (ortho, oral surgery, perio, endo, pedo)" },
                ] as const
              ).map((option) => {
                const isSelected = practiceType === option.value;
                return (
                  <label
                    key={option.value}
                    htmlFor={`type-${option.value}`}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                      isSelected
                        ? "border-primary bg-accent"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={`type-${option.value}`} />
                    <span className="text-sm font-medium text-gray-700">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </RadioGroup>
          </div>
        </div>

        {/* Result */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-6">
          {result ? (
            <div>
              <p className="text-sm text-gray-600 mb-1">Illustrative combined range · equal weighting</p>
              <p aria-live="polite" className="text-3xl md:text-4xl font-bold text-primary">
                {currency.format(result.low)}
                <span className="text-gray-400 font-normal"> – </span>
                {currency.format(result.high)}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                    Percent-of-collections method
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {currency.format(Math.round(result.collLow))} –{" "}
                    {currency.format(Math.round(result.collHigh))}
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                    Owner-benefit multiple method
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {currency.format(Math.round(result.earnLow))} –{" "}
                    {currency.format(Math.round(result.earnHigh))}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    on ~{currency.format(Math.round(result.adjustedEarnings))} adjusted
                    owner benefit before owner-dentist pay
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Enter positive annual collections and a margin from 0 to 100% to explore a scenario.
            </p>
          )}

          <details className="mt-5 text-sm leading-relaxed text-muted-foreground">
            <summary className="min-h-11 cursor-pointer py-3 font-semibold text-primary">See the assumptions and calculation</summary>
            <p>For {practiceType === "general" ? "general dentistry" : "specialty practices"}, this teaching model applies {PRACTICE_VALUE_ASSUMPTIONS[practiceType].collections.low * 100}–{PRACTICE_VALUE_ASSUMPTIONS[practiceType].collections.high * 100}% of collections and {PRACTICE_VALUE_ASSUMPTIONS[practiceType].earnings.low}–{PRACTICE_VALUE_ASSUMPTIONS[practiceType].earnings.high} times owner benefit. The combined range averages the two low endpoints and the two high endpoints equally. These assumptions are not current sales comparables.</p>
            <p className="mt-3">Owner benefit and adjusted EBITDA are different measures. An earnings analysis for an institutional buyer must account for appropriate clinician compensation and other adjustments. This calculator does not model debt, real estate, taxes, transaction costs or contingent payments.</p>
          </details>

          <div className="flex items-start gap-2 mt-5 text-xs text-gray-500 leading-relaxed">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>
              This is a broad educational estimate, not an appraisal. Real practice
              value depends on profitability, patient base, payer mix, location, lease,
              equipment, and team — factors a rule of thumb can&apos;t capture. Use it as
              a starting point, then get a defensible number from a professional{" "}
              <Link
                href="/services/value"
                className="text-primary font-semibold hover:underline"
              >
                Opinion of Value
              </Link>
              .
            </p>
          </div>

          <div className="mt-5">
            <Button
              asChild
              size="lg"
              className="h-auto min-h-11 w-full whitespace-normal px-4 py-3 text-center leading-snug sm:w-auto sm:px-8"
              onClick={() =>
                trackSelectCta("request_opinion_of_value", "practice_value_calculator")
              }
            >
              <Link href="/contact">Get a Professional Opinion of Value</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeValueCalculator;
