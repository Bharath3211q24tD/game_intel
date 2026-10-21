import React from 'react';

interface MethodologySectionProps {
  onOpenRubric: () => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ onOpenRubric }) => {
  return (
    <section
      id="standards"
      className="bg-[#0b0e15] border-2 border-[#e86c28]/40 rounded p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="p-3 bg-[#e86c28]/20 text-[#ffb694] rounded border border-[#e86c28]/30 flex-shrink-0">
          <span className="material-symbols-outlined text-[32px]">policy</span>
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] uppercase tracking-wider text-[#ffb694] font-bold">
              INTELLIGENCE CHARTER
            </span>
            <span className="text-[#584238]">•</span>
            <span className="font-['JetBrains_Mono',monospace] text-xs text-[#dfc0b3]">
              CODE OF VERIFICATION ET-2024
            </span>
          </div>

          <h3 className="font-['Newsreader',serif] text-xl sm:text-2xl text-[#e0e2ec] font-normal leading-snug">
            Zero Unattributed Rumors. Total Cryptographic & Documented Corroboration.
          </h3>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#dfc0b3] max-w-4xl leading-relaxed">
            Every single claim, location, mechanic, and technical detail logged on GameIntel is corroborated by a minimum of two independent sources, SEC regulatory disclosures, verified Take-Two patent registries, or cryptographically authenticated media archives. Speculative models are strictly compartmentalized and mathematically bound.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenRubric}
              className="inline-flex items-center gap-1.5 text-[#ffb694] hover:text-white font-['JetBrains_Mono',monospace] text-xs font-semibold uppercase tracking-wider group transition-colors cursor-pointer"
            >
              <span>Read our 7-tier verification rubric & methodology protocol</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
