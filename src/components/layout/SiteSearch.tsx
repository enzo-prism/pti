"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { trackSiteSearch } from "@/lib/analytics";
import {
  getSuggestedSearchRecords,
  searchKindLabel,
  searchSite,
  type SearchRecord,
} from "@/lib/siteSearch";
import { cn } from "@/lib/utils";

const SEARCH_PANEL_ID = "site-search-panel";
const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

interface SiteSearchProps {
  records: SearchRecord[];
  suppressOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const isTypingTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  (target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable);

const SiteSearch = ({
  records,
  suppressOpen = false,
  onOpenChange,
}: SiteSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  const trimmedQuery = query.trim();
  const hits = trimmedQuery.length >= 2 ? searchSite(records, trimmedQuery) : [];
  const suggestions = getSuggestedSearchRecords(records);
  const visibleRecords = trimmedQuery.length >= 2 ? hits.map((hit) => hit.record) : suggestions;
  const listLabel = trimmedQuery.length >= 2 ? "Search results" : "Suggested pages";

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
    onOpenChangeRef.current?.(false);
  };

  const openSearch = () => {
    setIsOpen(true);
    onOpenChangeRef.current?.(true);
  };

  useEffect(() => {
    if (suppressOpen) {
      setIsOpen(false);
      setQuery("");
      setActiveIndex(0);
    }
  }, [suppressOpen]);

  useEffect(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      const slashShortcut = event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
      const commandK = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      if ((!slashShortcut && !commandK) || (slashShortcut && isTypingTarget(event.target))) {
        return;
      }

      event.preventDefault();
      setIsOpen(true);
      onOpenChangeRef.current?.(true);
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && rootRef.current && !rootRef.current.contains(target)) {
        setIsOpen(false);
        setQuery("");
        setActiveIndex(0);
        onOpenChangeRef.current?.(false);
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      setQuery("");
      setActiveIndex(0);
      onOpenChangeRef.current?.(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const goTo = (record: SearchRecord) => {
    trackSiteSearch(trimmedQuery, visibleRecords.length, record.path);
    closeSearch();
    router.push(record.path);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = visibleRecords[activeIndex] ?? visibleRecords[0];
    if (selected) goTo(selected);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (visibleRecords.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % visibleRecords.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + visibleRecords.length) % visibleRecords.length);
    }
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-800 transition-colors hover:bg-slate-100 hover:text-primary",
          focusClass,
          isOpen && "bg-primary/10 text-primary",
        )}
        aria-label={isOpen ? "Close site search" : "Search the site"}
        aria-expanded={isOpen}
        aria-controls={SEARCH_PANEL_ID}
        onClick={() => (isOpen ? closeSearch() : openSearch())}
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <Search size={22} aria-hidden="true" />}
      </button>

      <div
        id={SEARCH_PANEL_ID}
        role="dialog"
        aria-label="Site search"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-x-3 z-[90] rounded-xl border border-slate-200 bg-white p-3 shadow-xl",
          "top-[calc(var(--pti-header-height)+0.5rem)]",
          "xl:absolute xl:inset-x-auto xl:right-0 xl:top-full xl:mt-2 xl:w-[28rem]",
          isOpen ? "block" : "hidden",
        )}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor={`${listboxId}-input`} className="sr-only">
            Search pages, events, and articles
          </label>
          <div className="relative">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              ref={inputRef}
              id={`${listboxId}-input`}
              type="search"
              value={query}
              autoComplete="off"
              enterKeyHint="search"
              placeholder="Search pages, events, and articles"
              aria-controls={listboxId}
              aria-expanded={isOpen}
              aria-autocomplete="list"
              aria-activedescendant={
                visibleRecords[activeIndex]
                  ? `${listboxId}-option-${activeIndex}`
                  : undefined
              }
              role="combobox"
              className="h-11 min-h-11 pl-9"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />
          </div>
        </form>

        <p className="px-1 pt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {listLabel}
        </p>

        {visibleRecords.length > 0 ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-label={listLabel}
            className="mt-1 max-h-[min(24rem,calc(100dvh-var(--pti-header-height)-7rem))] overflow-y-auto"
          >
            {visibleRecords.map((record, index) => {
              const active = index === activeIndex;
              return (
                <li key={record.id} role="presentation">
                  <Link
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={active}
                    href={record.path}
                    className={cn(
                      "flex min-h-11 flex-col justify-center rounded-lg px-3 py-2.5 transition-colors",
                      focusClass,
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-slate-800 hover:bg-primary/5 hover:text-primary",
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      trackSiteSearch(trimmedQuery, visibleRecords.length, record.path);
                      closeSearch();
                    }}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold">{record.title}</span>
                      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {searchKindLabel(record.kind)}
                      </span>
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-600">
                      {record.description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="px-3 py-3 text-sm text-slate-600">
            No matching pages. Try Events, About, Contact, or a blog topic.
          </p>
        )}
      </div>
    </div>
  );
};

export default SiteSearch;
