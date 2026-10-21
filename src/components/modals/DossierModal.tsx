import React from 'react';
import { DispatchDossier } from '../../types';

interface DossierModalProps {
  dossier: DispatchDossier | null;
  onClose: () => void;
  onOpenAudit: (ref: string) => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  dossier,
  onClose,
  onOpenAudit
}) => {
  if (!dossier) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-4xl bg-[#181d27] border border-[#584238]/60 rounded-lg shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 bg-[#11141b] border-b border-[#584238]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-['JetBrains_Mono',monospace] text-xs text-[#ffb694] uppercase font-bold tracking-wider">
              {dossier.category}
            </span>
            <span className="text-[#584238]">•</span>
            <span className="font-['JetBrains_Mono',monospace] text-xs text-[#a68b7f]">
              {dossier.ref}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#272a31] text-[#dfc0b3] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Headline & Meta */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#e86c28]/20 text-[#ffb694] border border-[#e86c28]/30 font-['JetBrains_Mono',monospace] font-bold uppercase">
                {dossier.status}
              </span>
              <span className="text-xs font-['JetBrains_Mono',monospace] text-[#a68b7f]">
                {dossier.date} · {dossier.readTime}
              </span>
            </div>

            <h1 className="font-['Newsreader',serif] text-2xl sm:text-3xl lg:text-4xl text-[#e0e2ec] font-normal leading-tight">
              {dossier.title}
            </h1>

            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono',monospace] text-[#a68b7f] border-b border-[#584238]/20 pb-3">
              <span>{dossier.author}</span>
              <span className="text-[#ffb694]">{dossier.citationsCount} Documented Citations</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded overflow-hidden aspect-[16/9] border border-[#584238]/30 bg-[#0b0e15]">
            <img
              src={dossier.imageUrl}
              alt={dossier.imageAlt}
              className="w-full h-full object-cover brightness-90 contrast-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 bg-[#0b0e15]/90 border border-[#584238]/40 px-2 py-1 rounded text-[10px] font-['JetBrains_Mono',monospace] text-[#4edea3]">
              FORENSIC RETRIEVAL // REF: {dossier.ref}
            </div>
          </div>

          {/* Lead Paragraph */}
          <div className="font-['Newsreader',serif] text-lg sm:text-xl text-[#e0e2ec] leading-relaxed italic border-l-2 border-[#ffb694] pl-4 py-1">
            "{dossier.excerpt}"
          </div>

          {/* Detailed Sections */}
          {dossier.sections && (
            <div className="space-y-6 pt-2 font-['Plus_Jakarta_Sans',sans-serif]">
              {dossier.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#e0e2ec]">
                    {sec.heading}
                  </h3>
                  <p className="text-sm text-[#dfc0b3] leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Corroboration Citations Box */}
          <div className="p-4 bg-[#11141b] rounded border border-[#584238]/30 space-y-3 font-['JetBrains_Mono',monospace] text-xs">
            <div className="flex items-center justify-between text-[#ffb694] font-bold">
              <span>EVIDENTIARY CITATIONS</span>
              <span>100% REPRODUCIBLE</span>
            </div>
            <ul className="space-y-1.5 text-[#dfc0b3]">
              <li className="flex items-center justify-between">
                <span>1. Take-Two Interactive Form 10-K (SEC Edgar)</span>
                <button
                  onClick={() => onOpenAudit('EVD-06')}
                  className="text-[#ffb694] hover:underline"
                >
                  Inspect [REF-06]
                </button>
              </li>
              <li className="flex items-center justify-between">
                <span>2. USPTO Patent US11288863B2 Fluid Simulation</span>
                <button
                  onClick={() => onOpenAudit('PAT-03')}
                  className="text-[#ffb694] hover:underline"
                >
                  Inspect [PAT-03]
                </button>
              </li>
              <li className="flex items-center justify-between">
                <span>3. Trailer 1 Master 4K Frame Alignment Sequence</span>
                <button
                  onClick={() => onOpenAudit('EVD-01')}
                  className="text-[#ffb694] hover:underline"
                >
                  Inspect [EVD-01]
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#11141b] border-t border-[#584238]/40 flex items-center justify-between shrink-0">
          <div className="font-['JetBrains_Mono',monospace] text-[11px] text-[#a68b7f]">
            GAMEINTEL SEC-RESTRICTED ARCHIVE
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold rounded transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
