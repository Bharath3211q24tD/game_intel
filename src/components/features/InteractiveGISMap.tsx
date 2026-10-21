import React, { useState, useRef, useEffect } from 'react';

export interface GISSector {
  id: string;
  name: string;
  district: string;
  coords: string;
  center: [number, number]; // [x%, y%]
  polygon: string; // SVG path or polygon points
  color: string;
  strokeColor: string;
  biome: string;
  areaKm2: number;
  elevation: string;
  faaZone: string;
  citations: number;
  description: string;
  verifiedIn: string;
  pointsOfInterest: string[];
}

export const GIS_SECTORS: GISSector[] = [
  {
    id: 'vice-city-metropole',
    name: 'Vice City Metropolitan Corridor',
    district: 'Vice District 01',
    coords: "25°46'31\"N 80°11'32\"W",
    center: [72, 36],
    polygon: 'M 62,26 L 82,24 L 88,44 L 78,52 L 64,48 Z',
    color: 'rgba(232, 108, 40, 0.15)',
    strokeColor: '#e86c28',
    biome: 'Subtropical Urban Metropole',
    areaKm2: 38.6,
    elevation: '2m - 18m MSL',
    faaZone: 'LEO-TWR-01 (Restricted <300m)',
    citations: 14,
    description: 'High-density urban coastline featuring Art Deco historic hotel rows, Venetian-style residential islands, downtown financial skyscrapers, and the elevated Vice City Transit Metromover automated rail guideway.',
    verifiedIn: 'Trailer 1 (00:03, 00:14, 00:23, 00:46)',
    pointsOfInterest: ['Ocean Drive Strip', 'Vice Beach Boardwalk', 'Venetian Causeways', 'Financial District Core', 'Metromover Loop']
  },
  {
    id: 'kelly-county-wetlands',
    name: 'Kelly County Wetlands & Bayou',
    district: 'Kelly County Jurisdiction',
    coords: "25°55'40\"N 80°42'10\"W",
    center: [48, 48],
    polygon: 'M 36,36 L 60,34 L 62,60 L 38,62 Z',
    color: 'rgba(78, 222, 163, 0.15)',
    strokeColor: '#4edea3',
    biome: 'Sawgrass Marshland & Cypress Preserves',
    areaKm2: 44.2,
    elevation: '1m - 5m MSL',
    faaZone: 'LEO-UNRESTRICTED (Low-Level)',
    citations: 9,
    description: 'Extensive Everglades analog dominated by sawgrass wetlands, cypress bayous, muddy dirt tracks, and alligator habitats. Host to localized off-road rallies such as the Mud Club.',
    verifiedIn: 'Trailer 1 (00:20, 00:36)',
    pointsOfInterest: ['Thrashin in the Mud Arena', 'Sawgrass Airboat Waterways', 'Alligator Breeding Pools', 'Kelly County Sheriff Substation']
  },
  {
    id: 'port-gellhorn',
    name: 'Port Gellhorn Industrial Docks',
    district: 'Gellhorn Maritime Authority',
    coords: "26°08'14\"N 81°45'22\"W",
    center: [22, 46],
    polygon: 'M 12,38 L 30,36 L 32,58 L 14,56 Z',
    color: 'rgba(123, 208, 255, 0.15)',
    strokeColor: '#7bd0ff',
    biome: 'Deepwater Maritime & Petrochemical Basin',
    areaKm2: 24.8,
    elevation: '1m - 12m MSL',
    faaZone: 'LEO-PORT-04 (Harbor Control)',
    citations: 8,
    description: 'Commercial shipping harbor and manufacturing hub on the western gulf coastline. Houses container gantry cranes, marine shipyards, and commercial interstate trucking depots.',
    verifiedIn: 'Take-Two Trademark #97423912 & 2022 Leaks',
    pointsOfInterest: ['Gantry Crane Terminals', 'Naval Drydocks', 'Commercial Freight Rail', 'Coastal Petrochemical Silos']
  },
  {
    id: 'hamlet-keys',
    name: 'Hamlet Keys & Archipelago',
    district: 'Monroe-Analog County',
    coords: "24°33'12\"N 81°47'45\"W",
    center: [42, 82],
    polygon: 'M 28,74 L 56,72 L 64,88 L 32,92 Z',
    color: 'rgba(255, 182, 148, 0.15)',
    strokeColor: '#ffb694',
    biome: 'Littoral Coral Sandbars & Shallow Banks',
    areaKm2: 18.2,
    elevation: '0.5m - 4m MSL',
    faaZone: 'LEO-COASTAL-08 (Marine Patrol)',
    citations: 11,
    description: 'Subtropical archipelago interconnected to the mainland via Highway 1 Overseas bridges. Characterized by shallow turquoise sandbars, coral reefs, sports fishing marinas, and coastal villas.',
    verifiedIn: 'Trailer 1 (00:42 aerial bridge)',
    pointsOfInterest: ['Overseas Highway Twin Bridges', 'Key Largo Analog Marinas', 'Deepwater Coral Sandbars', 'Seaside Motel Strip']
  },
  {
    id: 'ambrosia-agro',
    name: 'Ambrosia Agricultural Basin',
    district: 'Interior County',
    coords: "26°24'08\"N 80°52'19\"W",
    center: [48, 20],
    polygon: 'M 34,10 L 64,12 L 60,30 L 32,28 Z',
    color: 'rgba(255, 180, 171, 0.15)',
    strokeColor: '#ffb4ab',
    biome: 'Agro-Industrial Sugarcane Lowlands',
    areaKm2: 26.4,
    elevation: '8m - 24m MSL',
    faaZone: 'LEO-AG-02 (Crop Dusting Corridor)',
    citations: 6,
    description: 'Interior lowlands housing industrial sugar refineries, crop dusting airstrips, agricultural processing plants, and residential trailer communities.',
    verifiedIn: '2022 Development Leaks',
    pointsOfInterest: ['Sugarcane Refineries', 'Agro-Chemical Silos', 'Grass Airstrips', 'Rural Feed Stores']
  }
];

