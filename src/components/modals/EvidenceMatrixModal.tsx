import React from 'react';

interface EvidenceMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAudit: (ref: string) => void;
}

export const EvidenceMatrixModal: React.FC<EvidenceMatrixModalProps> = ({
  isOpen,
  onClose,
  onSelectAudit
}) => {
  if (!isOpen) return null;

  const corroborations = [
    {
      type: 'SEC REGULATORY FILINGS (4)',
      items: [
        { id: 'SEC-01', source: 'Take-Two Form 10-K (May 2024)', citation: 'Narrowing release window to Fall calendar 2025; projects record bookings.', confidence: '100%', audit: 'EVD-06' },
        { id: 'SEC-02', source: 'Take-Two Form 8-K (Dec 2023)', citation: 'Trailer 1 launch disclosure and confirmation of Leonida / Vice City.', confidence: '100%', audit: 'EVD-01' },
        { id: 'SEC-03', source: 'Take-Two Form 10-Q (Nov 2024)', citation: 'Reaffirmation of commercial timeline for fiscal 2026 pipelines.', confidence: '100%', audit: 'REF-02' },
        { id: 'SEC-04', source: 'Take-Two Proxy Statement (Schedule 14A)', citation: 'Executive performance equity vesting benchmarks tied to flagship releases.', confidence: '98%', audit: 'TTWO-SEC' },
      ]
    },
    {
      type: 'ROCKSTAR GAMES PRESS RELEASES (3)',
      items: [
        { id: 'RS-01', source: 'Official Press Wire (Dec 4, 2023)', citation: 'Formal confirmation of Lucia and Vice City setting for PlayStation 5 & Xbox Series X|S.', confidence: '100%', audit: 'EVD-01' },
        { id: 'RS-02', source: 'Rockstar Newswire Statement (Sept 2022)', citation: 'Official acknowledgement of network intrusion; confirming continued active development.', confidence: '100%', audit: 'DEV-08' },
        { id: 'RS-03', source: 'Rockstar Newswire 25th Anniversary Notice', citation: 'Announcement of December 2023 trailer premiere.', confidence: '100%', audit: 'REF-01' },
      ]
    },
    {
      type: 'GEOGRAPHIC & PHOTOGRAMMETRIC ANALYSES (7)',
      items: [
        { id: 'GEO-01', source: 'Highway 1 Bridge Triangulation', citation: 'Aerial frame 00:42 vectors pointing to Port Gellhorn maritime cranes.', confidence: '94%', audit: 'EVD-12' },
        { id: 'GEO-02', source: 'Biscayne Bay Metromover Alignment', citation: 'Frame 00:23 transit rail matching Miami Metromover Downtown Loop.', confidence: '96%', audit: 'REF: INFRA-04' },
        { id: 'GEO-03', source: 'Kelly County Wetlands Horizon Arc', citation: 'Frame 00:36 vanishing point confirming ~12km land curvature to north.', confidence: '91%', audit: 'EVD-03' },
        { id: 'GEO-04', source: 'Ocean Drive Art Deco Façade Photogrammetry', citation: 'South Beach hotel row scale matching 1:1 real-world structural proportions.', confidence: '97%', audit: 'EVD-01' },
        { id: 'GEO-05', source: 'FAA Airspace Corridor #LEO-2023-09', citation: 'Restricted commercial flight ceiling mapped to metropolitan airports.', confidence: '89%', audit: 'GEO-MAP' },
        { id: 'GEO-06', source: 'Shallow Sandbar Ocean Buoyancy Survey', citation: 'Patent US11288863B2 fluid simulation on sandbar coastline gradients.', confidence: '93%', audit: 'PAT-03' },
        { id: 'GEO-07', source: 'Debug Coordinate Extents Matrix', citation: 'World bounds verified at ±8,192 coordinate units in 2022 alpha builds.', confidence: '88%', audit: 'EVD-03' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-4xl bg-[#181d27] border border-[#584238]/60 rounded-lg shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#11141b] border-b border-[#584238]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[20px]">data_table</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#e0e2ec] uppercase tracking-wider">
              EVIDENCE CORROBORATION MATRIX
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#272a31] text-[#dfc0b3] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#dfc0b3]">
            This matrix establishes the cryptographic and documentary corroboration ledger for the lead investigative dossier. Every data point requires dual independent source verification.
          </p>

          <div className="space-y-6">
            {corroborations.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#ffb694] tracking-wider uppercase">
                  {group.type}
                </h3>
                <div className="bg-[#11141b] rounded border border-[#584238]/30 overflow-hidden">
                  <table className="w-full text-left font-['JetBrains_Mono',monospace] text-xs">
                    <thead className="bg-[#0b0e15] text-[#a68b7f] text-[10px] border-b border-[#584238]/20">
                      <tr>
                        <th className="py-2 px-3 font-semibold">ID</th>
                        <th className="py-2 px-3 font-semibold">Corroborating Document / Source</th>
                        <th className="py-2 px-3 font-semibold">Empirical Finding</th>
                        <th className="py-2 px-3 font-semibold">Confidence</th>
                        <th className="py-2 px-3 font-semibold text-right">Audit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#584238]/10 text-[11px]">
                      {group.items.map((item) => (
                        <tr key={item.id} className="hover:bg-[#1d2027]/70 transition-colors">
                          <td className="py-2.5 px-3 text-[#ffb694] font-semibold">{item.id}</td>
                          <td className="py-2.5 px-3 font-semibold text-[#e0e2ec]">{item.source}</td>
                          <td className="py-2.5 px-3 text-[#dfc0b3]">{item.citation}</td>
                          <td className="py-2.5 px-3 text-[#4edea3] font-bold">{item.confidence}</td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => {
                                onSelectAudit(item.audit);
                                onClose();
                              }}
                              className="text-[#ffb694] hover:underline font-mono"
                            >
                              [{item.audit}]
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#11141b] border-t border-[#584238]/40 flex items-center justify-between text-xs font-['JetBrains_Mono',monospace] text-[#a68b7f] px-6">
          <span>Total Verified References: 14 / 14 Checked</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] rounded text-xs transition-colors"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
