import React from 'react';
import { DatabaseEntity } from '../../types';

interface EntityModalProps {
  entity: DatabaseEntity | null;
  onClose: () => void;
}

export const EntityModal: React.FC<EntityModalProps> = ({ entity, onClose }) => {
  if (!entity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="w-full max-w-xl bg-[#181d27] border border-[#584238]/60 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#11141b] border-b border-[#584238]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-['JetBrains_Mono',monospace] text-xs text-[#a68b7f] uppercase">
              {entity.category}
            </span>
            <span className="text-[#584238]">•</span>
            <span className="font-['JetBrains_Mono',monospace] text-xs text-[#4edea3]">
              {entity.status}
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
        <div className="p-6 overflow-y-auto space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-['Newsreader',serif] text-2xl text-[#e0e2ec] font-normal">
                {entity.name}
              </h2>
              {entity.badge && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#e86c28]/20 text-[#ffb694] border border-[#e86c28]/30 font-['JetBrains_Mono',monospace] font-bold">
                  {entity.badge}
                </span>
              )}
            </div>
            {entity.coordinates && (
              <div className="font-['JetBrains_Mono',monospace] text-xs text-[#7bd0ff]">
                COORDINATES: {entity.coordinates}
              </div>
            )}
          </div>

          <p className="text-sm text-[#dfc0b3] leading-relaxed">
            {entity.description}
          </p>

          {/* Metrics */}
          {entity.metrics && (
            <div className="bg-[#10131a] p-3 rounded border border-[#584238]/30 space-y-2 text-xs font-['JetBrains_Mono',monospace]">
              <span className="text-[10px] text-[#a68b7f] uppercase tracking-wider block font-bold">
                FORENSIC ATTRIBUTES
              </span>
              {Object.entries(entity.metrics).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-[#dfc0b3]">
                  <span className="text-[#a68b7f]">{k}:</span>
                  <span className="text-[#e0e2ec] font-semibold">{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Verification Cues */}
          <div className="space-y-1.5 font-['JetBrains_Mono',monospace] text-xs">
            <span className="text-[10px] text-[#a68b7f] uppercase tracking-wider block font-bold">
              OFFICIAL VERIFICATION FOOTAGE / REGISTRY
            </span>
            <div className="p-2.5 bg-[#10131a] rounded border border-[#584238]/30 text-[#ffb694]">
              {entity.verifiedIn}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {entity.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-[#272a31] text-[#dfc0b3] rounded text-xs font-['JetBrains_Mono',monospace] border border-[#584238]/30"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#11141b] border-t border-[#584238]/40 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] rounded text-xs font-semibold transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