interface InteractiveGISMapProps {
  onSelectSector: (sector: GISSector) => void;
  selectedSectorId?: string;
  onOpenDossier?: () => void;
}

export const InteractiveGISMap: React.FC<InteractiveGISMapProps> = ({
  onSelectSector,
  selectedSectorId = 'vice-city-metropole',
  onOpenDossier
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoverCoords, setHoverCoords] = useState<string>("25°46'31\"N 80°11'32\"W");
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  // Layers
  const [showFAA, setShowFAA] = useState(true);
  const [showRoads, setShowRoads] = useState(true);
  const [showTrademarks, setShowTrademarks] = useState(true);
  const [showContours, setShowContours] = useState(true);

  // Measure distance tool
  const [measureMode, setMeasureMode] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<Array<[number, number]>>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeSector = GIS_SECTORS.find((s) => s.id === selectedSectorId) || GIS_SECTORS[0];

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.35, 3.2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.35, 0.9));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setMeasurePoints([]);
    setMeasureMode(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (measureMode) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !measureMode) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setCursorPos({ x: Math.round(xPct), y: Math.round(yPct) });

      // Simulated geographic coordinates interpolation based on Floridian bounds
      const latDeg = 26.5 - (yPct / 100) * 2.0;
      const lonDeg = -81.9 + (xPct / 100) * 1.8;
      const latMin = Math.abs(Math.floor((latDeg % 1) * 60));
      const latSec = Math.abs(Math.floor((((latDeg % 1) * 60) % 1) * 60));
      const lonMin = Math.abs(Math.floor((lonDeg % 1) * 60));
      const lonSec = Math.abs(Math.floor((((lonDeg % 1) * 60) % 1) * 60));

      setHoverCoords(`${Math.floor(latDeg)}°${latMin}'${latSec}"N ${Math.abs(Math.floor(lonDeg))}°${lonMin}'${lonSec}"W`);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    if (!measureMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;

    if (measurePoints.length >= 2) {
      setMeasurePoints([[xPct, yPct]]);
    } else {
      setMeasurePoints([...measurePoints, [xPct, yPct]]);
    }
  };

  const calculatedDistance = () => {
    if (measurePoints.length < 2) return null;
    const [p1, p2] = measurePoints;
    // Map bounds represents roughly 45km across the width
    const dx = ((p2[0] - p1[0]) / 100) * 45;
    const dy = ((p2[1] - p1[1]) / 100) * 50;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist.toFixed(1);
  };

  return (
    <div className="bg-[#1d2027] border border-[#584238]/30 rounded overflow-hidden flex flex-col shadow-xl">
      {/* GIS Top Control Bar */}
      <div className="bg-[#10131a] border-b border-[#584238]/30 p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs font-['JetBrains_Mono',monospace]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#4edea3] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
            <span>GIS CARTOGRAPHIC ENGINE v3.4</span>
          </div>
          <span className="text-[#584238]/50 hidden sm:inline">|</span>
          <span className="text-[#dfc0b3] hidden sm:inline text-[11px]">
            DATUM: WGS-84 // PROJECTION: UTM ZONE 17N
          </span>
        </div>

        {/* Layer Toggles & Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer toggles */}
          <button
            onClick={() => setShowFAA(!showFAA)}
            className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
              showFAA
                ? 'bg-[#00a6e0]/20 text-[#7bd0ff] border-[#00a6e0]/40 font-bold'
                : 'bg-[#1d2027] text-[#dfc0b3]/50 border-[#584238]/30'
            }`}
            title="Toggle FAA Airspace Corridors"
          >
            FAA Airspace
          </button>

          <button
            onClick={() => setShowRoads(!showRoads)}
            className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
              showRoads
                ? 'bg-[#e86c28]/20 text-[#ffb694] border-[#e86c28]/40 font-bold'
                : 'bg-[#1d2027] text-[#dfc0b3]/50 border-[#584238]/30'
            }`}
            title="Toggle Highway 1 & Arterials"
          >
            Highway 1
          </button>

          <button
            onClick={() => setShowContours(!showContours)}
            className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
              showContours
                ? 'bg-[#00a572]/20 text-[#4edea3] border-[#00a572]/40 font-bold'
                : 'bg-[#1d2027] text-[#dfc0b3]/50 border-[#584238]/30'
            }`}
            title="Toggle Depth & Topographic Contours"
          >
            Bathymetry
          </button>

          {/* Measure Tool */}
          <button
            onClick={() => {
              setMeasureMode(!measureMode);
              setMeasurePoints([]);
            }}
            className={`px-2 py-0.5 rounded text-[11px] border transition-colors flex items-center gap-1 ${
              measureMode
                ? 'bg-[#e86c28] text-white border-white font-bold'
                : 'bg-[#1d2027] text-[#dfc0b3] border-[#584238]/40 hover:text-[#ffb694]'
            }`}
            title="Distance Measurement Tool"
          >
            <span className="material-symbols-outlined text-[13px]">straighten</span>
            <span>{measureMode ? 'Measuring' : 'Measure Dist'}</span>
          </button>

          {/* Zoom Controls */}
          <div className="inline-flex items-center bg-[#1d2027] border border-[#584238]/40 rounded p-0.5 ml-2">
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-[#272a31] text-[#dfc0b3] hover:text-[#e0e2ec] rounded"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
            </button>
            <span className="px-1 text-[10px] text-[#a68b7f]">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-[#272a31] text-[#dfc0b3] hover:text-[#e0e2ec] rounded"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-[15px]">remove</span>
            </button>
            <button
              onClick={handleResetView}
              className="p-1 hover:bg-[#272a31] text-[#ffb694] rounded ml-0.5"
              title="Reset View"
            >
              <span className="material-symbols-outlined text-[15px]">refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleMapClick}
        className={`relative aspect-[16/10] bg-[#0b0e15] overflow-hidden select-none ${
          measureMode ? 'cursor-crosshair' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Transform Container */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
          className="relative w-full h-full"
        >
          {/* Base Satellite Topography Image */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsNv-qWEu-kMMiPlbNicboRpiW1PXkxlwBOGGh0qmSPp5BzTqT4xTCGI3hiMfUVi0V0ShcWP0dDEqc_YI9J05A8IPiuaz4oSl37Zehl-VtUNjTWioD-epia3SlWQoTQf8yc_btri5PVDDMK1PLfqzVPjZfzrULTqOuUH6jXSawpE_t-F4LVv-w0aJ0CcyMdHqoytkZ-t7-hkd4ArreCAee6AQg5izxst1GS3mhuqXY14A7OJqDZEQuEg"
            alt="Leonida Satellite Cartography"
            className="w-full h-full object-cover brightness-65 contrast-125"
            draggable={false}
          />

          {/* SVG Vector Layer (Polygons, Roads, Flight paths, Bathymetry) */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Bathymetry Contours */}
            {showContours && (
              <g opacity="0.35" stroke="#4edea3" strokeWidth="0.25" fill="none" strokeDasharray="1 1">
                <path d="M 10,70 Q 30,65 50,75 T 90,60" />
                <path d="M 15,80 Q 35,75 55,85 T 95,70" />
                <path d="M 5,60 Q 25,55 45,65 T 85,50" />
              </g>
            )}

            {/* Highway 1 & Arterial Roads Network */}
            {showRoads && (
              <g stroke="#ffb694" strokeWidth="0.6" fill="none" opacity="0.8">
                {/* Highway 1 Mainland to Keys */}
                <path d="M 72,36 Q 64,55 52,68 T 42,82" />
                {/* East-West Corridor (Vice City to Port Gellhorn) */}
                <path d="M 72,36 L 48,48 L 22,46" strokeDasharray="1.5 1.5" />
                {/* Northern Spur to Ambrosia */}
                <path d="M 48,48 L 48,20" />
              </g>
            )}

            {/* FAA Airspace Corridors */}
            {showFAA && (
              <g opacity="0.5">
                <circle cx="72" cy="36" r="14" fill="none" stroke="#7bd0ff" strokeWidth="0.3" strokeDasharray="1 1" />
                <circle cx="22" cy="46" r="10" fill="none" stroke="#7bd0ff" strokeWidth="0.3" strokeDasharray="1 1" />
                <line x1="72" y1="36" x2="22" y2="46" stroke="#7bd0ff" strokeWidth="0.4" strokeDasharray="2 2" />
                <text x="74" y="24" fill="#7bd0ff" fontSize="2" fontFamily="monospace">FAA AIRSPACE LEO-01</text>
              </g>
            )}

            {/* Interactive Sector Boundary Polygons */}
            {GIS_SECTORS.map((sector) => {
              const isSelected = sector.id === selectedSectorId;
              return (
                <path
                  key={sector.id}
                  d={sector.polygon}
                  fill={isSelected ? sector.color.replace('0.15', '0.35') : sector.color}
                  stroke={isSelected ? '#ffffff' : sector.strokeColor}
                  strokeWidth={isSelected ? '0.8' : '0.4'}
                  className="pointer-events-auto transition-all cursor-pointer hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSector(sector);
                  }}
                />
              );
            })}

            {/* Distance Measurement Line */}
            {measurePoints.length === 2 && (
              <g stroke="#e86c28" strokeWidth="0.8">
                <line
                  x1={measurePoints[0][0]}
                  y1={measurePoints[0][1]}
                  x2={measurePoints[1][0]}
                  y2={measurePoints[1][1]}
                  strokeDasharray="2 1"
                />
                <circle cx={measurePoints[0][0]} cy={measurePoints[0][1]} r="1" fill="#e86c28" />
                <circle cx={measurePoints[1][0]} cy={measurePoints[1][1]} r="1" fill="#e86c28" />
              </g>
            )}
          </svg>

          {/* Interactive Sector Center Pins */}
          {GIS_SECTORS.map((sector) => {
            const isSelected = sector.id === selectedSectorId;
            return (
              <div
                key={sector.id}
                style={{ top: `${sector.center[1]}%`, left: `${sector.center[0]}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSector(sector);
                  }}
                  className={`group relative flex items-center justify-center transition-transform ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  <span
                    className={`absolute w-8 h-8 rounded-full animate-ping opacity-30 ${
                      isSelected ? 'bg-[#ffb694]' : 'bg-[#7bd0ff]'
                    }`}
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shadow-lg ${
                      isSelected
                        ? 'bg-[#e86c28] border-white text-white'
                        : 'bg-[#10131a] border-[#7bd0ff] text-[#7bd0ff]'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Pin Label Tooltip */}
                  <div
                    className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono',monospace] font-bold border transition-opacity ${
                      isSelected
                        ? 'bg-[#e86c28] text-white border-white/60 shadow-md'
                        : 'bg-[#0b0e15]/90 text-[#e0e2ec] border-[#584238]/60 group-hover:opacity-100 opacity-90'
                    }`}
                  >
                    {sector.name}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Live HUD Crosshair overlay */}
        <div className="absolute top-3 left-3 bg-[#0b0e15]/90 border border-[#584238]/40 px-3 py-1.5 rounded font-['JetBrains_Mono',monospace] text-[10px] text-[#dfc0b3] space-y-1 pointer-events-none z-20">
          <div className="flex items-center gap-2">
            <span className="text-[#4edea3] font-bold">CURSOR HUD:</span>
            <span>{hoverCoords}</span>
          </div>
          <div className="flex items-center gap-2 text-[#a68b7f]">
            <span>GRID: X:{cursorPos.x}% Y:{cursorPos.y}%</span>
            <span>•</span>
            <span>ZOOM: {zoom.toFixed(2)}x</span>
          </div>
        </div>

        {/* Measurement Result Floating Badge */}
        {measureMode && (
          <div className="absolute top-3 right-3 bg-[#e86c28] text-white px-3 py-1.5 rounded text-xs font-['JetBrains_Mono',monospace] font-bold shadow-lg z-20 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">straighten</span>
            <span>
              {measurePoints.length === 0 && 'Click map to place Point A'}
              {measurePoints.length === 1 && 'Click map to place Point B'}
              {measurePoints.length === 2 && `Calculated Distance: ${calculatedDistance()} km`}
            </span>
          </div>
        )}

        {/* Legend / Compass Rose */}
        <div className="absolute bottom-3 right-3 bg-[#0b0e15]/90 border border-[#584238]/40 p-2 rounded text-[10px] font-['JetBrains_Mono',monospace] text-[#dfc0b3] flex items-center gap-3 z-20">
          <div className="flex flex-col items-center">
            <span className="text-[#ffb694] font-bold">▲ N</span>
            <span className="text-[#a68b7f] text-[8px]">000°</span>
          </div>
          <div className="border-l border-[#584238]/40 pl-2 space-y-0.5">
            <div>SCALE: 10km / grid</div>
            <div className="text-[#4edea3]">5 SECTORS DELINEATED</div>
          </div>
        </div>
      </div>

      {/* Selected Sector Telemetry Inspector Bar */}
      <div className="p-4 bg-[#10131a] border-t border-[#584238]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#ffb694] uppercase tracking-wider font-bold">
              {activeSector.district}
            </span>
            <span className="text-[#584238]">•</span>
            <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#4edea3]">
              AREA: {activeSector.areaKm2} km²
            </span>
            <span className="text-[#584238]">•</span>
            <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#7bd0ff]">
              ELEV: {activeSector.elevation}
            </span>
          </div>
          <h3 className="font-['Newsreader',serif] text-lg sm:text-xl text-[#e0e2ec]">
            {activeSector.name}
          </h3>
          <p className="text-xs text-[#dfc0b3] max-w-2xl">
            {activeSector.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onOpenDossier && (
            <button
              onClick={onOpenDossier}
              className="px-3.5 py-1.5 bg-[#e86c28] hover:bg-[#f97316] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <span>Read Full Dossier</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
