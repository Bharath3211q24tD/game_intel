import React, { useState } from 'react';
import { InteractiveGISMap, GIS_SECTORS, GISSector } from '../features/InteractiveGISMap';

interface IntelligenceHubViewProps {
  onOpenDossier: () => void;
  onOpenMatrix: () => void;
}

export const IntelligenceHubView: React.FC<IntelligenceHubViewProps> = ({
  onOpenDossier,
  onOpenMatrix
}) => {
  const [selectedSector, setSelectedSector] = useState<GISSector>(GIS_SECTORS[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#584238]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[22px]">explore</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] tracking-wider font-bold">
              CARTOGRAPHIC INTELLIGENCE HUB // GIS SECTOR RUNTIME
            </span>
          </div>
          <h1 className="font-['Newsreader',serif] text-2xl sm:text-3xl text-[#e0e2ec] mt-1">
            State of Leonida: Interactive GIS Telemetry & Cartography
          </h1>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#dfc0b3] max-w-2xl mt-1">
            Spatial geographic modeling cross-referencing Trailer 1 horizon sightlines, Highway 1 road arteries, FAA flight corridors, and Take-Two trademark registries.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDossier}
            className="px-3.5 py-2 bg-[#e86c28] hover:bg-[#f97316] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Read Mapping Dossier</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
          <button
            onClick={onOpenMatrix}
            className="px-3 py-2 bg-[#1d2027] hover:bg-[#272a31] border border-[#584238]/40 text-[#dfc0b3] font-['Plus_Jakarta_Sans',sans-serif] text-xs rounded flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px] text-[#a68b7f]">data_table</span>
            <span>Evidence Matrix</span>
          </button>
        </div>
      </div>

      {/* Main Interactive GIS Map Component */}
      <InteractiveGISMap
        selectedSectorId={selectedSector.id}
        onSelectSector={(s) => setSelectedSector(s)}
        onOpenDossier={onOpenDossier}
      />

      {/* Sector Quick Selector Grid & In-Depth Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sector Navigation Selector */}
        <div className="bg-[#1d2027] p-5 rounded border border-[#584238]/30 space-y-3">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] tracking-wider font-bold block">
            DELINEATED SECTORS ({GIS_SECTORS.length})
          </span>
          <div className="space-y-1.5 font-['Plus_Jakarta_Sans',sans-serif] text-xs">
            {GIS_SECTORS.map((sector) => {
              const isSelected = sector.id === selectedSector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSector(sector)}
                  className={`w-full text-left p-2.5 rounded border transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#272a31] border-[#e86c28] text-white'
                      : 'bg-[#10131a] border-[#584238]/30 text-[#dfc0b3] hover:border-[#a68b7f]'
                  }`}
                >
                  <div>
                    <span className="font-semibold block">{sector.name}</span>
                    <span className="text-[10px] font-mono text-[#a68b7f]">{sector.district}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#ffb694]">{sector.areaKm2} km²</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Points of Interest in Selected Sector */}
        <div className="bg-[#1d2027] p-5 rounded border border-[#584238]/30 space-y-3 font-['Plus_Jakarta_Sans',sans-serif]">
          <span className="text-xs uppercase text-[#7bd0ff] tracking-wider font-bold block">
            VERIFIED LANDMARKS & POINTS OF INTEREST
          </span>
          <p className="text-xs text-[#dfc0b3] leading-relaxed">
            Specific infrastructure markers, buildings, and transportation nodes verified in {selectedSector.name}:
          </p>
          <div className="space-y-1.5 font-['JetBrains_Mono',monospace] text-xs">
            {selectedSector.pointsOfInterest.map((poi, idx) => (
              <div
                key={idx}
                className="p-2 bg-[#10131a] rounded border border-[#584238]/20 flex items-center justify-between text-[#e0e2ec]"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-[#4edea3]">pin_drop</span>
                  <span>{poi}</span>
                </div>
                <span className="text-[10px] text-[#a68b7f]">VERIFIED</span>
              </div>
            ))}
          </div>
        </div>

        {/* Corroborating Airspace & Legal Registries */}
        <div className="bg-[#1d2027] p-5 rounded border border-[#584238]/30 space-y-3 font-['JetBrains_Mono',monospace] text-xs">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#4edea3] tracking-wider font-bold block">
            LEGAL DOCKETS & AIRSPACE CORRIDORS
          </span>
          <div className="space-y-2">
            <div className="p-2.5 bg-[#10131a] rounded border border-[#584238]/30 space-y-1">
              <span className="text-[#a68b7f] text-[10px] uppercase">FAA AIRSPACE PROTOCOL:</span>
              <div className="text-[#e0e2ec] font-semibold">{selectedSector.faaZone}</div>
            </div>
            <div className="p-2.5 bg-[#10131a] rounded border border-[#584238]/30 space-y-1">
              <span className="text-[#a68b7f] text-[10px] uppercase">OFFICIAL FOOTAGE TIME-CUE:</span>
              <div className="text-[#ffb694] font-semibold">{selectedSector.verifiedIn}</div>
            </div>
            <div className="p-2.5 bg-[#10131a] rounded border border-[#584238]/30 space-y-1">
              <span className="text-[#a68b7f] text-[10px] uppercase">DOCUMENTARY CITATIONS:</span>
              <div className="text-[#4edea3] font-bold">{selectedSector.citations} Cross-Referenced Filings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
