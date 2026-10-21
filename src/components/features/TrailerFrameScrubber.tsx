import React, { useState, useEffect, useRef } from 'react';

export interface TrailerCue {
  id: string;
  timecode: string; // e.g. "00:04"
  seconds: number;
  frameNumber: number;
  title: string;
  category: 'World & Geography' | 'Protagonists & Story' | 'Mechanics & AI' | 'Vehicles & Arsenal' | 'Viral & Social';
  location: string;
  coordinates: string;
  cameraSpecs: string;
  dialogue?: string;
  description: string;
  corroboratingPatent?: string;
  auditRef: string;
  imageUrl: string;
}

export const TRAILER_CUES: TrailerCue[] = [
  {
    id: 'cue-01',
    timecode: '00:04',
    seconds: 4,
    frameNumber: 96,
    title: 'Vice Beach Aerial & Dynamic Sunbathers',
    category: 'Mechanics & AI',
    location: 'Vice City Beach Strip',
    coordinates: "25°46'31\"N 80°11'32\"W",
    cameraSpecs: 'Aerial Drone Crane // 35mm Prime // Daylight',
    description: 'Over 140 distinct pedestrian rigs on screen simultaneously performing unscripted social rituals: dog walking, applying lotion, selfie recording, and dynamic jogger steering.',
    corroboratingPatent: 'USPTO US10981067B2 (Virtual Navigation Routines)',
    auditRef: 'EVD-11',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_wfx-Op2MkjzRU05cTTUG3DZckSvnpcm0IIImrqGPOGDALuf8UfOm--PD2maj8ZUw4vS13RXWBAg1JTAOftwy6vLzR4qXyHyHrd126duZfnADe-0v1e-Q9s1eKCZZ0oUcpk1twTbNWs0GGHMgVeBW9iv2Cl9UG9F90SIiDNhpWEEZXZYT1sdsqvwrv5BYpbpARJlBQVE8lHF1VnSwJ-W9G1Vr-9EQzVsE4L_UeS3g-XH6Z9ukHtwVTw'
  },
  {
    id: 'cue-02',
    timecode: '00:08',
    seconds: 8,
    frameNumber: 192,
    title: 'Lucia Correctional Interview & Counselor Stefanie',
    category: 'Protagonists & Story',
    location: 'Leonida Department of Corrections',
    coordinates: "25°58'12\"N 80°28'40\"W",
    cameraSpecs: 'Medium Over-the-Shoulder // 50mm Anamorphic',
    dialogue: '"Lucia, do you know why you\'re here? - Bad luck, I guess."',
    description: 'Formal confirmation of Lucia as principal playable protagonist. Establishes legal incarceration backstory prior to early-game parole.',
    auditRef: 'EVD-02',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKRKj0KqvctG8V2-2lhTaRkn2dFgTyFbM4ttn82UA1cL3xqJGXW3xEfPpRdvpOGlGDMMPd2QWVmV_zltYnCgti-gw4Pjzn9Qf-YN2p3z7ZHZsRA7uBnsy1LSJ2kjDNIk96y_zQg30mOdTv8rT9b2xFpmk-3wXALNxhIHEKQWrNh4X8omIHZOm1KdONa8XpbjWlIJLTdNso_uOdTMPJLDWPGfsu6FBxmbd8sBSggJys9ofbvSGIJW8xkA'
  },
  {
    id: 'cue-03',
    timecode: '00:14',
    seconds: 14,
    frameNumber: 336,
    title: 'Grotti Cheetah Classic Cruising Ocean Drive',
    category: 'Vehicles & Arsenal',
    location: 'Ocean Drive Art Deco Strip',
    coordinates: "25°46'45\"N 80°07'52\"W",
    cameraSpecs: 'Low Chase Tracking Rig // Wet Asphalt Reflectance',
    description: 'Ferrari Testarossa analog cruising past pastel neon hotel facades, verifying retro sports car class returns alongside next-gen ray-traced puddle reflections.',
    auditRef: 'EVD-01',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsNv-qWEu-kMMiPlbNicboRpiW1PXkxlwBOGGh0qmSPp5BzTqT4xTCGI3hiMfUVi0V0ShcWP0dDEqc_YI9J05A8IPiuaz4oSl37Zehl-VtUNjTWioD-epia3SlWQoTQf8yc_btri5PVDDMK1PLfqzVPjZfzrULTqOuUH6jXSawpE_t-F4LVv-w0aJ0CcyMdHqoytkZ-t7-hkd4ArreCAee6AQg5izxst1GS3mhuqXY14A7OJqDZEQuEg'
  },
  {
    id: 'cue-04',
    timecode: '00:20',
    seconds: 20,
    frameNumber: 480,
    title: 'Wildlife Control & Swimming Pool Alligator',
    category: 'World & Geography',
    location: 'Kelly County Suburbs',
    coordinates: "25°55'40\"N 80°42'10\"W",
    cameraSpecs: 'Wide Documentary Camera // Volumetric Sunlight',
    description: 'Wildlife removal officer physically wrestling an 8-foot American alligator out of a backyard pool, proving dynamic fauna-urban interaction AI routines.',
    auditRef: 'EVD-14',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_wfx-Op2MkjzRU05cTTUG3DZckSvnpcm0IIImrqGPOGDALuf8UfOm--PD2maj8ZUw4vS13RXWBAg1JTAOftwy6vLzR4qXyHyHrd126duZfnADe-0v1e-Q9s1eKCZZ0oUcpk1twTbNWs0GGHMgVeBW9iv2Cl9UG9F90SIiDNhpWEEZXZYT1sdsqvwrv5BYpbpARJlBQVE8lHF1VnSwJ-W9G1Vr-9EQzVsE4L_UeS3g-XH6Z9ukHtwVTw'
  },
  {
    id: 'cue-05',
    timecode: '00:23',
    seconds: 23,
    frameNumber: 552,
    title: 'Vice City Transit Metromover Elevated Rail',
    category: 'Mechanics & AI',
    location: 'Downtown Vice City Rail Loop',
    coordinates: "25°46'20\"N 80°11'40\"W",
    cameraSpecs: 'Telephoto Profile Shot // Twilight Ambient',
    description: 'Automated light-rail transit train passing along elevated concrete guideways through downtown skyscraper canyons, matching Miami Metromover schematics.',
    auditRef: 'INFRA-04',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMkAZhwgXTiMQRdDJ-FigBWgvv40_OO1Iz-E_TZdlTlTytnf6b6QZSJ7X3ZexMzeE-7xF7NSHx34cG_LADQyPnlhYHZ1lwC6-TG_x10shpo_t19RqG5YOxMwI7Qqe9tdhE-8CLAMKQxlLek2DnSGt7MhGy0FmtGkWvAtoKFfRdv8ePhBdy_wqk8EsNW8nZesQGpqFX7fWBHeFV5ZU76f722NqdbmUoX6q4pmUXY4DSn0V5FmUUqLAPwQ'
  },
  {
    id: 'cue-06',
    timecode: '00:32',
    seconds: 32,
    frameNumber: 768,
    title: 'Convertible Cruising & Compute Strand Hair Physics',
    category: 'Mechanics & AI',
    location: 'Biscayne Causeway Highway',
    coordinates: "25°47'10\"N 80°09'25\"W",
    cameraSpecs: 'Close-Up Vehicle Mounted // Sunset Backlight',
    description: 'Microscopic inspection of character hair in wind shear, proving real-time compute strand hair simulation rather than legacy polygonal cards.',
    corroboratingPatent: 'RAGE 9 Hair Physics Compute Shaders',
    auditRef: 'EVD-05',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsNv-qWEu-kMMiPlbNicboRpiW1PXkxlwBOGGh0qmSPp5BzTqT4xTCGI3hiMfUVi0V0ShcWP0dDEqc_YI9J05A8IPiuaz4oSl37Zehl-VtUNjTWioD-epia3SlWQoTQf8yc_btri5PVDDMK1PLfqzVPjZfzrULTqOuUH6jXSawpE_t-F4LVv-w0aJ0CcyMdHqoytkZ-t7-hkd4ArreCAee6AQg5izxst1GS3mhuqXY14A7OJqDZEQuEg'
  },
  {
    id: 'cue-07',
    timecode: '00:36',
    seconds: 36,
    frameNumber: 864,
    title: "Thrashin' in the Mud Truck Rally & Mud Club",
    category: 'World & Geography',
    location: 'Kelly County Wetlands',
    coordinates: "25°54'18\"N 80°40'30\"W",
    cameraSpecs: 'Wide Drone Orbit // High-Contrast Dirt Fog',
    description: 'Heavy lifted 4x4 trucks (Patriot Mil-Spec) churning through deep dynamic mud terrain with procedural particle deformation and off-road tire displacement.',
    auditRef: 'EVD-14',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_wfx-Op2MkjzRU05cTTUG3DZckSvnpcm0IIImrqGPOGDALuf8UfOm--PD2maj8ZUw4vS13RXWBAg1JTAOftwy6vLzR4qXyHyHrd126duZfnADe-0v1e-Q9s1eKCZZ0oUcpk1twTbNWs0GGHMgVeBW9iv2Cl9UG9F90SIiDNhpWEEZXZYT1sdsqvwrv5BYpbpARJlBQVE8lHF1VnSwJ-W9G1Vr-9EQzVsE4L_UeS3g-XH6Z9ukHtwVTw'
  },
  {
    id: 'cue-08',
    timecode: '00:42',
    seconds: 42,
    frameNumber: 1008,
    title: 'Highway 1 Overseas Twin Bridges Triangulation',
    category: 'World & Geography',
    location: 'Hamlet Keys Archipelago',
    coordinates: "24°33'12\"N 81°47'45\"W",
    cameraSpecs: 'High Aerial Drone Traverse // Horizon 12km Visibility',
    description: 'Key frame utilized for geometric triangulation, featuring parallel historical concrete bridge parallel to active Highway 1 connecting mainland to Hamlet Keys.',
    auditRef: 'EVD-12',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsNv-qWEu-kMMiPlbNicboRpiW1PXkxlwBOGGh0qmSPp5BzTqT4xTCGI3hiMfUVi0V0ShcWP0dDEqc_YI9J05A8IPiuaz4oSl37Zehl-VtUNjTWioD-epia3SlWQoTQf8yc_btri5PVDDMK1PLfqzVPjZfzrULTqOuUH6jXSawpE_t-F4LVv-w0aJ0CcyMdHqoytkZ-t7-hkd4ArreCAee6AQg5izxst1GS3mhuqXY14A7OJqDZEQuEg'
  },
  {
    id: 'cue-09',
    timecode: '00:46',
    seconds: 46,
    frameNumber: 1104,
    title: '#LeonidaMan Viral Social Feed Broadcast',
    category: 'Viral & Social',
    location: 'Live In-Game Social Media UI',
    coordinates: "Virtual Network Node // LEO-NET",
    cameraSpecs: 'Vertical 9:16 In-Game Smartphone Capture',
    description: 'Vertical social video interface with live user comments, emojis, and satirical local news feeds capturing bizarre Florida Man-style public occurrences.',
    auditRef: 'EVD-11',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKRKj0KqvctG8V2-2lhTaRkn2dFgTyFbM4ttn82UA1cL3xqJGXW3xEfPpRdvpOGlGDMMPd2QWVmV_zltYnCgti-gw4Pjzn9Qf-YN2p3z7ZHZsRA7uBnsy1LSJ2kjDNIk96y_zQg30mOdTv8rT9b2xFpmk-3wXALNxhIHEKQWrNh4X8omIHZOm1KdONa8XpbjWlIJLTdNso_uOdTMPJLDWPGfsu6FBxmbd8sBSggJys9ofbvSGIJW8xkA'
  },
  {
    id: 'cue-10',
    timecode: '01:05',
    seconds: 65,
    frameNumber: 1560,
    title: 'Lucia & Jason Convenience Store Armed Holdup',
    category: 'Protagonists & Story',
    location: 'Port Gellhorn Commercial Strip',
    coordinates: "26°08'14\"N 81°45'22\"W",
    cameraSpecs: 'Dynamic Low Shoulder // Handheld Action Cam',
    description: 'Lucia and Jason bursting through convenience store doors with bandanas and drawn firearms, confirming coordinated co-op robbery dynamics.',
    auditRef: 'EVD-02',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKRKj0KqvctG8V2-2lhTaRkn2dFgTyFbM4ttn82UA1cL3xqJGXW3xEfPpRdvpOGlGDMMPd2QWVmV_zltYnCgti-gw4Pjzn9Qf-YN2p3z7ZHZsRA7uBnsy1LSJ2kjDNIk96y_zQg30mOdTv8rT9b2xFpmk-3wXALNxhIHEKQWrNh4X8omIHZOm1KdONa8XpbjWlIJLTdNso_uOdTMPJLDWPGfsu6FBxmbd8sBSggJys9ofbvSGIJW8xkA'
  },
  {
    id: 'cue-11',
    timecode: '01:15',
    seconds: 75,
    frameNumber: 1800,
    title: 'The Mutual Trust Pledge ("Trust? - Trust.")',
    category: 'Protagonists & Story',
    location: 'Safehouse Motel Bed',
    coordinates: "25°46'10\"N 80°12'05\"W",
    cameraSpecs: 'Close-up Intimate Framing // Warm Dusk Lighting',
    dialogue: '"The only way we\'re gonna get through this is by sticking together, being a team. Trust? - Trust."',
    description: 'Climax of Trailer 1 affirming the Bonnie and Clyde narrative relationship between Lucia and Jason, anchoring the emotional core of the campaign.',
    auditRef: 'REF-12',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKRKj0KqvctG8V2-2lhTaRkn2dFgTyFbM4ttn82UA1cL3xqJGXW3xEfPpRdvpOGlGDMMPd2QWVmV_zltYnCgti-gw4Pjzn9Qf-YN2p3z7ZHZsRA7uBnsy1LSJ2kjDNIk96y_zQg30mOdTv8rT9b2xFpmk-3wXALNxhIHEKQWrNh4X8omIHZOm1KdONa8XpbjWlIJLTdNso_uOdTMPJLDWPGfsu6FBxmbd8sBSggJys9ofbvSGIJW8xkA'
  }
];

