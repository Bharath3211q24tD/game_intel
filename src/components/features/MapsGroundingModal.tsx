import React, { useState } from 'react';

interface MapsGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapsGroundingModal: React.FC<MapsGroundingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [prompt, setPrompt] = useState(
    'Find real-world landmarks in Miami Beach and Ocean Drive that directly correspond to the art deco hotels and coastal strip seen in GTA VI Trailer 1.'
  );
  const [resultText, setResultText] = useState<string | null>(null);
  const [places, setPlaces] = useState<Array<{ uri: string; title: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (customQuery?: string) => {
    const q = customQuery || prompt.trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResultText(null);
    setPlaces([]);

    // Check for user geolocation if available
    let latLng = { latitude: 25.7617, longitude: -80.1918 }; // Default Miami coordinates
    try {
      if (navigator.geolocation) {
        await new Promise<void>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              latLng = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
              };
              resolve();
            },
            () => resolve(),
            { timeout: 3000 }
          );
        });
      }
    } catch {
      // Use default
    }

    try {
      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q, latLng })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to execute maps grounding');
      }

      setResultText(data.text);
      setPlaces(data.places || []);
    } catch (err: any) {
      setError(err.message || 'Error executing maps grounding');
    } finally {
      setIsLoading(false);
    }
  };

  const samplePlaces = [
    'Ocean Drive Miami Beach Art Deco Historic District',
    'Miami Metromover transit loop stations',
    'Florida Keys Overseas Highway Seven Mile Bridge',
    'Port of Miami cargo terminal container docks',
    'Everglades National Park airboat tours'
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
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">pin_drop</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#e0e2ec] uppercase tracking-wider">
              GOOGLE MAPS GROUNDING // gemini-3.8-flash
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
            Cross-reference real-world Floridian geography, coastal infrastructure, and architectural landmarks corresponding to the State of Leonida using live Google Maps Grounding.
          </p>

          {/* Query input */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Query real-world geographic places and locations..."
                className="flex-1 bg-[#10131a] border border-[#584238]/50 focus:border-[#e86c28] focus:outline-none rounded px-3 py-2 text-xs sm:text-sm text-[#e0e2ec]"
              />
              <button
                onClick={() => handleSearch()}
                disabled={isLoading || !prompt.trim()}
                className="px-4 py-2 bg-[#e86c28] hover:bg-[#f97316] disabled:opacity-50 text-white font-bold text-xs uppercase rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isLoading ? 'Locating...' : 'Locate'}</span>
                <span className="material-symbols-outlined text-[16px]">location_searching</span>
              </button>
            </div>

            {/* Quick Queries */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono">
              <span className="text-[#a68b7f]">PRESETS:</span>
              {samplePlaces.map((place, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(`Find details and exact coordinates for: ${place}`);
                    handleSearch(`Find details and exact coordinates for: ${place}`);
                  }}
                  className="px-2 py-0.5 bg-[#10131a] hover:bg-[#272a31] text-[#dfc0b3] hover:text-[#4edea3] rounded border border-[#584238]/30 transition-colors"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="p-6 bg-[#10131a] rounded border border-[#584238]/30 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-8 h-8 border-2 border-[#4edea3] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-xs text-[#dfc0b3]">
                Querying Google Maps API spatial indices & place metadata...
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
                    GOOGLE MAPS SPATIAL ANALYSIS
                  </span>
                  <span className="font-mono text-[10px] text-[#a68b7f]">
                    gemini-3.8-flash (googleMaps)
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#e0e2ec] leading-relaxed whitespace-pre-wrap">
                  {resultText}
                </div>
              </div>

              {/* Grounded Google Maps Links */}
              {places.length > 0 && (
                <div className="space-y-2">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase text-[#4edea3] tracking-wider font-bold block">
                    GROUNDED GOOGLE MAPS LOCATIONS ({places.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {places.map((place, idx) => (
                      <a
                        key={idx}
                        href={place.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-[#10131a] hover:bg-[#1f2633] rounded border border-[#584238]/30 flex items-center justify-between text-xs text-[#4edea3] hover:text-white transition-colors group"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                            location_on
                          </span>
                          <span className="truncate max-w-[220px] font-medium">
                            {place.title || place.uri}
                          </span>
                        </div>
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
          <span>Maps Grounding: Live Google Maps Platform API</span>
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
