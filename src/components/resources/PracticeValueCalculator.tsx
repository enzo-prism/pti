"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, Info } from "lucide-react";
import { trackEvent, trackSelectCta } from "@/lib/analytics";

type PracticeType = "general" | "specialty";

// Honest, widely-cited rule-of-thumb bands. These are intentionally broad —
// they exist to educate, not to replace a professional Opinion of Value.
const MODEL: Record<
  PracticeType,
  { collections: { low: number; high: number }; earnings: { low: number; high: number } }
> = {
  general: {
    collections: { low: 0.6, high: 0.85 },
    earnings: { low: 2.5, high: 4.0 },
  },
  specialty: {
    collections: { low: 0.62, high: 0.9 },
    earnings: { low: 3.0, high: 5.5 },
  },
};

const DEFAULT_MARGIN = 40; // % of collections left as adjusted earnings (≈60% overhead)

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const parseNumber = (value: string): number | null => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

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

  const collections = parseNumber(collectionsInput);
  const marginPct = (() => {
    const parsed = Number.parseFloat(marginInput.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(parsed)) return DEFAULT_MARGIN;
    return Math.min(60, Math.max(15, parsed));
  })();

  const result = useMemo(() => {
    if (!collections) return null;

    const model = MODEL[practiceType];
    const collLow = collections * model.collections.low;
    const collHigh = collections * model.collections.high;

    const adjustedEarnings = collections * (marginPct / 100);
    const earnLow = adjustedEarnings * model.earnings.low;
    const earnHigh = adjustedEarnings * model.earnings.high;

    // Blend the collections method and the earnings method for the headline range.
    const low = Math.round((collLow + earnLow) / 2);
    const high = Math.round((collHigh + earnHigh) / 2);

    return {
      low: Math.min(low, high),
      high: Math.max(low, high),
      collLow,
      collHigh,
      earnLow,
      earnHigh,
      adjustedEarnings,
    };
  }, [collections, practiceType, marginPct]);

  const handleCollectionsChange = (value: string) => {
    setCollectionsInput(value);
    const parsed = parseNumber(value);
    if (parsed && !hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent("calculate_practice_value", {
        practice_type: practiceType,
        collections_bucket: collectionsBucket(parsed),
      });
    }
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
              A quick, ballpark range based on the two methods buyers use most.
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
                />
              </div>
              <p id="collections-help" className="text-xs text-gray-500">
                Your practice&apos;s total annual collections (not production).
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profit-margin">Adjusted profit margin</Label>
              <div className="relative">
                <Input
                  id="profit-margin"
                  inputMode="numeric"
                  className="h-11 pr-8 text-base md:text-sm"
                  value={marginInput}
                  onChange={(event) => setMarginInput(event.target.value)}
                  aria-describedby="margin-help"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
              <p id="margin-help" className="text-xs text-gray-500">
                Earnings left after overhead. Typical dental practices run 35–45%.
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
              <p className="text-sm text-gray-600 mb-1">Estimated value range</p>
              <p className="text-3xl md:text-4xl font-bold text-primary">
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
                    Earnings-multiple method
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {currency.format(Math.round(result.earnLow))} –{" "}
                    {currency.format(Math.round(result.earnHigh))}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    on ~{currency.format(Math.round(result.adjustedEarnings))} adjusted
                    earnings
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Enter your annual collections above to see an estimated range.
            </p>
          )}

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
