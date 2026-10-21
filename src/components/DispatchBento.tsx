import React from 'react';
import { DISPATCH_DOSSIERS } from '../data/mockData';
import { DispatchDossier } from '../types';

interface DispatchBentoProps {
  onSelectDossier: (dossier: DispatchDossier) => void;
  onViewAllDispatches: () => void;
}

export const DispatchBento: React.FC<DispatchBentoProps> = ({
  onSelectDossier,
  onViewAllDispatches
}) => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#584238]/30 pb-3">
        <div>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] tracking-wider font-bold">
            DISPATCH DOSSIERS
          </span>
          <h2 className="font-['Newsreader',serif] text-xl sm:text-2xl text-[#e0e2ec]">
            Forensic Case Studies & Deep Dives
          </h2>
        </div>
        <button
          onClick={onViewAllDispatches}
          className="font-['JetBrains_Mono',monospace] text-xs text-[#ffb694] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View all 38 field dispatches</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DISPATCH_DOSSIERS.map((dossier) => (
          <article
            key={dossier.id}
            onClick={() => onSelectDossier(dossier)}
            className="bg-[#1d2027] border border-[#584238]/30 rounded flex flex-col justify-between overflow-hidden group hover:border-[#a68b7f] transition-all cursor-pointer shadow-sm"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#32353c]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={dossier.imageUrl}
                alt={dossier.imageAlt}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d2027] via-transparent to-transparent" />

              <div className="absolute top-3 left-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] border font-['JetBrains_Mono',monospace] font-bold uppercase tracking-wider backdrop-blur-md ${
                    dossier.status === 'CONFIRMED'
                      ? 'bg-[#00a572]/30 text-[#4edea3] border-[#4edea3]/40'
                      : 'bg-[#e86c28]/30 text-[#ffb694] border-[#ffb694]/40'
                  }`}
                >
                  {dossier.status}
                </span>
              </div>

              <div className="absolute bottom-2 right-3 font-['JetBrains_Mono',monospace] text-[10px] text-[#dfc0b3]/80 bg-[#0b0e15]/80 px-2 py-0.5 rounded border border-[#584238]/30">
                {dossier.ref}
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#a68b7f] uppercase tracking-wider">
                  {dossier.category}
                </span>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-semibold text-[#e0e2ec] group-hover:text-[#ffb694] transition-colors mt-1 leading-snug">
                  {dossier.title}
                </h3>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#dfc0b3] mt-2 leading-relaxed line-clamp-3">
                  {dossier.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#584238]/20 flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
                <span className="text-[#dfc0b3]">{dossier.author}</span>
                <span className="text-[#ffb694] group-hover:underline flex items-center gap-1 font-semibold">
                  <span>Dossier</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
