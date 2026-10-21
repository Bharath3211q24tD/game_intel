import React from 'react';
import { DATABASE_ENTITIES } from '../data/mockData';
import { DatabaseEntity } from '../types';

interface DatabaseFastLookupProps {
  onSelectEntity: (entity: DatabaseEntity) => void;
  onViewFullDatabase: (category?: string) => void;
}

export const DatabaseFastLookup: React.FC<DatabaseFastLookupProps> = ({
  onSelectEntity,
  onViewFullDatabase
}) => {
  const characters = DATABASE_ENTITIES.filter((e) => e.category === 'CHARACTERS');
  const locations = DATABASE_ENTITIES.filter((e) => e.category === 'LOCATIONS');
  const vehicles = DATABASE_ENTITIES.filter((e) => e.category === 'VEHICLES & ARSENAL');
  const techSpecs = DATABASE_ENTITIES.filter((e) => e.category === 'TECHNICAL SPECS');

  return (
    <section className="bg-[#1d2027] border border-[#584238]/30 rounded p-4 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#584238]/20 pb-4">
        <div>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] tracking-wider font-bold">
            EVIDENCE VAULT
          </span>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-semibold text-[#e0e2ec]">
            Interactive Database Fast-Lookup
          </h2>
        </div>
        <button
          onClick={() => onViewFullDatabase()}
          className="font-['JetBrains_Mono',monospace] text-xs text-[#dfc0b3] hover:text-[#ffb694] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>312 Cross-Referenced Entities</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Module 1: Characters */}
        <div className="bg-[#10131a] p-4 border border-[#584238]/30 rounded space-y-3 hover:border-[#e86c28] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#7bd0ff] font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">groups</span>
              CHARACTERS
            </span>
            <button
              onClick={() => onViewFullDatabase('CHARACTERS')}
              className="font-['JetBrains_Mono',monospace] text-[11px] text-[#a68b7f] hover:underline"
            >
              18 Profiles
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {characters.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectEntity(item)}
                className="px-2 py-1 bg-[#272a31] hover:bg-[#363941] rounded text-xs text-[#e0e2ec] hover:text-[#ffb694] cursor-pointer border border-[#584238]/30 transition-colors text-left"
              >
                {item.name} {item.badge ? `[${item.badge}]` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Module 2: Locations */}
        <div className="bg-[#10131a] p-4 border border-[#584238]/30 rounded space-y-3 hover:border-[#e86c28] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">pin_drop</span>
              LOCATIONS
            </span>
            <button
              onClick={() => onViewFullDatabase('LOCATIONS')}
              className="font-['JetBrains_Mono',monospace] text-[11px] text-[#a68b7f] hover:underline"
            >
              44 Sectors
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {locations.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectEntity(item)}
                className="px-2 py-1 bg-[#272a31] hover:bg-[#363941] rounded text-xs text-[#e0e2ec] hover:text-[#ffb694] cursor-pointer border border-[#584238]/30 transition-colors text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Module 3: Vehicles */}
        <div className="bg-[#10131a] p-4 border border-[#584238]/30 rounded space-y-3 hover:border-[#e86c28] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#4edea3] font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">directions_car</span>
              VEHICLES & ARSENAL
            </span>
            <button
              onClick={() => onViewFullDatabase('VEHICLES & ARSENAL')}
              className="font-['JetBrains_Mono',monospace] text-[11px] text-[#a68b7f] hover:underline"
            >
              76 Indexed
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {vehicles.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectEntity(item)}
                className="px-2 py-1 bg-[#272a31] hover:bg-[#363941] rounded text-xs text-[#e0e2ec] hover:text-[#ffb694] cursor-pointer border border-[#584238]/30 transition-colors text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Module 4: Technical Specs */}
        <div className="bg-[#10131a] p-4 border border-[#584238]/30 rounded space-y-3 hover:border-[#e86c28] transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">memory</span>
              TECHNICAL SPECS
            </span>
            <button
              onClick={() => onViewFullDatabase('TECHNICAL SPECS')}
              className="font-['JetBrains_Mono',monospace] text-[11px] text-[#a68b7f] hover:underline"
            >
              29 Metrics
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {techSpecs.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectEntity(item)}
                className="px-2 py-1 bg-[#272a31] hover:bg-[#363941] rounded text-xs text-[#e0e2ec] hover:text-[#ffb694] cursor-pointer border border-[#584238]/30 transition-colors text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
