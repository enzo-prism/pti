import { permanentRedirect } from "next/navigation";
import { PRACTICE_TRANSITION_SEMINAR_PATH } from "@/data/practiceTransitionSeminar";

interface SeminarRedirectPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

const buildQueryString = (
  searchParams: SeminarRedirectPageProps["searchParams"]
) => {
  const params = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item) params.append(key, item);
      });
      return;
    }

    if (value) params.set(key, value);
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

export default function Page({ searchParams }: SeminarRedirectPageProps) {
  permanentRedirect(
    `${PRACTICE_TRANSITION_SEMINAR_PATH}${buildQueryString(searchParams)}`
  );
}
