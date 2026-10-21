import React, { useState } from 'react';
import { LEAD_INVESTIGATION } from '../data/mockData';

interface HeroInvestigationProps {
  onOpenDossier: () => void;
  onOpenMatrix: () => void;
  onOpenVeo: (imgUrl?: string) => void;
  onSelectCoordinateCue?: (cue: string) => void;
}

export const HeroInvestigation: React.FC<HeroInvestigationProps> = ({
  onOpenDossier,
  onOpenMatrix,
  onOpenVeo,
  onSelectCoordinateCue
}) => {
  const [showTelemetry, setShowTelemetry] = useState(false);

  return (
    <article className="lg:col-span-8 bg-[#1d2027] border border-[#584238]/30 rounded flex flex-col justify-between overflow-hidden relative group shadow-lg">
      {/* Top Editorial Meta Bar */}
      <div className="p-4 sm:p-6 pb-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#584238]/20 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#e86c28]/20 text-[#ffb694] border border-[#e86c28]/30 rounded font-['Plus_Jakarta_Sans',sans-serif] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb694] animate-pulse" />
              DEEP INVESTIGATION // 14 CITATIONS
            </span>
            <span className="inline-flex items-center px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/30 rounded font-['Plus_Jakarta_Sans',sans-serif] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              CONFIRMED & REPORTED HYBRID
            </span>
          </div>

          <div className="font-['JetBrains_Mono',monospace] text-xs text-[#dfc0b3] flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#ffb694]">schedule</span>
            <span>{LEAD_INVESTIGATION.date}</span>
            <span className="text-[#584238]">•</span>
            <span>{LEAD_INVESTIGATION.readTime}</span>
          </div>
        </div>
      </div>

      {/* Headline & Excerpt */}
      <div className="p-4 sm:p-6 pt-4 space-y-3">
        <h1
          onClick={onOpenDossier}
          className="font-['Newsreader',serif] text-2xl sm:text-3xl lg:text-[2.75rem] lg:leading-[1.12] text-[#e0e2ec] font-normal hover:text-[#ffb694] transition-colors cursor-pointer"
        >
          {LEAD_INVESTIGATION.title}
        </h1>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-[#dfc0b3] max-w-3xl leading-relaxed">
          {LEAD_INVESTIGATION.excerpt}
        </p>
      </div>

      {/* Imagery with High-End Forensic Dossier Overlay */}
      <div className="relative mx-4 sm:mx-6 mb-4 border border-[#584238]/30 rounded overflow-hidden aspect-[16/9] bg-[#0b0e15]">
        <img
          className={`w-full h-full object-cover transition-all duration-500 ${
            showTelemetry ? 'brightness-75 contrast-125' : 'brightness-90 contrast-110 group-hover:scale-[1.02]'
          }`}
          src={LEAD_INVESTIGATION.imageUrl}
          alt={LEAD_INVESTIGATION.imageAlt}
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Telemetry Vectors Overlay */}
        {showTelemetry && (
          <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
            {/* Grid crosshairs & angles */}
            <div className="w-full h-full border border-[#7bd0ff]/30 grid grid-cols-4 grid-rows-3 relative">
              <div className="absolute top-2 left-2 font-mono text-[9px] text-[#7bd0ff] bg-black/60 px-1.5 py-0.5 rounded">
                BEARING: 134.2° SSE // FAA ZONE: LEO-SOUTH
              </div>
              <div className="absolute top-2 right-2 font-mono text-[9px] text-[#4edea3] bg-black/60 px-1.5 py-0.5 rounded">
                TRIANGULATION CONFIDENCE: 99.4%
              </div>
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#ffb694]/40 w-16 h-16 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-1 h-1 bg-[#ffb694] rounded-full" />
              </div>
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#dfc0b3] bg-black/60 px-1.5 py-0.5 rounded">
                ALT: 420m AGL // FOV: 78°
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#1d2027] via-transparent to-transparent pointer-events-none" />

        {/* Image Inset Evidence Tag */}
        <div className="absolute bottom-3 left-3 bg-[#0b0e15]/90 backdrop-blur-md border border-[#584238]/40 px-3 py-1.5 rounded flex flex-wrap items-center gap-2 sm:gap-3 z-10">
          <button
            onClick={() => setShowTelemetry(!showTelemetry)}
            className="font-['JetBrains_Mono',monospace] text-[10px] sm:text-[11px] text-[#4edea3] flex items-center gap-1 font-semibold hover:underline cursor-pointer"
            title="Toggle Cartographic Telemetry Grid"
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-[#4edea3] ${showTelemetry ? 'animate-ping' : ''}`} />
            {showTelemetry ? 'TELEMETRY ACTIVE' : 'COORDINATE OVERLAY VERIFIED'}
          </button>
          <span className="text-[#dfc0b3]/40 font-mono text-xs">|</span>
          <span className="font-['JetBrains_Mono',monospace] text-[10px] sm:text-[11px] text-[#dfc0b3]">
            25°46'31"N 80°11'32"W
          </span>
          <button
            onClick={() => onSelectCoordinateCue && onSelectCoordinateCue('TR1-00:42')}
            className="bg-[#1d2027] hover:bg-[#272a31] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#7bd0ff] border border-[#584238]/30 transition-colors"
          >
            CUE: TR1-00:42
          </button>
        </div>

        {/* Quick Animate Floating Button */}
        <button
          onClick={() => onOpenVeo(LEAD_INVESTIGATION.imageUrl)}
          className="absolute top-3 right-3 bg-[#0b0e15]/90 hover:bg-[#1d2027] text-[#7bd0ff] hover:text-[#ffb694] border border-[#584238]/50 px-2.5 py-1 rounded text-[11px] font-['JetBrains_Mono',monospace] font-bold flex items-center gap-1.5 transition-colors z-10 cursor-pointer shadow-md backdrop-blur-md"
          title="Animate this photo with Veo video generations"
        >
          <span className="material-symbols-outlined text-[15px]">movie</span>
          <span>Animate with Veo</span>
        </button>
      </div>

      {/* Footnote & Action Matrix */}
      <div className="p-4 sm:p-6 pt-3 bg-[#191c23]/70 border-t border-[#584238]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[#dfc0b3]">
          <span className="material-symbols-outlined text-[#ffb694] text-[18px]">verified_user</span>
          <span className="truncate">Corroboration: 4 SEC Filings, 3 Rockstar Press Releases, 7 Geo-Analyses</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDossier}
            className="px-4 py-2 bg-[#e86c28] hover:bg-[#f97316] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold rounded flex items-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <span>Read Intelligence Dossier</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
          <button
            onClick={onOpenMatrix}
            className="px-3 py-2 bg-[#10131a] hover:bg-[#272a31] border border-[#584238]/40 text-[#e0e2ec] font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#a68b7f]">data_table</span>
            <span>Evidence Matrix</span>
          </button>
        </div>
      </div>
    </article>
  );
};
