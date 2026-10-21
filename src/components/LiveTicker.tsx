import React from 'react';
import { TICKER_ITEMS } from '../data/mockData';
import { ClaimStatus } from '../types';

interface LiveTickerProps {
  onSelectClaimAudit: (ref: string) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ onSelectClaimAudit }) => {
  const getBadgeStyle = (status: ClaimStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-[#00a572]/30 text-[#4edea3] border-[#4edea3]/40';
      case 'REPORTED':
        return 'bg-[#00a6e0]/30 text-[#7bd0ff] border-[#7bd0ff]/40';
      case 'DISPUTED':
        return 'bg-[#93000a]/30 text-[#ffb4ab] border-[#ffb4ab]/40';
      case 'SPECULATION':
        return 'bg-[#e86c28]/30 text-[#ffb694] border-[#ffb694]/40';
      default:
        return 'bg-[#32353c] text-[#dfc0b3] border-[#584238]/40';
    }
  };

  return (
    <section aria-label="Forensic Claim Ticker" className="border-b border-[#584238]/20 bg-[#191c23] overflow-hidden py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center">
        {/* Ticker Title */}
        <div className="flex items-center gap-2 pr-4 border-r border-[#584238]/30 flex-shrink-0 z-10 bg-[#191c23]">
          <span className="flex h-2 w-2 rounded-full bg-[#e86c28] animate-ping" />
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] sm:text-[11px] text-[#e0e2ec] uppercase tracking-wider font-bold">
            FORENSIC DISPATCH WIRE
          </span>
        </div>

        {/* Marquee ticker wrapper */}
        <div className="overflow-hidden relative w-full ml-4">
          <div className="animate-ticker flex items-center gap-8 whitespace-nowrap text-xs font-['JetBrains_Mono',monospace]">
            {/* Loop item set */}
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <React.Fragment key={`${item.id}-${idx}`}>
                <div
                  onClick={() => onSelectClaimAudit(item.ref.replace(/[\[\]]/g, ''))}
                  className="inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                  title="Click to view corroboration source audit"
                >
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] border font-bold tracking-wider ${getBadgeStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[#e0e2ec] text-[11px]">{item.text}</span>
                  <span className="text-[#584238]/70 font-mono text-[10px] underline hover:text-[#ffb694]">
                    {item.ref}
                  </span>
                </div>
                <span className="text-[#584238]/40 select-none">|</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
