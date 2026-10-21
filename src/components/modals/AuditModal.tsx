import React from 'react';
import { CLAIMS, RADAR_ITEMS } from '../../data/mockData';
import { Claim } from '../../types';

interface AuditModalProps {
  auditRef: string | null;
  claim?: Claim | null;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({
  auditRef,
  claim: initialClaim,
  onClose
}) => {
  if (!auditRef && !initialClaim) return null;

  // Find claim or radar item matching auditRef
  const targetClaim =
    initialClaim ||
    CLAIMS.find((c) => c.auditRef === auditRef) ||
    CLAIMS.find((c) => c.id === auditRef);

  const targetRadar = RADAR_ITEMS.find((r) => r.auditId === auditRef || r.auditRef.includes(auditRef || ''));

  const title = targetClaim?.subject || targetRadar?.title || `Evidence Audit Record [${auditRef}]`;
  const status = targetClaim?.status || targetRadar?.status || 'CONFIRMED';
  const source = targetClaim?.primarySource || targetRadar?.source || 'Take-Two Regulatory / Public Filing';
  const confidence = targetClaim?.confidenceScore || 95;
  const details = targetClaim?.corroboratingDetails || [
    targetRadar?.description || 'Corroborated by independent investigative reporting and public trade registries.',
    targetRadar?.fullBody || 'Full regulatory and patent records indexed in GameIntel forensic vault.'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-[#181d27] border border-[#584238]/60 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#11141b] border-b border-[#584238]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[18px]">verified</span>
            <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#e0e2ec]">
              FORENSIC AUDIT DOSSIER // [{auditRef || targetClaim?.auditRef}]
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#272a31] text-[#dfc0b3] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 font-['Plus_Jakarta_Sans',sans-serif]">
          {/* Status badge & Confidence */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#584238]/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono',monospace] text-xs text-[#a68b7f]">EVIDENTIARY VERDICT:</span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-['JetBrains_Mono',monospace] font-bold border ${
                  status === 'CONFIRMED'
                    ? 'bg-[#00a572]/20 text-[#4edea3] border-[#00a572]/30'
                    : status === 'REPORTED'
                    ? 'bg-[#00a6e0]/20 text-[#7bd0ff] border-[#00a6e0]/30'
                    : status === 'SPECULATION'
                    ? 'bg-[#e86c28]/20 text-[#ffb694] border-[#e86c28]/30'
                    : 'bg-[#93000a]/20 text-[#ffb4ab] border-[#ffb4ab]/30'
                }`}
              >
                {status}
              </span>
            </div>

            <div className="font-['JetBrains_Mono',monospace] text-xs text-[#dfc0b3] flex items-center gap-1.5">
              <span>CONFIDENCE SCORE:</span>
              <span className="text-[#4edea3] font-bold">{confidence}%</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h2 className="font-['Newsreader',serif] text-xl sm:text-2xl text-[#e0e2ec] leading-snug">
              {title}
            </h2>
            <div className="font-['JetBrains_Mono',monospace] text-xs text-[#ffb694]">
              Primary Source: {source}
            </div>
          </div>

          {/* Corroborating Evidence */}
          <div className="space-y-2">
            <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase text-[#a68b7f] tracking-wider font-bold block">
              CORROBORATING REPOSITORIES & TRANSCRIPTS
            </span>
            <div className="bg-[#10131a] p-4 rounded border border-[#584238]/30 space-y-2.5">
              {details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#dfc0b3] leading-relaxed">
                  <span className="text-[#ffb694] font-mono mt-0.5">↳</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Ledger Record */}
          <div className="p-3 bg-[#11141b] rounded border border-[#584238]/30 font-['JetBrains_Mono',monospace] text-[11px] text-[#a68b7f] space-y-1">
            <div className="flex items-center justify-between text-[#dfc0b3]">
              <span>SHA-256 LEDGER PROOF:</span>
              <span className="text-[#4edea3] font-semibold">VALIDATED</span>
            </div>
            <div className="text-[10px] truncate text-[#dfc0b3]/70">
              HASH: 4b29c91f09823ae89d9921bc1188374901faec84920b784912903bb4
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#11141b] border-t border-[#584238]/40 flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
          <span className="text-[#a68b7f]">Audit Desk Clearance: Level 4</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] rounded transition-colors"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
