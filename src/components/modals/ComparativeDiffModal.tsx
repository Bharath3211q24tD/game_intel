import React, { useState } from 'react';
import { COMPARATIVE_METRICS } from '../../data/mockData';

interface ComparativeDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComparativeDiffModal: React.FC<ComparativeDiffModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  if (!isOpen) return null;

  const categories = ['ALL', 'World Geometry', 'Physics & Simulation', 'AI & World Simulation', 'Rendering Pipeline', 'Hardware Target'];

  const filteredMetrics = COMPARATIVE_METRICS.filter(
    (m) => selectedCategory === 'ALL' || m.category === selectedCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-5xl bg-[#181d27] border border-[#584238]/60 rounded-lg shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#11141b] border-b border-[#584238]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[20px]">compare_arrows</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#e0e2ec] uppercase tracking-wider">
              DUAL-CORPUS COMPARATIVE DIFF // GTA VI vs GTA V BASELINE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#272a31] text-[#dfc0b3] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Overview Banner */}
          <div className="bg-[#10131a] p-4 rounded border border-[#584238]/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#ffb694] uppercase tracking-wider font-bold">
                EMPIRICAL SPECIFICATION DELTA
              </span>
              <h2 className="font-['Newsreader',serif] text-xl text-[#e0e2ec]">
                Contrasting Leonida's Density Against Los Santos 10-Year Baseline
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0 font-['JetBrains_Mono',monospace] text-xs">
              <span className="px-2.5 py-1 bg-[#272a31] text-[#7bd0ff] rounded border border-[#00a6e0]/30 font-semibold">
                GTA V: 2013-2024
              </span>
              <span className="text-[#a68b7f]">VS</span>
              <span className="px-2.5 py-1 bg-[#e86c28]/20 text-[#ffb694] rounded border border-[#e86c28]/40 font-bold">
                GTA VI: 2025 NEXT-GEN
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-['Plus_Jakarta_Sans',sans-serif] uppercase">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#ffb694] text-[#571f00]'
                    : 'bg-[#1f2633] text-[#dfc0b3] hover:text-[#e0e2ec] border border-[#584238]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Diff Table */}
          <div className="space-y-3">
            {filteredMetrics.map((item) => (
              <div
                key={item.id}
                className="bg-[#1f2633] p-4 rounded border border-[#584238]/30 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#584238]/20 pb-2">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#e0e2ec]">
                    {item.feature}
                  </span>
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#a68b7f] uppercase bg-[#10131a] px-2 py-0.5 rounded border border-[#584238]/30">
                    {item.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-['Plus_Jakarta_Sans',sans-serif]">
                  {/* GTA V Column */}
                  <div className="p-3 bg-[#10131a] rounded border border-[#584238]/20 space-y-1">
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#7bd0ff] font-bold block">
                      GTA V (LOS SANTOS BASELINE)
                    </span>
                    <p className="text-[#dfc0b3] leading-relaxed">{item.gtaV}</p>
                  </div>

                  {/* GTA VI Column */}
                  <div className="p-3 bg-[#10131a] rounded border border-[#e86c28]/30 space-y-1">
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#ffb694] font-bold block">
                      GTA VI (LEONIDA SPECIFICATION)
                    </span>
                    <p className="text-[#e0e2ec] font-medium leading-relaxed">{item.gtaVI}</p>
                  </div>
                </div>

                {/* Delta Note and Source */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 font-['JetBrains_Mono',monospace] text-[11px]">
                  <div className="text-[#4edea3] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    <span>DELTA: {item.deltaNote}</span>
                  </div>
                  <div className="text-[#a68b7f] text-[10px]">
                    Verified Source: {item.verifiedSource}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#11141b] border-t border-[#584238]/40 flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
          <span className="text-[#a68b7f]">Archive Integrity: SEC TTWO Audited</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] rounded font-semibold transition-colors"
          >
            Close Comparative Diff
          </button>
        </div>
      </div>
    </div>
  );
};
