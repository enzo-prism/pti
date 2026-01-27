import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          Page not found
        </p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          We can't find that page.
        </h1>
        <p className="mt-3 text-base text-gray-600">
          The page may have moved. Try heading back to the homepage.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Back to homepage</Link>
      </Button>
    </div>
  );
}
