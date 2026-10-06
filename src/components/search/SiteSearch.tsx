"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  CircleHelp,
  FileText,
  Loader2,
  MapPin,
  Newspaper,
  Search,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  SEARCH_INDEX_URL,
  filterSearchRecords,
  searchTypeLabel,
  type SearchRecord,
  type SearchRecordType,
} from "@/lib/search";

const TYPE_ICONS: Record<SearchRecordType, typeof FileText> = {
  page: FileText,
  post: Newspaper,
  event: CalendarDays,
  resource: BookOpen,
  faq: CircleHelp,
  location: MapPin,
};

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

/**
 * Site-wide search control for the header.
 *
 * The search index (`/search-index.json`, built at build time) is fetched
 * lazily on first interaction so the initial page weight is unchanged. The
 * control is a single instance rendered in the header row, so it works in
 * both the desktop nav and the mobile layout.
 */
const SiteSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<SearchRecord[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const panelId = useId();

  const results = useMemo(
    () => (records ? filterSearchRecords(records, query) : []),
    [records, query],
  );
  const showResults = open && query.trim().length > 0;
  const activeId =
    activeIndex >= 0 && activeIndex < results.length
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

  const loadIndex = () => {
    if (records || isLoading || loadFailed) return;
    setIsLoading(true);
    fetch(SEARCH_INDEX_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Search index request failed");
        return response.json() as Promise<SearchRecord[]>;
      })
      .then((data) => setRecords(data))
      .catch(() => setLoadFailed(true))
      .finally(() => setIsLoading(false));
  };

  const close = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
  };

  const toggleOpen = () => {
    if (open) {
      close();
      return;
    }
    loadIndex();
    setOpen(true);
  };

  // Close when the route changes (e.g. after following a result).
  useEffect(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }, [pathname]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open ]);

  // Close on outside pointer down and on Escape.
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0 ? -1 : Math.min(index + 1, results.length - 1),
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0 ? -1 : Math.max(index - 1, 0),
      );
    } else if (event.key === "Enter") {
      const selected =
        activeIndex >= 0 && activeIndex < results.length
          ? results[activeIndex]
          : undefined;
      if (selected) {
        event.preventDefault();
        close();
        router.push(selected.url);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        ref={toggleRef}
        type="button"
        onClick={toggleOpen}
        aria-label={open ? "Close site search" : "Search site"}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-800 transition-colors hover:bg-slate-100 hover:text-primary",
          focusClass,
        )}
      >
        {open ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <Search size={22} aria-hidden="true" />
        )}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute right-0 top-full z-[90] mt-2 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
        >
          <div className="p-3">
            <Input
              ref={inputRef}
              type="search"
              role="combobox"
              aria-label="Search site"
              aria-expanded={showResults}
              aria-controls={listboxId}
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              placeholder="Search articles, events, services..."
              autoComplete="off"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleInputKeyDown}
            />
          </div>

          {showResults ? (
            <div className="max-h-[60dvh] overflow-y-auto border-t border-slate-100">
              {isLoading ? (
                <p className="flex min-h-11 items-center gap-2 px-4 py-3 text-sm text-slate-500">
                  <Loader2
                    size={16}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  Loading search...
                </p>
              ) : loadFailed ? (
                <p className="px-4 py-3 text-sm text-slate-500">
                  Search is unavailable right now. Please try again later.
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-3 text-sm text-slate-500">
                  No results for &ldquo;{query.trim()}&rdquo;.
                </p>
              ) : (
                <ul role="listbox" id={listboxId} aria-label="Search results">
                  {results.map((result, index) => {
                    const Icon = TYPE_ICONS[result.type];
                    const isActive = index === activeIndex;
                    return (
                      <li
                        key={`${result.url}-${index}`}
                        role="option"
                        id={`${listboxId}-option-${index}`}
                        aria-selected={isActive}
                      >
                        <Link
                          href={result.url}
                          onClick={close}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={cn(
                            "flex min-h-11 items-start gap-3 px-4 py-2.5 transition-colors",
                            focusClass,
                            isActive
                              ? "bg-primary/10"
                              : "hover:bg-primary/5",
                          )}
                        >
                          <Icon
                            size={18}
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-primary"
                          />
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-baseline gap-x-2">
                              <span className="text-sm font-semibold text-slate-800">
                                {result.title}
                              </span>
                              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                {searchTypeLabel(result.type)}
                              </span>
                            </span>
                            <span className="mt-0.5 line-clamp-2 block text-sm text-slate-500">
                              {result.excerpt}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SiteSearch;
