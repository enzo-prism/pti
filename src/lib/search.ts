/**
 * Shared search primitives for the site-wide search control.
 *
 * The client component (`SiteSearch`) never imports the raw content modules:
 * it fetches `/search-index.json` (built at build time by
 * `scripts/build-search-index.ts`) and filters with the pure helpers here.
 */

/** Content kinds that can appear in the search index. */
export type SearchRecordType =
  | "page"
  | "post"
  | "event"
  | "resource"
  | "faq"
  | "location";

export interface SearchRecord {
  title: string;
  excerpt: string;
  url: string;
  type: SearchRecordType;
}

/** URL of the build-time search index, served as a static asset. */
export const SEARCH_INDEX_URL = "/search-index.json";

/** Maximum results shown in the dropdown. */
export const SEARCH_RESULT_LIMIT = 8;

const TYPE_LABELS: Record<SearchRecordType, string> = {
  page: "Page",
  post: "Article",
  event: "Event",
  resource: "Resource",
  faq: "FAQ",
  location: "Location",
};

/** Human-readable label for a search record type. */
export function searchTypeLabel(type: SearchRecordType): string {
  return TYPE_LABELS[type];
}

/**
 * Filter records by case-insensitive substring match on title and excerpt.
 *
 * Title matches rank before excerpt-only matches; within each group the
 * original index order is preserved. Returns at most SEARCH_RESULT_LIMIT
 * records. An empty query returns an empty list.
 */
export function filterSearchRecords(
  records: readonly SearchRecord[],
  query: string,
): SearchRecord[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const titleMatches: SearchRecord[] = [];
  const excerptMatches: SearchRecord[] = [];

  for (const record of records) {
    const title = record.title.toLowerCase();
    const excerpt = record.excerpt.toLowerCase();
    if (title.includes(needle)) {
      titleMatches.push(record);
    } else if (excerpt.includes(needle)) {
      excerptMatches.push(record);
    }
  }

  return [...titleMatches, ...excerptMatches].slice(0, SEARCH_RESULT_LIMIT);
}
