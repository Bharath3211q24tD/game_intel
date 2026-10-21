import React, { useState } from 'react';

interface TopHeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenFilter: () => void;
  onOpenArchive: () => void;
  onOpenChat: () => void;
  onOpenVeo: () => void;
  onOpenSearchGrounding: () => void;
  onOpenMapsGrounding: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenFilter,
  onOpenArchive,
  onOpenChat,
  onOpenVeo,
  onOpenSearchGrounding,
  onOpenMapsGrounding
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dispatches', label: 'Dispatches' },
    { id: 'trailer-scrubber', label: 'Trailer Scrubber' },
    { id: 'intelligence-hub', label: 'Intelligence Hub' },
    { id: 'database', label: 'Database' },
    { id: 'claim-tracker', label: 'Claim Tracker' },
    { id: 'standards', label: 'Methodology & Standards' }
  ];

  return (
    <header className="w-full bg-[#0b0e15]/95 border-b border-[#584238]/30 sticky top-0 z-40 backdrop-blur-md">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-[72px]">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectTab('dispatches')}
            className="group flex flex-col justify-center text-left focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#e86c28] rounded-xs transform rotate-45" />
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold tracking-tight text-[#e0e2ec]">
                GAMEINTEL
              </span>
            </div>
            <span className="text-[9px] font-['JetBrains_Mono',monospace] tracking-widest text-[#ffb694] uppercase mt-0.5 pl-4 font-semibold">
              Evidence Archive // Est. 2024
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 ml-4">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold uppercase tracking-wider transition-colors duration-150 py-1 ${
                    isActive
                      ? 'border-b-2 border-[#ffb694] text-[#ffb694]'
                      : 'text-[#dfc0b3] hover:text-[#e0e2ec]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Action Bar & Search & AI Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Bar */}
          <div
            onClick={onOpenSearch}
            className="relative hidden xl:flex items-center cursor-pointer group"
          >
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#a68b7f]">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </div>
            <div className="bg-[#10131a] border border-[#584238]/50 group-hover:border-[#e86c28] text-[#dfc0b3] text-xs font-['Plus_Jakarta_Sans',sans-serif] pl-8 pr-10 py-1.5 rounded w-52 transition-colors select-none flex items-center justify-between">
              <span className="text-[#dfc0b3]/60 truncate">Search evidence...</span>
              <kbd className="bg-[#1d2027] border border-[#584238]/40 text-[#dfc0b3] font-['JetBrains_Mono',monospace] text-[10px] px-1.5 py-0.5 rounded font-mono ml-1">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* AI Feature Action Strip */}
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenChat}
              className="p-1.5 rounded bg-[#1d2027] hover:bg-[#272a31] text-[#ffb694] border border-[#584238]/40 transition-colors flex items-center gap-1 text-xs px-2"
              title="Forensic Gemini Chatbot"
            >
              <span className="material-symbols-outlined text-[17px]">voice_chat</span>
              <span className="hidden sm:inline font-semibold">AI Analyst</span>
            </button>

            <button
              onClick={onOpenVeo}
              className="p-1.5 rounded bg-[#1d2027] hover:bg-[#272a31] text-[#7bd0ff] border border-[#584238]/40 transition-colors flex items-center gap-1 text-xs px-2"
              title="Animate Photo with Veo"
            >
              <span className="material-symbols-outlined text-[17px]">movie</span>
              <span className="hidden lg:inline font-semibold">Veo Video</span>
            </button>

            <button
              onClick={onOpenSearchGrounding}
              className="p-1.5 rounded bg-[#1d2027] hover:bg-[#272a31] text-[#e0e2ec] border border-[#584238]/40 transition-colors flex items-center gap-1 text-xs px-2"
              title="Google Search Grounding"
            >
              <span className="material-symbols-outlined text-[17px] text-[#ffb694]">travel_explore</span>
              <span className="hidden xl:inline">Search</span>
            </button>

            <button
              onClick={onOpenMapsGrounding}
              className="p-1.5 rounded bg-[#1d2027] hover:bg-[#272a31] text-[#4edea3] border border-[#584238]/40 transition-colors flex items-center gap-1 text-xs px-2"
              title="Google Maps Grounding"
            >
              <span className="material-symbols-outlined text-[17px]">pin_drop</span>
              <span className="hidden xl:inline">Maps</span>
            </button>
          </div>

          {/* Trailing Icon Actions */}
          <div className="flex items-center gap-1 text-[#dfc0b3]">
            <button
              onClick={onOpenSearch}
              className="xl:hidden p-1.5 rounded hover:bg-[#272a31] transition-colors"
              title="Search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button
              onClick={onOpenFilter}
              className="p-1.5 rounded hover:bg-[#272a31] transition-colors"
              title="Filter Records"
            >
              <span className="material-symbols-outlined text-[20px]">filter_alt</span>
            </button>
          </div>

          {/* Trailing Primary Action: "GTA VI / V Archive" */}
          <button
            onClick={onOpenArchive}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#272a31] hover:bg-[#363941] text-[#e0e2ec] border border-[#584238]/40 px-3 py-1.5 rounded font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffb694]">folder_open</span>
            <span>Diff</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded hover:bg-[#272a31] text-[#dfc0b3]"
            title="Menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#10131a] border-b border-[#584238]/40 px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded text-xs font-bold uppercase font-['Plus_Jakarta_Sans',sans-serif] tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[#e86c28]/20 text-[#ffb694] border border-[#e86c28]/40'
                    : 'text-[#dfc0b3] hover:bg-[#1d2027]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#584238]/30 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenChat();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#1d2027] text-[#ffb694] px-3 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[16px]">voice_chat</span>
              <span>Gemini Forensic Analyst</span>
            </button>
            <button
              onClick={() => {
                onOpenVeo();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#1d2027] text-[#7bd0ff] px-3 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[16px]">movie</span>
              <span>Animate Photo with Veo</span>
            </button>
            <button
              onClick={() => {
                onOpenArchive();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#272a31] text-[#e0e2ec] px-3 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffb694]">folder_open</span>
              <span>GTA VI / V Archive Diff</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
