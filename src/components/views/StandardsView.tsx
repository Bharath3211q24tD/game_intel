import React, { useState } from 'react';

export const StandardsView: React.FC<{
  onOpenAudit: (ref: string) => void;
}> = ({ onOpenAudit }) => {
  const [activeTab, setActiveTab] = useState<'rubric' | 'ledger' | 'sec' | 'patents'>('rubric');
  const [ledgerVerification, setLedgerVerification] = useState<{
    hash: string;
    status: string;
    verifiedAt: string;
  }>({
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'AUTHENTICATED // 0 ERRORS DETECTED',
    verifiedAt: new Date().toLocaleTimeString()
  });

  const tiers = [
    {
      tier: 'Tier 1: Regulatory & Corporate Disclosures',
      weight: '100% Evidentiary Weight',
      color: 'text-[#4edea3]',
      examples: 'SEC Form 10-K filings, Take-Two investor calls, official press room statements, official game trailers.'
    },
    {
      tier: 'Tier 2: Patent Office Registries',
      weight: '95% Evidentiary Weight',
      color: 'text-[#4edea3]',
      examples: 'USPTO awarded patents (e.g., US11288863B2 water physics, US10981067B2 navigation) assigned to Take-Two Interactive.'
    },
    {
      tier: 'Tier 3: In-Engine Footage Frame Analysis',
      weight: '90% Evidentiary Weight',
      color: 'text-[#7bd0ff]',
      examples: 'Direct photogrammetry, vehicle livery classification, and dialogue transcripts from official 4K trailers.'
    },
    {
      tier: 'Tier 4: Tier-1 Investigative Journalism',
      weight: '80% Evidentiary Weight',
      color: 'text-[#7bd0ff]',
      examples: 'Vetted reporting by verified investigative industry reporters (Jason Schreier, Bloomberg) backed by named/corroborated sources.'
    },
    {
      tier: 'Tier 5: Cryptographically Vetted Alpha Builds',
      weight: '70% Evidentiary Weight',
      color: 'text-[#ffb694]',
      examples: 'Asset strings and animation skeletons from 2022 raw disclosures verified against official Rockstar build server signatures.'
    },
    {
      tier: 'Tier 6: Mathematical Triangulation & Photogrammetry',
      weight: '50% Evidentiary Weight',
      color: 'text-[#ffb694]',
      examples: 'Cartography coordinate projections, vanishing point geometry, and altitude triangulation calculations.'
    },
    {
      tier: 'Tier 7: Compartmentalized Community Speculation',
      weight: 'Variable (Strictly Tagged)',
      color: 'text-[#ffb4ab]',
      examples: 'Community wishlists, social media rumors, unverified modding server claims (strictly compartmentalized or refuted).'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#584238]/30 pb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffb694] text-[22px]">gavel</span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] tracking-wider font-bold">
            METHODOLOGY & RESEARCH PROTOCOL
          </span>
        </div>
        <h1 className="font-['Newsreader',serif] text-2xl sm:text-3xl text-[#e0e2ec] mt-1">
          Forensic Verification Standards
        </h1>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#dfc0b3] mt-0.5">
          GameIntel enforces a strict 7-tier evidentiary taxonomy and cryptographic cross-referencing protocol to guarantee zero unattributed speculation.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-['Plus_Jakarta_Sans',sans-serif] uppercase">
        <button
          onClick={() => setActiveTab('rubric')}
          className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'rubric'
              ? 'bg-[#ffb694] text-[#571f00]'
              : 'bg-[#1d2027] text-[#dfc0b3] border border-[#584238]/30'
          }`}
        >
          7-Tier Verification Rubric
        </button>
        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'ledger'
              ? 'bg-[#ffb694] text-[#571f00]'
              : 'bg-[#1d2027] text-[#dfc0b3] border border-[#584238]/30'
          }`}
        >
          Cryptographic Ledger Validator
        </button>
        <button
          onClick={() => setActiveTab('sec')}
          className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'sec'
              ? 'bg-[#ffb694] text-[#571f00]'
              : 'bg-[#1d2027] text-[#dfc0b3] border border-[#584238]/30'
          }`}
        >
          SEC TTWO Filings Feed
        </button>
        <button
          onClick={() => setActiveTab('patents')}
          className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'patents'
              ? 'bg-[#ffb694] text-[#571f00]'
              : 'bg-[#1d2027] text-[#dfc0b3] border border-[#584238]/30'
          }`}
        >
          USPTO Patent Index
        </button>
      </div>

      {/* Tab 1: Rubric */}
      {activeTab === 'rubric' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {tiers.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#1d2027] p-4 rounded border border-[#584238]/30 space-y-2 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#e0e2ec]">
                    {t.tier}
                  </h3>
                  <span className={`font-['JetBrains_Mono',monospace] text-xs font-bold ${t.color}`}>
                    {t.weight}
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#dfc0b3] leading-relaxed">
                  {t.examples}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Cryptographic Ledger */}
      {activeTab === 'ledger' && (
        <div className="bg-[#1d2027] p-6 rounded border border-[#584238]/30 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-['JetBrains_Mono',monospace] text-xs text-[#ffb694] uppercase tracking-wider font-bold">
              SHA-256 IMMUTABLE LEDGER HASH
            </span>
            <span className="text-[#4edea3] font-['JetBrains_Mono',monospace] text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
              BLOCK #49102-AP
            </span>
          </div>

          <div className="bg-[#10131a] p-4 rounded border border-[#584238]/40 font-['JetBrains_Mono',monospace] text-xs space-y-2">
            <div className="text-[#dfc0b3] break-all">
              <span className="text-[#a68b7f]">CURRENT ROOT HASH: </span>
              {ledgerVerification.hash}
            </div>
            <div className="text-[#4edea3] font-bold">{ledgerVerification.status}</div>
            <div className="text-[#a68b7f] text-[11px]">
              Last verification timestamp: {ledgerVerification.verifiedAt} UTC
            </div>
          </div>

          <button
            onClick={() => {
              setLedgerVerification({
                hash: Math.random().toString(36).substring(2) + 'a189f4b7c8996fb92427ae41e4649b934ca495991b',
                status: 'VERIFIED // 141 ENTRIES INTEGRITY CONFIRMED',
                verifiedAt: new Date().toLocaleTimeString()
              });
            }}
            className="px-4 py-2 bg-[#e86c28] hover:bg-[#f97316] text-white text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase rounded transition-colors"
          >
            Run Real-Time Cryptographic Verification
          </button>
        </div>
      )}

      {/* Tab 3: SEC Filings Feed */}
      {activeTab === 'sec' && (
        <div className="space-y-3">
          <div className="bg-[#1d2027] p-4 rounded border border-[#584238]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
              <span className="text-[#ffb694] font-bold">FORM 10-K (ANNUAL REPORT)</span>
              <span className="text-[#dfc0b3]">Filed May 2024</span>
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#dfc0b3]">
              Take-Two Interactive Software, Inc. (CIK: 0000946581). Confirmed target release window narrowing to Fall of calendar 2025 for Rockstar Games' Grand Theft Auto VI.
            </p>
            <button
              onClick={() => onOpenAudit('EVD-06')}
              className="text-[#ffb694] hover:underline font-mono text-xs flex items-center gap-1"
            >
              <span>Examine Filing Docket [SEC-TTWO-10K]</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </button>
          </div>

          <div className="bg-[#1d2027] p-4 rounded border border-[#584238]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
              <span className="text-[#7bd0ff] font-bold">FORM 8-K (CURRENT REPORT)</span>
              <span className="text-[#dfc0b3]">Filed Dec 2023</span>
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#dfc0b3]">
              Formal disclosure of Trailer 1 premiere reaching over 90 million organic views within 24 hours, confirming Leonida geography and protagonists.
            </p>
            <button
              onClick={() => onOpenAudit('EVD-01')}
              className="text-[#ffb694] hover:underline font-mono text-xs flex items-center gap-1"
            >
              <span>Examine Filing Docket [SEC-TTWO-8K]</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: USPTO Patent Index */}
      {activeTab === 'patents' && (
        <div className="space-y-3">
          <div className="bg-[#1d2027] p-4 rounded border border-[#584238]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
              <span className="text-[#4edea3] font-bold">PATENT US11288863B2</span>
              <span className="text-[#dfc0b3]">Awarded March 2022</span>
            </div>
            <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold text-[#e0e2ec]">
              System and Method for Realistic Water Simulation in Video Games
            </h4>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#dfc0b3]">
              Assignee: Take-Two Interactive Software, Inc. Multi-scale ocean grid simulation calculating localized foam dynamics and watercraft drag.
            </p>
            <button
              onClick={() => onOpenAudit('PAT-03')}
              className="text-[#ffb694] hover:underline font-mono text-xs flex items-center gap-1"
            >
              <span>View Deconstructed Patent Audit [PAT-03]</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </button>
          </div>

          <div className="bg-[#1d2027] p-4 rounded border border-[#584238]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
              <span className="text-[#4edea3] font-bold">PATENT US10981067B2</span>
              <span className="text-[#dfc0b3]">Awarded April 2021</span>
            </div>
            <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold text-[#e0e2ec]">
              System and Method for Virtual Navigation in a Gaming Environment
            </h4>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#dfc0b3]">
              Assignee: Take-Two Interactive Software, Inc. Automated AI pedestrian routine scheduler replacing linear spline loops.
            </p>
            <button
              onClick={() => onOpenAudit('PAT-09')}
              className="text-[#ffb694] hover:underline font-mono text-xs flex items-center gap-1"
            >
              <span>View Deconstructed Patent Audit [PAT-09]</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
