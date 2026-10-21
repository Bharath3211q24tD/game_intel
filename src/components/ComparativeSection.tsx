import React from 'react';

interface ComparativeSectionProps {
  onExploreGtaVArchive: () => void;
  onLaunchDiff: () => void;
}

export const ComparativeSection: React.FC<ComparativeSectionProps> = ({
  onExploreGtaVArchive,
  onLaunchDiff
}) => {
  return (
    <section className="bg-[#191c23] border border-[#584238]/30 rounded p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden shadow-sm">
      <div className="space-y-3 max-w-2xl z-10">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#10131a] border border-[#584238]/40 text-[#dfc0b3] font-['JetBrains_Mono',monospace] text-xs">
          <span className="w-2 h-2 rounded-full bg-[#a68b7f]" />
          <span>HISTORICAL BENCHMARK // 2013-2024 EVIDENCE CORPUS</span>
        </div>

        <h2 className="font-['Newsreader',serif] text-2xl sm:text-3xl text-[#e0e2ec] font-normal leading-tight">
          How Los Santos Sets the Evidentiary Baseline for Leonida's Density
        </h2>

        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#dfc0b3] leading-relaxed">
          GameIntel maintains an unbroken repository of Grand Theft Auto V's 10-year live economy, memory bounds, and physics engine iterations. Use our dual-corpus comparator to contrast verified GTA VI specifications against GTA V's empirical metrics.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full lg:w-auto shrink-0">
        <button
          onClick={onExploreGtaVArchive}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#10131a] hover:bg-[#272a31] border border-[#584238]/50 text-[#e0e2ec] font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-wider font-bold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">history</span>
          <span>Explore GTA V Reference Archive</span>
        </button>

        <button
          onClick={onLaunchDiff}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#e86c28] hover:bg-[#f97316] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-wider font-bold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
          <span>Launch Comparative Diff</span>
        </button>
      </div>
    </section>
  );
};
