import React, { useState } from 'react';
import { TrailerFrameScrubber, TRAILER_CUES, TrailerCue } from '../features/TrailerFrameScrubber';

interface TrailerScrubberViewProps {
  onSelectAudit: (ref: string) => void;
  onOpenVeo: (imgUrl?: string) => void;
}

export const TrailerScrubberView: React.FC<TrailerScrubberViewProps> = ({
  onSelectAudit,
  onOpenVeo
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'World & Geography',
    'Protagonists & Story',
    'Mechanics & AI',
    'Vehicles & Arsenal',
    'Viral & Social'
  ];

  const filteredCues = selectedCategory === 'ALL'
    ? TRAILER_CUES
    : TRAILER_CUES.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#584238]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[22px]">movie</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase text-[#ffb694] tracking-wider font-bold">
              FRAME-BY-FRAME FORENSICS // TRAILER 1 (90 SECONDS)
            </span>
          </div>
          <h1 className="font-['Newsreader',serif] text-2xl sm:text-3xl text-[#e0e2ec] mt-1">
            Trailer 1 Timecode Optical Frame Scrubber & Keyframe Index
          </h1>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#dfc0b3] max-w-2xl mt-1">
            Millisecond-calibrated keyframe triage extracted from the official 4K master. Inspect ray-traced water reflectance, compute hair shaders, biometric crowd routines, and architectural parallels.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenVeo()}
            className="px-3.5 py-2 bg-[#e86c28] hover:bg-[#f97316] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[15px]">movie</span>
            <span>Veo Cinematic Generator</span>
          </button>
        </div>
      </div>

      {/* Primary Scrubber Engine */}
      <TrailerFrameScrubber
        onSelectAudit={onSelectAudit}
        onOpenVeo={onOpenVeo}
      />

      {/* Category Filter & Cue Index Matrix */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase text-[#ffb694] tracking-wider">
              Filter Keyframes:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded text-xs font-['Plus_Jakarta_Sans',sans-serif] transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#e86c28] text-white font-bold'
                      : 'bg-[#1d2027] text-[#dfc0b3] hover:bg-[#272a31] border border-[#584238]/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <span className="text-xs font-['JetBrains_Mono',monospace] text-[#a68b7f]">
            SHOWING {filteredCues.length} OF {TRAILER_CUES.length} KEYFRAMES
          </span>
        </div>

        {/* Thumbnail Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCues.map((cue: TrailerCue) => (
            <div
              key={cue.id}
              className="bg-[#1d2027] border border-[#584238]/30 hover:border-[#ffb694]/60 rounded overflow-hidden flex flex-col group transition-all"
            >
              <div className="relative aspect-video bg-[#0b0e15] overflow-hidden">
                <img
                  src={cue.imageUrl}
                  alt={cue.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-[#0b0e15]/90 border border-[#584238]/60 px-2 py-0.5 rounded text-[10px] font-mono text-[#4edea3] font-bold">
                  {cue.timecode}
                </div>
                <div className="absolute top-2 right-2 bg-[#0b0e15]/90 border border-[#584238]/60 px-2 py-0.5 rounded text-[10px] font-mono text-[#ffb694]">
                  FRAME #{cue.frameNumber}
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#a68b7f] mb-1">
                    <span className="uppercase text-[#ffb694] font-semibold">{cue.category}</span>
                    <span>[{cue.auditRef}]</span>
                  </div>
                  <h4 className="font-['Newsreader',serif] text-sm text-[#e0e2ec] font-semibold line-clamp-1 group-hover:text-[#ffb694] transition-colors">
                    {cue.title}
                  </h4>
                  <p className="text-xs text-[#dfc0b3]/80 line-clamp-2 mt-1 leading-relaxed">
                    {cue.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#584238]/20 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#a68b7f] truncate max-w-[140px]">{cue.location}</span>
                  <button
                    onClick={() => onSelectAudit(cue.auditRef)}
                    className="text-[#ffb694] hover:text-[#e86c28] font-bold flex items-center gap-0.5"
                  >
                    <span>Audit</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forensic Deep Dive Dossiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#584238]/30">
        <div className="bg-[#10131a] p-5 rounded border border-[#584238]/30 space-y-2 font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="flex items-center gap-2 text-[#ffb694]">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="text-xs font-bold uppercase tracking-wider font-mono">
              COMPUTE STRAND SIMULATION
            </span>
          </div>
          <h4 className="font-['Newsreader',serif] text-base text-[#e0e2ec]">
            Real-Time Compute Shader Hair Dynamics
          </h4>
          <p className="text-xs text-[#dfc0b3] leading-relaxed">
            Inspection of Cue 00:32 reveals thousands of individual strand splines calculated via GPU compute shaders, moving realistically against wind shear rather than rigid polygonal shell cards.
          </p>
        </div>

        <div className="bg-[#10131a] p-5 rounded border border-[#584238]/30 space-y-2 font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="flex items-center gap-2 text-[#4edea3]">
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            <span className="text-xs font-bold uppercase tracking-wider font-mono">
              USPTO US10981067B2 AI ROUTINES
            </span>
          </div>
          <h4 className="font-['Newsreader',serif] text-base text-[#e0e2ec]">
            Autonomous Pedestrian Rituals & Grouping
          </h4>
          <p className="text-xs text-[#dfc0b3] leading-relaxed">
            Cue 00:04 beach aerial confirms Take-Two's patented virtual navigation routines where NPCs maintain social cliques, record phone footage, interact with canines, and dynamically avoid obstructions.
          </p>
        </div>

        <div className="bg-[#10131a] p-5 rounded border border-[#584238]/30 space-y-2 font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="flex items-center gap-2 text-[#7bd0ff]">
            <span className="material-symbols-outlined text-[18px]">radar</span>
            <span className="text-xs font-bold uppercase tracking-wider font-mono">
              PHOTOGRAMMETRIC TRIANGULATION
            </span>
          </div>
          <h4 className="font-['Newsreader',serif] text-base text-[#e0e2ec]">
            Highway 1 & Metromover Infrastructure
          </h4>
          <p className="text-xs text-[#dfc0b3] leading-relaxed">
            Horizon sightlines at Cues 00:23 and 00:42 match Miami's Metromover guideways and the Overseas Highway twin bridges with sub-50-meter cartographic precision.
          </p>
        </div>
      </div>
    </div>
  );
};
