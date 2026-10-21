import React, { useState, useEffect } from 'react';
import { CLAIMS, DISPATCH_DOSSIERS, DATABASE_ENTITIES, RADAR_ITEMS } from '../../data/mockData';
import { Claim, DatabaseEntity, DispatchDossier, RadarItem } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectClaim: (claim: Claim) => void;
  onSelectDossier: (dossier: DispatchDossier) => void;
  onSelectEntity: (entity: DatabaseEntity) => void;
  onSelectRadar: (radar: RadarItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectClaim,
  onSelectDossier,
  onSelectEntity,
  onSelectRadar
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase();

  const matchingClaims = CLAIMS.filter(
    (c) => c.subject.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchingDossiers = DISPATCH_DOSSIERS.filter(
    (d) => d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
  );

  const matchingEntities = DATABASE_ENTITIES.filter(
    (e) => e.name.toLowerCase().includes(q) || e.tags.some((t) => t.toLowerCase().includes(q))
  ).slice(0, 4);

  const matchingRadar = RADAR_ITEMS.filter(
    (r) => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-[#181d27] border border-[#584238]/60 rounded shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[#584238]/40 bg-[#11141b]">
          <span className="material-symbols-outlined text-[#a68b7f] text-[20px] mr-2">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search claims, patents, trailer cues, characters, biomes..."
            autoFocus
            className="w-full bg-transparent py-3 text-sm text-[#e0e2ec] placeholder:text-[#dfc0b3]/50 focus:outline-none font-['Plus_Jakarta_Sans',sans-serif]"
          />
          <button
            onClick={onClose}
            className="text-xs font-['JetBrains_Mono',monospace] bg-[#272a31] text-[#dfc0b3] px-2 py-0.5 rounded border border-[#584238]/40 hover:bg-[#363941]"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
          {/* Quick Shortcuts */}
          {!query && (
            <div className="space-y-2">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase text-[#a68b7f] tracking-wider font-bold">
                SUGGESTED FORENSIC QUERIES
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['Lucia', 'Water Simulation Patent', 'Port Gellhorn', 'RAGE 9', 'Fall 2025 Release'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-2.5 py-1 bg-[#272a31] text-[#dfc0b3] hover:text-[#ffb694] rounded text-xs border border-[#584238]/30 cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Claims Results */}
          {matchingClaims.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase text-[#ffb694] tracking-wider font-bold">
                CLAIMS & SPECIFICATIONS ({matchingClaims.length})
              </span>
              <div className="space-y-1">
                {matchingClaims.map((claim) => (
                  <div
                    key={claim.id}
                    onClick={() => {
                      onSelectClaim(claim);
                      onClose();
                    }}
                    className="p-2.5 bg-[#1f2633] hover:bg-[#272a31] rounded border border-[#584238]/30 flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#a68b7f] group-hover:text-[#ffb694]">
                        {claim.id}
                      </span>
                      <span className="text-xs text-[#e0e2ec] font-medium line-clamp-1">
                        {claim.subject}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#4edea3] shrink-0 ml-2">
                      [{claim.auditRef}]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dossiers Results */}
          {matchingDossiers.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase text-[#7bd0ff] tracking-wider font-bold">
                INVESTIGATIVE DOSSIERS ({matchingDossiers.length})
              </span>
              <div className="space-y-1">
                {matchingDossiers.map((dossier) => (
                  <div
                    key={dossier.id}
                    onClick={() => {
                      onSelectDossier(dossier);
                      onClose();
                    }}
                    className="p-2.5 bg-[#1f2633] hover:bg-[#272a31] rounded border border-[#584238]/30 flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#a68b7f] block">
                        {dossier.category}
                      </span>
                      <span className="text-xs text-[#e0e2ec] font-semibold group-hover:text-[#ffb694]">
                        {dossier.title}
                      </span>
                    </div>
                    <span className="text-xs text-[#ffb694] font-mono shrink-0 ml-2">
                      {dossier.ref}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Entities Results */}
          {matchingEntities.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase text-[#4edea3] tracking-wider font-bold">
                DATABASE ENTITIES ({matchingEntities.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {matchingEntities.map((entity) => (
                  <div
                    key={entity.id}
                    onClick={() => {
                      onSelectEntity(entity);
                      onClose();
                    }}
                    className="p-2.5 bg-[#1f2633] hover:bg-[#272a31] rounded border border-[#584238]/30 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#e0e2ec] font-bold group-hover:text-[#ffb694]">
                        {entity.name}
                      </span>
                      <span className="text-[9px] font-mono text-[#a68b7f] uppercase">
                        {entity.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#dfc0b3] line-clamp-1 mt-1">
                      {entity.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Radar items */}
          {matchingRadar.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase text-[#a68b7f] tracking-wider font-bold">
                RADAR QUEUE
              </span>
              <div className="space-y-1">
                {matchingRadar.map((radar) => (
                  <div
                    key={radar.id}
                    onClick={() => {
                      onSelectRadar(radar);
                      onClose();
                    }}
                    className="p-2 bg-[#1f2633] hover:bg-[#272a31] rounded border border-[#584238]/30 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-xs text-[#e0e2ec] line-clamp-1">{radar.title}</span>
                    <span className="text-[10px] font-mono text-[#ffb694] shrink-0 ml-2">
                      {radar.auditRef}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#11141b] border-t border-[#584238]/30 flex items-center justify-between text-[11px] font-['JetBrains_Mono',monospace] text-[#a68b7f] px-4">
          <span>Search 141 Claims, Patents & Locations</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
