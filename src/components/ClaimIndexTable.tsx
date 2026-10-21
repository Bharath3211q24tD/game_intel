import React, { useState, useMemo } from 'react';
import { CLAIMS } from '../data/mockData';
import { Claim, ClaimStatus, TaxonomyCategory } from '../types';

interface ClaimIndexTableProps {
  onSelectClaimAudit: (auditRef: string, claim?: Claim) => void;
}

export const ClaimIndexTable: React.FC<ClaimIndexTableProps> = ({ onSelectClaimAudit }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const statusCounts = useMemo(() => {
    return {
      all: 141,
      confirmed: 48,
      reported: 34,
      speculation: 29,
      disputed: 18,
      unknown: 12
    };
  }, []);

  const taxonomies: TaxonomyCategory[] = [
    'All',
    'World & Map',
    'Story & Protagonists',
    'Vehicles & Arsenal',
    'Game Mechanics',
    'Technical Engine (RAGE 9)'
  ];

  const filteredClaims = useMemo(() => {
    return CLAIMS.filter((claim) => {
      const matchesStatus =
        selectedStatus === 'ALL' || claim.status === selectedStatus;
      const matchesTaxonomy =
        selectedTaxonomy === 'All' || claim.taxonomy === selectedTaxonomy;
      const matchesSearch =
        !searchQuery ||
        claim.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.primarySource.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesTaxonomy && matchesSearch;
    });
  }, [selectedStatus, selectedTaxonomy, searchQuery]);

  const getStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/30 font-semibold font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" /> CONFIRMED
          </span>
        );
      case 'REPORTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-[#00a6e0]/20 text-[#7bd0ff] border border-[#00a6e0]/30 font-semibold font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff]" /> REPORTED
          </span>
        );
      case 'SPECULATION':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-[#e86c28]/20 text-[#ffb694] border border-[#e86c28]/30 font-semibold font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb694]" /> SPECULATION
          </span>
        );
      case 'DISPUTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/30 font-semibold font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" /> DISPUTED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-[#32353c] text-[#dfc0b3] border border-[#584238]/40 font-semibold font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a68b7f]" /> UNKNOWN
          </span>
        );
    }
  };

  return (
    <section className="bg-[#1d2027] border border-[#584238]/30 rounded p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Header and Filter chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#584238]/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[20px]">fact_check</span>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-semibold text-[#e0e2ec]">
              Claim Verification Index
            </h2>
          </div>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#dfc0b3] mt-0.5">
            Systematic evidentiary rating across 141 tracked assertions. Updated synchronously with every corporate disclosure.
          </p>
        </div>

        {/* Filter Status Chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-['JetBrains_Mono',monospace] text-xs">
          <button
            onClick={() => setSelectedStatus('ALL')}
            className={`px-2.5 py-1 border rounded text-xs transition-colors flex items-center gap-1.5 ${
              selectedStatus === 'ALL'
                ? 'bg-[#363941] border-[#ffb694] text-[#e0e2ec] font-semibold'
                : 'bg-[#272a31] border-[#584238]/40 text-[#dfc0b3] hover:border-[#a68b7f]'
            }`}
          >
            <span>All Claims</span>
            <span className="bg-[#10131a] px-1.5 py-0.2 rounded text-[10px] text-[#a68b7f]">
              {statusCounts.all}
            </span>
          </button>

          <button
            onClick={() => setSelectedStatus('CONFIRMED')}
            className={`px-2.5 py-1 border rounded text-xs transition-colors flex items-center gap-1.5 ${
              selectedStatus === 'CONFIRMED'
                ? 'bg-[#00a572]/30 border-[#4edea3] text-[#4edea3] font-bold'
                : 'bg-[#00a572]/10 border-[#4edea3]/30 text-[#4edea3] hover:bg-[#00a572]/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
            <span>Confirmed</span>
            <span className="font-bold">{statusCounts.confirmed}</span>
          </button>

          <button
            onClick={() => setSelectedStatus('REPORTED')}
            className={`px-2.5 py-1 border rounded text-xs transition-colors flex items-center gap-1.5 ${
              selectedStatus === 'REPORTED'
                ? 'bg-[#00a6e0]/30 border-[#7bd0ff] text-[#7bd0ff] font-bold'
                : 'bg-[#00a6e0]/10 border-[#7bd0ff]/30 text-[#7bd0ff] hover:bg-[#00a6e0]/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#7bd0ff]" />
            <span>Reported</span>
            <span className="font-bold">{statusCounts.reported}</span>
          </button>

          <button
            onClick={() => setSelectedStatus('SPECULATION')}
            className={`px-2.5 py-1 border rounded text-xs transition-colors flex items-center gap-1.5 ${
              selectedStatus === 'SPECULATION'
                ? 'bg-[#e86c28]/30 border-[#ffb694] text-[#ffb694] font-bold'
                : 'bg-[#e86c28]/10 border-[#ffb694]/30 text-[#ffb694] hover:bg-[#e86c28]/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#e86c28]" />
            <span>Speculation</span>
            <span className="font-bold">{statusCounts.speculation}</span>
          </button>

          <button
            onClick={() => setSelectedStatus('DISPUTED')}
            className={`px-2.5 py-1 border rounded text-xs transition-colors flex items-center gap-1.5 ${
              selectedStatus === 'DISPUTED'
                ? 'bg-[#93000a]/30 border-[#ffb4ab] text-[#ffb4ab] font-bold'
                : 'bg-[#93000a]/10 border-[#ffb4ab]/30 text-[#ffb4ab] hover:bg-[#93000a]/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#ffb4ab]" />
            <span>Disputed</span>
            <span className="font-bold">{statusCounts.disputed}</span>
          </button>

          <button
            onClick={() => setSelectedStatus('UNKNOWN')}
            className={`px-2.5 py-1 border rounded text-xs transition-colors flex items-center gap-1.5 ${
              selectedStatus === 'UNKNOWN'
                ? 'bg-[#32353c] border-[#a68b7f] text-[#e0e2ec] font-bold'
                : 'bg-[#32353c]/50 border-[#584238]/30 text-[#dfc0b3] hover:text-[#e0e2ec]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#a68b7f]" />
            <span>Unknown</span>
            <span className="font-bold">{statusCounts.unknown}</span>
          </button>
        </div>
      </div>

      {/* Quick Category Taxonomy and Quick Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-['Plus_Jakarta_Sans',sans-serif] uppercase">
          <span className="text-[#dfc0b3] font-['JetBrains_Mono',monospace] text-[11px] mr-2 shrink-0">
            Taxonomy:
          </span>
          {taxonomies.map((cat) => {
            const isSelected = selectedTaxonomy === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedTaxonomy(cat)}
                className={`px-3 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#ffb694] text-[#571f00] font-bold shadow-sm'
                    : 'bg-[#272a31] hover:bg-[#363941] text-[#dfc0b3] hover:text-[#e0e2ec] border border-[#584238]/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* In-table search input */}
        <div className="relative shrink-0 w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter claims by keyword..."
            className="w-full bg-[#10131a] border border-[#584238]/50 focus:border-[#e86c28] focus:outline-none text-[#e0e2ec] text-xs px-3 py-1.5 rounded placeholder:text-[#dfc0b3]/50 font-['Plus_Jakarta_Sans',sans-serif]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1.5 text-xs text-[#a68b7f] hover:text-[#e0e2ec]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Compact Evidence Table */}
      <div className="overflow-x-auto border border-[#584238]/20 rounded">
        <table className="w-full text-left font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm">
          <thead className="bg-[#0b0e15] text-[#dfc0b3] font-['JetBrains_Mono',monospace] text-[11px] border-b border-[#584238]/30">
            <tr>
              <th className="py-2.5 px-4 font-semibold uppercase">Claim ID</th>
              <th className="py-2.5 px-4 font-semibold uppercase">Subject & Empirical Claim</th>
              <th className="py-2.5 px-4 font-semibold uppercase">Corpus</th>
              <th className="py-2.5 px-4 font-semibold uppercase">Status Rating</th>
              <th className="py-2.5 px-4 font-semibold uppercase">Primary Corroborating Source</th>
              <th className="py-2.5 px-4 font-semibold uppercase text-right">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#584238]/10 font-['JetBrains_Mono',monospace] text-xs">
            {filteredClaims.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-[#dfc0b3]/60 italic font-mono">
                  No matching claims found for this filter criteria.
                </td>
              </tr>
            ) : (
              filteredClaims.map((claim) => (
                <tr
                  key={claim.id}
                  className="hover:bg-[#272a31]/60 transition-colors group cursor-pointer"
                  onClick={() => onSelectClaimAudit(claim.auditRef, claim)}
                >
                  <td className="py-3 px-4 font-mono text-[#a68b7f] group-hover:text-[#ffb694]">
                    {claim.id}
                  </td>
                  <td className="py-3 px-4 font-['Plus_Jakarta_Sans',sans-serif] text-[#e0e2ec] font-medium max-w-md">
                    {claim.subject}
                  </td>
                  <td className="py-3 px-4 text-[#ffb694] font-semibold">{claim.corpus}</td>
                  <td className="py-3 px-4">{getStatusBadge(claim.status)}</td>
                  <td className="py-3 px-4 text-[#dfc0b3] max-w-xs truncate" title={claim.primarySource}>
                    {claim.primarySource}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectClaimAudit(claim.auditRef, claim);
                      }}
                      className="text-[#ffb694] hover:underline font-mono text-xs flex items-center justify-end gap-1 ml-auto"
                    >
                      <span>View [{claim.auditRef}]</span>
                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
