export type SearchKind = "page" | "article" | "event" | "faq" | "location";

export interface SearchRecord {
  id: string;
  title: string;
  description: string;
  path: string;
  kind: SearchKind;
  keywords: string[];
  /** Higher values win ties and help hub pages beat nested articles. */
  weight: number;
}

export interface SearchHit {
  record: SearchRecord;
  score: number;
}

export const SUGGESTED_SEARCH_PATHS = [
  "/",
  "/events",
  "/about",
  "/contact",
  "/blog",
  "/services",
] as const;

const DEFAULT_LIMIT = 8;

export const normalizeSearchText = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const tokenizeSearchText = (value: string): string[] =>
  normalizeSearchText(value).split(/\s+/).filter(Boolean);

const unique = (values: string[]): string[] => [...new Set(values)];

const fieldText = (record: SearchRecord): {
  title: string;
  description: string;
  keywords: string;
  all: string;
} => {
  const title = normalizeSearchText(record.title);
  const description = normalizeSearchText(record.description);
  const keywords = normalizeSearchText(record.keywords.join(" "));
  return {
    title,
    description,
    keywords,
    all: `${title} ${description} ${keywords} ${normalizeSearchText(record.path)}`,
  };
};

const tokenMatches = (haystackTokens: string[], queryToken: string): boolean =>
  haystackTokens.some(
    (token) => token === queryToken || token.startsWith(queryToken),
  );

const scoreRecord = (record: SearchRecord, query: string): number => {
  const normalizedQuery = normalizeSearchText(query);
  const queryTokens = tokenizeSearchText(query);
  if (!normalizedQuery || queryTokens.length === 0) return 0;

  const fields = fieldText(record);
  const titleTokens = tokenizeSearchText(record.title);
  const keywordTokens = tokenizeSearchText(record.keywords.join(" "));
  const descriptionTokens = tokenizeSearchText(record.description);

  const everyTokenPresent = queryTokens.every((token) =>
    tokenMatches(tokenizeSearchText(fields.all), token),
  );
  if (!everyTokenPresent) return 0;

  let score = record.weight;

  if (fields.title === normalizedQuery) score += 120;
  else if (fields.title.startsWith(normalizedQuery)) score += 70;
  else if (fields.title.includes(normalizedQuery)) score += 45;

  if (fields.keywords === normalizedQuery || keywordTokens.includes(normalizedQuery)) {
    score += 55;
  } else if (fields.keywords.includes(normalizedQuery)) {
    score += 30;
  }

  if (fields.description.includes(normalizedQuery)) score += 18;
  if (normalizeSearchText(record.path).includes(normalizedQuery)) score += 12;

  for (const token of queryTokens) {
    if (titleTokens.includes(token)) score += 16;
    else if (titleTokens.some((titleToken) => titleToken.startsWith(token))) score += 10;

    if (keywordTokens.includes(token)) score += 14;
    else if (keywordTokens.some((keyword) => keyword.startsWith(token))) score += 8;

    if (descriptionTokens.includes(token)) score += 5;
  }

  return score;
};

const compareHits = (left: SearchHit, right: SearchHit): number => {
  if (right.score !== left.score) return right.score - left.score;
  if (right.record.weight !== left.record.weight) {
    return right.record.weight - left.record.weight;
  }
  return left.record.title.localeCompare(right.record.title);
};

export const searchSite = (
  records: SearchRecord[],
  query: string,
  limit = DEFAULT_LIMIT,
): SearchHit[] => {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < 2) return [];

  const bestByPath = new Map<string, SearchHit>();

  for (const record of records) {
    const score = scoreRecord(record, query);
    if (score <= 0) continue;

    const current = bestByPath.get(record.path);
    if (!current || compareHits({ record, score }, current) < 0) {
      bestByPath.set(record.path, { record, score });
    }
  }

  return [...bestByPath.values()].sort(compareHits).slice(0, limit);
};

export const getSuggestedSearchRecords = (
  records: SearchRecord[],
): SearchRecord[] => {
  const pages = records.filter((record) => record.kind === "page");
  return unique([...SUGGESTED_SEARCH_PATHS]).flatMap((path) => {
    const match = pages.find((record) => record.path === path);
    return match ? [match] : [];
  });
};

export const searchKindLabel = (kind: SearchKind): string => {
  switch (kind) {
    case "page":
      return "Page";
    case "article":
      return "Article";
    case "event":
      return "Event";
    case "faq":
      return "FAQ";
    case "location":
      return "Location";
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
};