interface TrailerFrameScrubberProps {
  onSelectAudit: (ref: string) => void;
  onOpenVeo?: (imgUrl: string) => void;
}

export const TrailerFrameScrubber: React.FC<TrailerFrameScrubberProps> = ({
  onSelectAudit,
  onOpenVeo
}) => {
  const [currentCueIndex, setCurrentCueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showHUD, setShowHUD] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  const currentCue = TRAILER_CUES[currentCueIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(3000 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setCurrentCueIndex((prev) => (prev + 1) % TRAILER_CUES.length);
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const handleNext = () => {
    setCurrentCueIndex((prev) => (prev + 1) % TRAILER_CUES.length);
  };

  const handlePrev = () => {
    setCurrentCueIndex((prev) => (prev - 1 + TRAILER_CUES.length) % TRAILER_CUES.length);
  };

  const handleSeek = (index: number) => {
    setCurrentCueIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#1d2027] border border-[#584238]/30 rounded overflow-hidden flex flex-col shadow-2xl space-y-0">
      {/* Top Header Bar */}
      <div className="bg-[#10131a] border-b border-[#584238]/30 p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs font-['JetBrains_Mono',monospace]">
        <div className="flex items-center gap-2 text-[#ffb694] font-bold">
          <span className="material-symbols-outlined text-[18px]">movie</span>
          <span>TRAILER 1 TIMECODE FRAME SCRUBBER // 4K 60FPS</span>
        </div>

        <div className="flex items-center gap-2">
          {/* HUD Overlay Toggles */}
          <button
            onClick={() => setShowHUD(!showHUD)}
            className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
              showHUD
                ? 'bg-[#4edea3]/20 text-[#4edea3] border-[#4edea3]/40 font-bold'
                : 'bg-[#1d2027] text-[#dfc0b3]/50 border-[#584238]/30'
            }`}
          >
            HUD Vectors
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
              showGrid
                ? 'bg-[#7bd0ff]/20 text-[#7bd0ff] border-[#7bd0ff]/40 font-bold'
                : 'bg-[#1d2027] text-[#dfc0b3]/50 border-[#584238]/30'
            }`}
          >
            Rule of Thirds
          </button>

          {/* Speed Selector */}
          <div className="inline-flex items-center bg-[#10131a] border border-[#584238]/40 rounded p-0.5 ml-2">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  playbackSpeed === spd
                    ? 'bg-[#e86c28] text-white'
                    : 'text-[#dfc0b3] hover:text-[#e0e2ec]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Cinematic Frame Viewport */}
      <div className="relative aspect-[16/9] bg-[#0b0e15] overflow-hidden select-none">
        {/* Frame Image */}
        <img
          src={currentCue.imageUrl}
          alt={currentCue.title}
          className="w-full h-full object-cover brightness-90 contrast-115 transition-all duration-300"
        />

        {/* Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e15]/90 via-transparent to-transparent pointer-events-none" />

        {/* Optical Rule of Thirds Grid */}
        {showGrid && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20 border border-white">
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-white" />
            <div className="border-r border-white" />
            <div />
          </div>
        )}

        {/* Live HUD Telemetry Vector Overlay */}
        {showHUD && (
          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between pointer-events-none font-['JetBrains_Mono',monospace]">
            {/* Top HUD Bar */}
            <div className="flex items-center justify-between text-xs">
              <div className="bg-[#0b0e15]/85 border border-[#584238]/60 px-3 py-1.5 rounded flex items-center gap-3">
                <span className="text-[#4edea3] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping" />
                  TIMECODE: {currentCue.timecode}
                </span>
                <span className="text-[#584238]">|</span>
                <span className="text-[#dfc0b3]">FRAME #{currentCue.frameNumber}</span>
              </div>

              <div className="bg-[#0b0e15]/85 border border-[#584238]/60 px-3 py-1.5 rounded text-[11px] text-[#7bd0ff] hidden sm:block">
                {currentCue.cameraSpecs}
              </div>
            </div>

            {/* In-lore Dialogue Subtitle */}
            {currentCue.dialogue && (
              <div className="self-center bg-[#0b0e15]/90 border border-[#ffb694]/50 px-4 py-2 rounded max-w-xl text-center shadow-lg">
                <span className="font-['Newsreader',serif] text-base sm:text-lg text-[#ffb694] italic">
                  {currentCue.dialogue}
                </span>
              </div>
            )}

            {/* Bottom Inset Coordinates & Audit Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="bg-[#0b0e15]/90 border border-[#584238]/60 px-3 py-1.5 rounded flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#4edea3]">pin_drop</span>
                <span className="text-white font-semibold">{currentCue.location}</span>
                <span className="text-[#a68b7f] text-[10px]">[{currentCue.coordinates}]</span>
              </div>

              <div className="pointer-events-auto flex items-center gap-2">
                {onOpenVeo && (
                  <button
                    onClick={() => onOpenVeo(currentCue.imageUrl)}
                    className="bg-[#0b0e15]/90 hover:bg-[#272a31] text-[#7bd0ff] border border-[#584238]/60 px-2.5 py-1 rounded text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-md"
                  >
                    <span className="material-symbols-outlined text-[14px]">movie</span>
                    <span>Animate with Veo</span>
                  </button>
                )}

                <button
                  onClick={() => onSelectAudit(currentCue.auditRef)}
                  className="bg-[#e86c28] hover:bg-[#f97316] text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-md"
                >
                  <span>Audit [{currentCue.auditRef}]</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scrubber Timeline Bar */}
      <div className="bg-[#10131a] p-3 sm:p-4 border-t border-[#584238]/30 space-y-3 font-['JetBrains_Mono',monospace]">
        {/* Playback Controls & Frame Slider */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-[#e86c28] hover:bg-[#f97316] text-white rounded flex items-center justify-center transition-colors cursor-pointer shadow-md"
            title={isPlaying ? 'Pause' : 'Play Timeline'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Prev/Next buttons */}
          <button
            onClick={handlePrev}
            className="p-1.5 bg-[#272a31] hover:bg-[#363941] text-[#dfc0b3] rounded"
            title="Previous Frame"
          >
            <span className="material-symbols-outlined text-[16px]">skip_previous</span>
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 bg-[#272a31] hover:bg-[#363941] text-[#dfc0b3] rounded"
            title="Next Frame"
          >
            <span className="material-symbols-outlined text-[16px]">skip_next</span>
          </button>

          {/* Timeline Slider with Cue Markers */}
          <div className="flex-1 relative flex items-center h-8">
            {/* Base timeline rail */}
            <div className="w-full h-1.5 bg-[#272a31] rounded relative">
              {/* Progress bar */}
              <div
                className="h-full bg-[#e86c28] rounded transition-all duration-150"
                style={{
                  width: `${(currentCue.seconds / 90) * 100}%`
                }}
              />

              {/* Cue tick marks */}
              {TRAILER_CUES.map((cue, idx) => {
                const pct = (cue.seconds / 90) * 100;
                const isSelected = idx === currentCueIndex;
                return (
                  <button
                    key={cue.id}
                    onClick={() => handleSeek(idx)}
                    style={{ left: `${pct}%` }}
                    className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-white border-[#e86c28] scale-125 z-10 shadow-md'
                        : 'bg-[#10131a] border-[#a68b7f] hover:border-[#ffb694] hover:scale-110'
                    }`}
                    title={`${cue.timecode} - ${cue.title}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Time Counter */}
          <div className="text-xs text-[#dfc0b3] shrink-0 font-bold">
            <span className="text-white">{currentCue.timecode}</span> / 01:30
          </div>
        </div>

        {/* Frame Description & Evidentiary Significance */}
        <div className="bg-[#1d2027] p-3 rounded border border-[#584238]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#ffb694] uppercase tracking-wider font-bold">
                {currentCue.category}
              </span>
              <span className="text-[#584238]">•</span>
              <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#4edea3]">
                CUE {currentCueIndex + 1} OF {TRAILER_CUES.length}
              </span>
            </div>
            <h4 className="font-['Newsreader',serif] text-base text-[#e0e2ec] font-semibold">
              {currentCue.title}
            </h4>
            <p className="text-xs text-[#dfc0b3] leading-relaxed max-w-3xl">
              {currentCue.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {currentCue.corroboratingPatent && (
              <span className="px-2 py-1 bg-[#10131a] text-[#7bd0ff] rounded text-[11px] font-mono border border-[#584238]/30">
                {currentCue.corroboratingPatent}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
