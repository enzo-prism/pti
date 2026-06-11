"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackSelectCta } from "@/lib/analytics";

export const PrintChecklistButton = () => (
  <Button
    type="button"
    variant="outline"
    size="lg"
    className="w-full sm:w-auto print:hidden"
    onClick={() => {
      trackSelectCta("print_checklist", "checklist_page");
      window.print();
    }}
  >
    <Printer aria-hidden="true" />
    Print or save as PDF
  </Button>
);
