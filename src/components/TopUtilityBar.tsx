import React from 'react';
import { CorpusType } from '../types';

interface TopUtilityBarProps {
  activeCorpus: CorpusType;
  onCorpusChange: (corpus: CorpusType) => void;
  onOpenTerminal: () => void;
  onOpenAuditDesk: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  activeCorpus,
  onCorpusChange,
  onOpenAuditDesk
}) => {
  return (
    <aside className="w-full bg-[#10131a] border-b border-[#584238]/30 text-[#dfc0b3] font-['JetBrains_Mono',monospace] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-10 text-xs">
        {/* Left: Investigation Mode Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-[#dfc0b3]/80 uppercase tracking-wider text-[10px] hidden sm:inline-block">
            Active Corpus:
          </span>
          <div className="inline-flex items-center bg-[#0b0e15] border border-[#584238]/40 rounded p-0.5">
            <button
              onClick={() => onCorpusChange('GTA VI')}
              className={`px-2 py-0.5 rounded font-semibold flex items-center gap-1.5 transition-colors text-[11px] ${
                activeCorpus === 'GTA VI'
                  ? 'bg-[#e86c28] text-white shadow-sm'
                  : 'text-[#dfc0b3] hover:text-[#e0e2ec]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeCorpus === 'GTA VI' ? 'bg-[#4edea3] animate-pulse' : 'bg-[#a68b7f]'}`} />
              GTA VI [PRIMARY]
            </button>
            <button
              onClick={() => onCorpusChange('GTA V')}
              className={`px-2 py-0.5 rounded transition-colors text-[11px] flex items-center gap-1 ${
                activeCorpus === 'GTA V'
                  ? 'bg-[#e86c28] text-white shadow-sm'
                  : 'text-[#dfc0b3] hover:text-[#e0e2ec]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeCorpus === 'GTA V' ? 'bg-[#7bd0ff]' : 'bg-transparent'}`} />
              GTA V [REF ARCHIVE]
            </button>
          </div>
        </div>

        {/* Center: Operational Status Index */}
        <div className="hidden lg:flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
            <span>
              INDEXED CLAIMS: <strong className="text-[#e0e2ec]">141</strong>
            </span>
          </span>
          <span className="text-[#584238]/50">•</span>
          <span>
            PEER REVIEW: <span className="text-[#7bd0ff] font-medium">ACTIVE</span>
          </span>
          <span className="text-[#584238]/50">•</span>
          <span>
            INTELLIGENCE CYCLE: <span className="text-[#e0e2ec] font-mono">Q2-2025</span>
          </span>
        </div>

        {/* Right: Audit Mode & Shortcut */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-[#dfc0b3]/70 font-mono text-[11px]">
            REF: SEC-TTWO-10K
          </span>
          <button
            onClick={onOpenAuditDesk}
            className="text-[#dfc0b3] hover:text-[#ffb694] transition-colors flex items-center gap-1 text-[11px] uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>Forensic Audit Desk</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
