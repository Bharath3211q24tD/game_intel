import React from 'react';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenMethodology: (topic: string) => void;
  onOpenRegistry: (portal: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerminal,
  onOpenMethodology,
  onOpenRegistry
}) => {
  return (
    <footer className="w-full bg-[#0b0e15] border-t border-[#584238]/30 mt-12 sm:mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-12 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Brand & Disclaimers */}
        <div className="max-w-md space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#e86c28] rounded-xs transform rotate-45" />
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#e0e2ec]">
              GAMEINTEL
            </span>
          </div>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#dfc0b3] leading-relaxed">
            © 2025 GAMEINTEL Intelligence Archive. Rigorous evidence-backed verification and cross-referenced forensic documentation. All trademarks belong to Take-Two Interactive and Rockstar Games.
          </p>

          <div className="font-['JetBrains_Mono',monospace] text-[11px] text-[#a68b7f] flex items-center gap-3 pt-1">
            <span>SHA-256 VERIFIED LEDGER</span>
            <span>•</span>
            <span>NODE CLUSTER: AP-EAST</span>
          </div>
        </div>

        {/* Links Column 1: Methodology */}
        <div className="space-y-2">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] uppercase text-[#ffb694] tracking-wider font-bold block mb-3">
            METHODOLOGY
          </span>
          <ul className="space-y-2 font-['Plus_Jakarta_Sans',sans-serif] text-xs">
            <li>
              <button
                onClick={() => onOpenMethodology('standards')}
                className="text-[#dfc0b3] hover:text-[#e0e2ec] transition-colors"
              >
                Standards of Verification
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenMethodology('overview')}
                className="text-[#dfc0b3] hover:text-[#e0e2ec] transition-colors"
              >
                Methodology Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenMethodology('guidelines')}
                className="text-[#dfc0b3] hover:text-[#e0e2ec] transition-colors"
              >
                Source Audit Guidelines
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenMethodology('corrections')}
                className="text-[#dfc0b3] hover:text-[#e0e2ec] transition-colors"
              >
                Correction Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Links Column 2: Registry */}
        <div className="space-y-2">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] uppercase text-[#ffb694] tracking-wider font-bold block mb-3">
            REGISTRY
          </span>
          <ul className="space-y-2 font-['Plus_Jakarta_Sans',sans-serif] text-xs">
            <li>
              <button
                onClick={() => onOpenRegistry('registry')}
                className="text-[#dfc0b3] hover:text-[#e0e2ec] transition-colors"
              >
                Evidence Registry
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenRegistry('research')}
                className="text-[#dfc0b3] hover:text-[#e0e2ec] transition-colors"
              >
                Research Portal
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenRegistry('sec')}
                className="text-[#dfc0b3] hover:text-[#e0e2ec] transition-colors"
              >
                SEC TTWO Docket Feed
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenRegistry('patents')}
                className="text-[#dfc0b3] hover:text-[#e0e2ec] transition-colors"
              >
                USPTO Patent Index
              </button>
            </li>
          </ul>
        </div>

        {/* Administrative & Security */}
        <div className="space-y-2 w-full sm:w-64">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] uppercase text-[#a68b7f] tracking-wider font-bold block mb-3">
            INTELLIGENCE TERMINAL
          </span>
          <div className="bg-[#10131a] p-3 rounded border border-[#584238]/30 space-y-2 font-['JetBrains_Mono',monospace] text-xs">
            <div className="flex items-center justify-between text-[#dfc0b3]">
              <span>TERMINAL ACCESS:</span>
              <span className="text-[#4edea3] font-bold">ENCRYPTED</span>
            </div>
            <button
              onClick={onOpenTerminal}
              className="w-full py-1.5 px-3 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] border border-[#584238]/40 rounded transition-colors text-left flex items-center justify-between cursor-pointer"
            >
              <span>Staff Portal Login</span>
              <span className="material-symbols-outlined text-[14px]">lock</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
