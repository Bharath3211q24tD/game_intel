import React from 'react';
import { RADAR_ITEMS } from '../data/mockData';
import { RadarItem } from '../types';

interface VerificationRadarProps {
  onSelectRadarItem: (item: RadarItem) => void;
  onSelectAudit: (auditId: string) => void;
}

export const VerificationRadar: React.FC<VerificationRadarProps> = ({
  onSelectRadarItem,
  onSelectAudit
}) => {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-4">
      {/* Header Strip */}
      <div className="flex items-center justify-between border-b border-[#584238]/30 pb-2">
        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] tracking-wider font-bold flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">radar</span>
          VERIFICATION RADAR
        </span>
        <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[#dfc0b3]">
          LIVE QUEUE ({RADAR_ITEMS.length})
        </span>
      </div>

      {/* Radar Cards */}
      {RADAR_ITEMS.map((item) => (
        <article
          key={item.id}
          className="bg-[#1d2027] p-4 border border-[#584238]/30 rounded hover:border-[#a68b7f] transition-all flex flex-col justify-between gap-3 group shadow-sm"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#dfc0b3] uppercase tracking-wider">
                {item.category}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] border font-['JetBrains_Mono',monospace] font-bold uppercase tracking-wider ${
                  item.status === 'CONFIRMED'
                    ? 'bg-[#00a572]/20 text-[#4edea3] border-[#4edea3]/30'
                    : 'bg-[#00a6e0]/20 text-[#7bd0ff] border-[#7bd0ff]/30'
                }`}
              >
                {item.status}
              </span>
            </div>

            <h2
              onClick={() => onSelectRadarItem(item)}
              className="font-['Newsreader',serif] text-base sm:text-lg text-[#e0e2ec] group-hover:text-[#ffb694] transition-colors cursor-pointer leading-snug"
            >
              {item.title}
            </h2>

            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#dfc0b3] line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="pt-2 border-t border-[#584238]/20 flex items-center justify-between text-xs font-['JetBrains_Mono',monospace] text-[#dfc0b3]">
            <span className="text-[#a68b7f] truncate mr-2">{item.source}</span>
            <button
              onClick={() => onSelectAudit(item.auditId)}
              className="text-[#ffb694] hover:underline cursor-pointer flex items-center gap-0.5 shrink-0"
            >
              <span>{item.auditRef}</span>
              <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </button>
          </div>
        </article>
      ))}
    </aside>
  );
};
