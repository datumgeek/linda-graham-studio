import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  portfolios,
  getPortfolioThumbUrl,
  type PortfolioListName,
  portfolioListLabels,
} from '../data/portfolio-data';

interface SearchResult {
  listName: PortfolioListName;
  portfolioKey: string;
  portfolioName: string;
  thumbUrl: string;
  matchContext: string; // short snippet showing where match was found
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];
  for (const listName of Object.keys(portfolios) as PortfolioListName[]) {
    for (const p of portfolios[listName]) {
      const searchable = [
        p.portfolioName,
        p.description.title,
        p.description.venue ?? '',
        p.description.location ?? '',
        p.description.medium ?? '',
        p.description.artistStatement ?? '',
        p.description.curatorNote?.text ?? '',
        p.description.collaborator ?? '',
        ...p.description.paragraphs,
        ...p.images.map((i) => i.imageCaption ?? i.videoCaption ?? ''),
      ].join(' ');

      results.push({
        listName,
        portfolioKey: p.portfolio,
        portfolioName: p.portfolioName,
        thumbUrl: getPortfolioThumbUrl(listName, p.portfolio, p.portfolioImage),
        matchContext: searchable,
      });
    }
  }
  return results;
}

function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  // Return a window around the match
  const start = Math.max(0, idx - 30);
  const end = Math.min(text.length, idx + query.length + 30);
  let snippet = '';
  if (start > 0) snippet += '...';
  snippet += text.slice(start, end);
  if (end < text.length) snippet += '...';
  return snippet;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return index.filter((r) => r.matchContext.toLowerCase().includes(q));
  }, [query, index]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIdx(0);
  }, [results.length]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIdx(0);
      // small delay to allow modal animation
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const goToResult = useCallback(
    (r: SearchResult) => {
      navigate(`/portfolio/${r.listName}/${r.portfolioKey}`);
      onClose();
    },
    [navigate, onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIdx]) {
        e.preventDefault();
        goToResult(results[selectedIdx]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [results, selectedIdx, goToResult, onClose],
  );

  // Global keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    if (isOpen) return; // don't re-open if already open
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // The parent component handles opening; we just need to
        // signal it. We'll do this via a custom event.
        window.dispatchEvent(new CustomEvent('open-search'));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Modal */}
      <div
        className="relative bg-base-100 rounded-xl shadow-2xl w-[90vw] max-w-lg overflow-hidden
                    animate-[search-in_0.2s_ease-out]"
        role="dialog"
        aria-label="Search portfolios"
      >
        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-base-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-50 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search portfolios, exhibitions, mediums..."
            className="input input-ghost w-full focus:outline-none bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="kbd kbd-xs opacity-40 hidden sm:inline">Esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center opacity-50 text-sm">
              No results for "{query}"
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.listName}-${r.portfolioKey}`}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                         hover:bg-base-200 ${i === selectedIdx ? 'bg-base-200' : ''}`}
              onClick={() => goToResult(r)}
              onMouseEnter={() => setSelectedIdx(i)}
            >
              <img
                src={r.thumbUrl}
                alt=""
                className="w-10 h-10 rounded object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm truncate">
                  {r.portfolioName}
                </div>
                <div className="text-xs opacity-50 truncate">
                  {portfolioListLabels[r.listName]}
                  {r.matchContext && query.trim() && (
                    <> &middot; {highlightMatch(r.matchContext, query.trim())}</>
                  )}
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-30 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        {!query.trim() && (
          <div className="px-4 py-3 border-t border-base-300 text-xs opacity-40 flex items-center gap-4">
            <span>
              <kbd className="kbd kbd-xs">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="kbd kbd-xs">Enter</kbd> Open
            </span>
            <span>
              <kbd className="kbd kbd-xs">Esc</kbd> Close
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
