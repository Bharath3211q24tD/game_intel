import React, { useState, useMemo } from 'react';
import { CLAIMS } from '../../data/mockData';
import { Claim, ClaimStatus, TaxonomyCategory } from '../../types';

interface ClaimTrackerViewProps {
  onSelectClaimAudit: (auditRef: string, claim?: Claim) => void;
}

export const ClaimTrackerView: React.FC<ClaimTrackerViewProps> = ({ onSelectClaimAudit }) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [taxonomyFilter, setTaxonomyFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [sortField, setSortField] = useState<'id' | 'confidenceScore' | 'dateLogged'>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const taxonomies: TaxonomyCategory[] = [
    'All',
    'World & Map',
    'Story & Protagonists',
    'Vehicles & Arsenal',
    'Game Mechanics',
    'Technical Engine (RAGE 9)'
  ];

  const filteredClaims = useMemo(() => {
    return CLAIMS.filter((c) => {
      const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
      const matchTax = taxonomyFilter === 'All' || c.taxonomy === taxonomyFilter;
      const matchSearch =
        !search ||
        c.subject.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.primarySource.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchTax && matchSearch;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      }
      return sortAsc
        ? (valA as number) - (valB as number)
        : (valB as number) - (valA as number);
    });
  }, [statusFilter, taxonomyFilter, search, sortField, sortAsc]);

  const handleExportCSV = () => {
    const headers = ['Claim ID', 'Subject', 'Corpus', 'Status', 'Taxonomy', 'Confidence', 'Primary Source'];
    const rows = filteredClaims.map((c) => [
      c.id,
      `"${c.subject.replace(/"/g, '""')}"`,
      c.corpus,
      c.status,
      c.taxonomy,
      `${c.confidenceScore}%`,
      `"${c.primarySource.replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gameintel_claims_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSort = (field: 'id' | 'confidenceScore' | 'dateLogged') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#584238]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[22px]">policy</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] tracking-wider font-bold">
              VERIFICATION AUDIT LEDGER
            </span>
          </div>
          <h1 className="font-['Newsreader',serif] text-2xl sm:text-3xl text-[#e0e2ec] mt-1">
            Claim Tracker & Evidentiary Rubric
          </h1>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#dfc0b3] mt-0.5">
            141 actively tracked claims with empirical source confidence scores, SEC cross-references, and patent audit verification.
          </p>
        </div>

        {/* Export Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] border border-[#584238]/40 rounded text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffb694]">download</span>
            <span>Export CSV Ledger</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1d2027] p-4 rounded border border-[#584238]/30 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-['JetBrains_Mono',monospace] uppercase text-[#a68b7f] mb-1">
              Search Corpus
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search claims, IDs, or sources..."
              className="w-full bg-[#10131a] border border-[#584238]/50 focus:border-[#e86c28] focus:outline-none text-[#e0e2ec] text-xs px-3 py-2 rounded placeholder:text-[#dfc0b3]/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-['JetBrains_Mono',monospace] uppercase text-[#a68b7f] mb-1">
              Status Rating
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#10131a] border border-[#584238]/50 focus:border-[#e86c28] focus:outline-none text-[#e0e2ec] text-xs px-3 py-2 rounded"
            >
              <option value="ALL">All Statuses (141 Claims)</option>
              <option value="CONFIRMED">CONFIRMED (48)</option>
              <option value="REPORTED">REPORTED (34)</option>
              <option value="SPECULATION">SPECULATION (29)</option>
              <option value="DISPUTED">DISPUTED (18)</option>
              <option value="UNKNOWN">UNKNOWN (12)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-['JetBrains_Mono',monospace] uppercase text-[#a68b7f] mb-1">
              Taxonomy Classification
            </label>
            <select
              value={taxonomyFilter}
              onChange={(e) => setTaxonomyFilter(e.target.value)}
              className="w-full bg-[#10131a] border border-[#584238]/50 focus:border-[#e86c28] focus:outline-none text-[#e0e2ec] text-xs px-3 py-2 rounded"
            >
              {taxonomies.map((tax) => (
                <option key={tax} value={tax}>
                  {tax}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-[#1d2027] border border-[#584238]/30 rounded overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm">
            <thead className="bg-[#0b0e15] text-[#dfc0b3] font-['JetBrains_Mono',monospace] text-[11px] border-b border-[#584238]/30">
              <tr>
                <th
                  onClick={() => toggleSort('id')}
                  className="py-3 px-4 font-semibold uppercase cursor-pointer hover:text-white"
                >
                  <span className="flex items-center gap-1">
                    Claim ID {sortField === 'id' && (sortAsc ? '▲' : '▼')}
                  </span>
                </th>
                <th className="py-3 px-4 font-semibold uppercase">Subject & Empirical Assertion</th>
                <th className="py-3 px-4 font-semibold uppercase">Taxonomy</th>
                <th className="py-3 px-4 font-semibold uppercase">Status</th>
                <th
                  onClick={() => toggleSort('confidenceScore')}
                  className="py-3 px-4 font-semibold uppercase cursor-pointer hover:text-white"
                >
                  <span className="flex items-center gap-1">
                    Confidence {sortField === 'confidenceScore' && (sortAsc ? '▲' : '▼')}
                  </span>
                </th>
                <th className="py-3 px-4 font-semibold uppercase">Primary Source</th>
                <th className="py-3 px-4 font-semibold uppercase text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#584238]/10 font-['JetBrains_Mono',monospace] text-xs">
              {filteredClaims.map((claim) => (
                <tr
                  key={claim.id}
                  onClick={() => onSelectClaimAudit(claim.auditRef, claim)}
                  className="hover:bg-[#272a31]/60 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 text-[#ffb694] font-semibold">{claim.id}</td>
                  <td className="py-3 px-4 font-['Plus_Jakarta_Sans',sans-serif] text-[#e0e2ec] font-medium max-w-sm">
                    {claim.subject}
                  </td>
                  <td className="py-3 px-4 text-[#dfc0b3]">{claim.taxonomy}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                        claim.status === 'CONFIRMED'
                          ? 'bg-[#00a572]/20 text-[#4edea3] border-[#00a572]/30'
                          : claim.status === 'REPORTED'
                          ? 'bg-[#00a6e0]/20 text-[#7bd0ff] border-[#00a6e0]/30'
                          : claim.status === 'SPECULATION'
                          ? 'bg-[#e86c28]/20 text-[#ffb694] border-[#e86c28]/30'
                          : 'bg-[#93000a]/20 text-[#ffb4ab] border-[#ffb4ab]/30'
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-[#10131a] rounded h-1.5 overflow-hidden">
                        <div
                          className="bg-[#4edea3] h-full"
                          style={{ width: `${claim.confidenceScore}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-[#dfc0b3]">{claim.confidenceScore}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#dfc0b3] truncate max-w-xs">{claim.primarySource}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectClaimAudit(claim.auditRef, claim);
                      }}
                      className="text-[#ffb694] hover:underline font-mono text-xs flex items-center justify-end gap-1 ml-auto"
                    >
                      <span>[{claim.auditRef}]</span>
                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
