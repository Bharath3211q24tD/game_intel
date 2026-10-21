import React, { useState } from 'react';

interface SearchGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchGroundingModal: React.FC<SearchGroundingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [prompt, setPrompt] = useState(
    'What are the latest verified Take-Two SEC filings or official Rockstar statements regarding the GTA VI release window?'
  );
  const [resultText, setResultText] = useState<string | null>(null);
  const [sources, setSources] = useState<Array<{ uri: string; title: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (customQuery?: string) => {
    const q = customQuery || prompt.trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResultText(null);
    setSources([]);

    try {
      const res = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to execute search grounding');
      }

      setResultText(data.text);
      setSources(data.sources || []);
    } catch (err: any) {
      setError(err.message || 'Error executing search grounding');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQueries = [
    'Take-Two Interactive Q3/Q4 2025 financial earnings conference comments on GTA 6',
    'Rockstar Games trailer 1 record view count and Tom Petty Love Is a Long Road streams',
    'SAG-AFTRA strike videogame actor voice contracts and Rockstar Americas disclosures',
    'Take-Two interactive USPTO patent US11288863B2 water simulation inventors'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-3xl bg-[#181d27] border border-[#584238]/60 rounded-lg shadow-2xl overflow-hidden flex flex-col my-8 max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#11141b] border-b border-[#584238]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7bd0ff] text-[20px]">travel_explore</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#e0e2ec] uppercase tracking-wider">
              GOOGLE SEARCH GROUNDING // gemini-3.8-flash
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#272a31] text-[#dfc0b3] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 font-['Plus_Jakarta_Sans',sans-serif]">
          <p className="text-xs sm:text-sm text-[#dfc0b3]">
            Verify real-time events and industry reporting with live Google Search Grounding. Grounding chunks extract and substantiate citations directly from real-world corporate and trade sources.
          </p>

          {/* Query input */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter query to ground with Google Search..."
                className="flex-1 bg-[#10131a] border border-[#584238]/50 focus:border-[#e86c28] focus:outline-none rounded px-3 py-2 text-xs sm:text-sm text-[#e0e2ec]"
              />
              <button
                onClick={() => handleSearch()}
                disabled={isLoading || !prompt.trim()}
                className="px-4 py-2 bg-[#e86c28] hover:bg-[#f97316] disabled:opacity-50 text-white font-bold text-xs uppercase rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isLoading ? 'Searching...' : 'Search'}</span>
                <span className="material-symbols-outlined text-[16px]">search</span>
              </button>
            </div>

            {/* Quick Queries */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono">
              <span className="text-[#a68b7f]">EXAMPLES:</span>
              {sampleQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(q);
                    handleSearch(q);
                  }}
                  className="px-2 py-0.5 bg-[#10131a] hover:bg-[#272a31] text-[#dfc0b3] hover:text-[#ffb694] rounded border border-[#584238]/30 transition-colors"
                >
                  {q.slice(0, 34)}...
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="p-6 bg-[#10131a] rounded border border-[#584238]/30 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-8 h-8 border-2 border-[#7bd0ff] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-xs text-[#dfc0b3]">
                Querying Google Search index & synthesizing grounding chunks...
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-3 bg-[#93000a]/20 border border-[#ffb4ab]/40 rounded text-xs text-[#ffb4ab]">
              {error}
            </div>
          )}

          {/* Result */}
          {resultText && (
            <div className="space-y-4">
              <div className="p-4 bg-[#10131a] rounded border border-[#584238]/30 space-y-3">
                <div className="flex items-center justify-between border-b border-[#584238]/20 pb-2">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#4edea3] uppercase font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
                    GROUNDED ANALYSIS VERDICT
                  </span>
                  <span className="font-mono text-[10px] text-[#a68b7f]">
                    gemini-3.8-flash (googleSearch)
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#e0e2ec] leading-relaxed whitespace-pre-wrap">
                  {resultText}
                </div>
              </div>

              {/* Verified Web Citations */}
              {sources.length > 0 && (
                <div className="space-y-2">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase text-[#ffb694] tracking-wider font-bold block">
                    GROUNDED WEB SOURCES ({sources.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-[#10131a] hover:bg-[#1f2633] rounded border border-[#584238]/30 flex items-center justify-between text-xs text-[#7bd0ff] hover:text-[#ffb694] transition-colors group"
                      >
                        <span className="truncate max-w-[240px] font-medium">
                          {src.title || src.uri}
                        </span>
                        <span className="material-symbols-outlined text-[14px] opacity-70 group-hover:opacity-100">
                          open_in_new
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#11141b] border-t border-[#584238]/40 flex items-center justify-between text-xs font-['JetBrains_Mono',monospace] text-[#a68b7f] px-6">
          <span>Search Grounding: Live Google Search API</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] rounded text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
