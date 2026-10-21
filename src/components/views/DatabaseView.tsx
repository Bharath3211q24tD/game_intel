import React, { useState, useMemo } from 'react';
import { DATABASE_ENTITIES } from '../../data/mockData';
import { DatabaseEntity } from '../../types';

interface DatabaseViewProps {
  initialCategory?: string;
  onSelectEntity: (entity: DatabaseEntity) => void;
}

export const DatabaseView: React.FC<DatabaseViewProps> = ({
  initialCategory = 'ALL',
  onSelectEntity
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'CHARACTERS', 'LOCATIONS', 'VEHICLES & ARSENAL', 'TECHNICAL SPECS'];

  const filteredEntities = useMemo(() => {
    return DATABASE_ENTITIES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#584238]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[22px]">inventory_2</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] tracking-wider font-bold">
              EVIDENCE VAULT // MASTER DATABASE
            </span>
          </div>
          <h1 className="font-['Newsreader',serif] text-2xl sm:text-3xl text-[#e0e2ec] mt-1">
            Verified Forensic Entity Registry
          </h1>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#dfc0b3] mt-0.5">
            Cross-indexed repository of verified characters, geography sectors, vehicles, weapons, and RAGE 9 engine technical metrics.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entities, specs, or tags..."
            className="w-full bg-[#10131a] border border-[#584238]/50 focus:border-[#e86c28] focus:outline-none text-[#e0e2ec] text-xs px-3 py-2 rounded placeholder:text-[#dfc0b3]/50 font-['Plus_Jakarta_Sans',sans-serif]"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-['Plus_Jakarta_Sans',sans-serif] uppercase">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#ffb694] text-[#571f00] shadow-sm'
                  : 'bg-[#1d2027] hover:bg-[#272a31] text-[#dfc0b3] hover:text-[#e0e2ec] border border-[#584238]/30'
              }`}
            >
              {cat === 'ALL' ? 'All Entities (312)' : cat}
            </button>
          );
        })}
      </div>

      {/* Entity Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntities.map((entity) => (
          <div
            key={entity.id}
            onClick={() => onSelectEntity(entity)}
            className="bg-[#1d2027] p-5 border border-[#584238]/30 rounded hover:border-[#ffb694] transition-all cursor-pointer flex flex-col justify-between space-y-4 group shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#a68b7f] uppercase tracking-wider">
                  {entity.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/30 font-['JetBrains_Mono',monospace] font-bold">
                  {entity.status}
                </span>
              </div>

              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-semibold text-[#e0e2ec] group-hover:text-[#ffb694] transition-colors">
                {entity.name}
              </h3>

              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#dfc0b3] line-clamp-3 leading-relaxed">
                {entity.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-[#584238]/20">
              <div className="flex flex-wrap gap-1">
                {entity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 bg-[#10131a] rounded text-[10px] text-[#dfc0b3] font-['JetBrains_Mono',monospace] border border-[#584238]/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] font-['JetBrains_Mono',monospace] text-[#a68b7f]">
                <span className="truncate max-w-[180px]">{entity.verifiedIn}</span>
                <span className="text-[#ffb694] group-hover:underline flex items-center gap-0.5 shrink-0">
                  <span>Dossier</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
