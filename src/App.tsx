/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopUtilityBar } from './components/TopUtilityBar';
import { TopHeader } from './components/TopHeader';
import { LiveTicker } from './components/LiveTicker';
import { HeroInvestigation } from './components/HeroInvestigation';
import { VerificationRadar } from './components/VerificationRadar';
import { ClaimIndexTable } from './components/ClaimIndexTable';
import { DispatchBento } from './components/DispatchBento';
import { DatabaseFastLookup } from './components/DatabaseFastLookup';
import { ComparativeSection } from './components/ComparativeSection';
import { MethodologySection } from './components/MethodologySection';
import { Footer } from './components/Footer';

// Views
import { TrailerScrubberView } from './components/views/TrailerScrubberView';
import { IntelligenceHubView } from './components/views/IntelligenceHubView';
import { DatabaseView } from './components/views/DatabaseView';
import { ClaimTrackerView } from './components/views/ClaimTrackerView';
import { StandardsView } from './components/views/StandardsView';

// Modals
import { CommandPalette } from './components/modals/CommandPalette';
import { DossierModal } from './components/modals/DossierModal';
import { EvidenceMatrixModal } from './components/modals/EvidenceMatrixModal';
import { AuditModal } from './components/modals/AuditModal';
import { ComparativeDiffModal } from './components/modals/ComparativeDiffModal';
import { EntityModal } from './components/modals/EntityModal';
import { TerminalModal } from './components/modals/TerminalModal';

// Features (AI Gemini & Veo)
import { VeoVideoModal } from './components/features/VeoVideoModal';
import { GeminiChatModal } from './components/features/GeminiChatModal';
import { SearchGroundingModal } from './components/features/SearchGroundingModal';
import { MapsGroundingModal } from './components/features/MapsGroundingModal';

// Data
import { LEAD_INVESTIGATION } from './data/mockData';
import { Claim, CorpusType, DatabaseEntity, DispatchDossier, RadarItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dispatches');
  const [activeCorpus, setActiveCorpus] = useState<CorpusType>('GTA VI');
  const [databaseCategory, setDatabaseCategory] = useState<string>('ALL');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState<DispatchDossier | null>(null);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [selectedAuditRef, setSelectedAuditRef] = useState<string | null>(null);
  const [selectedAuditClaim, setSelectedAuditClaim] = useState<Claim | null>(null);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<DatabaseEntity | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // New AI Feature Modals state
  const [isVeoOpen, setIsVeoOpen] = useState(false);
  const [veoInitialImage, setVeoInitialImage] = useState<string | undefined>(undefined);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchGroundingOpen, setIsSearchGroundingOpen] = useState(false);
  const [isMapsGroundingOpen, setIsMapsGroundingOpen] = useState(false);

  // Global shortcut for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCorpusChange = (corpus: CorpusType) => {
    setActiveCorpus(corpus);
    if (corpus === 'GTA V') {
      setIsDiffOpen(true);
    }
  };

  const handleOpenClaimAudit = (ref: string, claim?: Claim) => {
    setSelectedAuditRef(ref);
    setSelectedAuditClaim(claim || null);
  };

  const handleSelectRadarItem = (item: RadarItem) => {
    setSelectedAuditRef(item.auditId);
  };

  const handleSelectEntity = (entity: DatabaseEntity) => {
    setSelectedEntity(entity);
  };

  const handleViewFullDatabase = (category?: string) => {
    setDatabaseCategory(category || 'ALL');
    setActiveTab('database');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMethodologyClick = (_topic: string) => {
    setActiveTab('standards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVeo = (img?: string) => {
    setVeoInitialImage(img || LEAD_INVESTIGATION.imageUrl);
    setIsVeoOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0e15] text-[#e0e2ec] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 40px Top Utility Masthead */}
      <TopUtilityBar
        activeCorpus={activeCorpus}
        onCorpusChange={handleCorpusChange}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAuditDesk={() => {
          setActiveTab('standards');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 72px Primary Header with AI tools */}
      <TopHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFilter={() => setActiveTab('claim-tracker')}
        onOpenArchive={() => setIsDiffOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenVeo={() => handleOpenVeo()}
        onOpenSearchGrounding={() => setIsSearchGroundingOpen(true)}
        onOpenMapsGrounding={() => setIsMapsGroundingOpen(true)}
      />

      {/* Live Forensic Ticker Wire */}
      <LiveTicker onSelectClaimAudit={handleOpenClaimAudit} />

      {/* Main Editorial Canvas */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 space-y-12">
        {activeTab === 'dispatches' && (
          <>
            {/* HERO INVESTIGATION: 8-col Lead / 4-col Dossier Radar */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <HeroInvestigation
                onOpenDossier={() => setSelectedDossier(LEAD_INVESTIGATION)}
                onOpenMatrix={() => setIsMatrixOpen(true)}
                onOpenVeo={(img) => handleOpenVeo(img)}
                onSelectCoordinateCue={() => {
                  setActiveTab('trailer-scrubber');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <VerificationRadar
                onSelectRadarItem={handleSelectRadarItem}
                onSelectAudit={(auditId) => handleOpenClaimAudit(auditId)}
              />
            </section>

            {/* CLAIM VERIFICATION INDEX / INTERACTIVE TRIAGE BAR */}
            <ClaimIndexTable onSelectClaimAudit={handleOpenClaimAudit} />

            {/* BENTO GRID: FEATURED GTA VI RESEARCH HUB & FIELD DISPATCHES */}
            <DispatchBento
              onSelectDossier={(dossier) => setSelectedDossier(dossier)}
              onViewAllDispatches={() => setActiveTab('claim-tracker')}
            />

            {/* INTERACTIVE DATABASE FAST-LOOKUP MATRIX */}
            <DatabaseFastLookup
              onSelectEntity={handleSelectEntity}
              onViewFullDatabase={handleViewFullDatabase}
            />

            {/* GTA V COMPARATIVE BASELINE ARCHIVE */}
            <ComparativeSection
              onExploreGtaVArchive={() => {
                setActiveCorpus('GTA V');
                setIsDiffOpen(true);
              }}
              onLaunchDiff={() => setIsDiffOpen(true)}
            />

            {/* METHODOLOGY & EVIDENCE ASSURANCE BOX */}
            <MethodologySection
              onOpenRubric={() => {
                setActiveTab('standards');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {/* Dedicated View: Trailer Scrubber (Option 2) */}
        {activeTab === 'trailer-scrubber' && (
          <TrailerScrubberView
            onSelectAudit={(ref) => handleOpenClaimAudit(ref)}
            onOpenVeo={(img) => handleOpenVeo(img)}
          />
        )}

        {/* Dedicated View: Intelligence Hub (Cartography Map) */}
        {activeTab === 'intelligence-hub' && (
          <IntelligenceHubView
            onOpenDossier={() => setSelectedDossier(LEAD_INVESTIGATION)}
            onOpenMatrix={() => setIsMatrixOpen(true)}
          />
        )}

        {/* Dedicated View: Database Archive */}
        {activeTab === 'database' && (
          <DatabaseView
            initialCategory={databaseCategory}
            onSelectEntity={handleSelectEntity}
          />
        )}

        {/* Dedicated View: Claim Tracker Table */}
        {activeTab === 'claim-tracker' && (
          <ClaimTrackerView onSelectClaimAudit={handleOpenClaimAudit} />
        )}

        {/* Dedicated View: Methodology & Standards */}
        {activeTab === 'standards' && (
          <StandardsView onOpenAudit={(ref) => handleOpenClaimAudit(ref)} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenMethodology={handleMethodologyClick}
        onOpenRegistry={(portal) => {
          if (portal === 'registry' || portal === 'research') {
            setActiveTab('claim-tracker');
          } else {
            setActiveTab('standards');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectClaim={(claim) => handleOpenClaimAudit(claim.auditRef, claim)}
        onSelectDossier={(dossier) => setSelectedDossier(dossier)}
        onSelectEntity={handleSelectEntity}
        onSelectRadar={handleSelectRadarItem}
      />

      <DossierModal
        dossier={selectedDossier}
        onClose={() => setSelectedDossier(null)}
        onOpenAudit={(ref) => handleOpenClaimAudit(ref)}
      />

      <EvidenceMatrixModal
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
        onSelectAudit={(ref) => handleOpenClaimAudit(ref)}
      />

      <AuditModal
        auditRef={selectedAuditRef}
        claim={selectedAuditClaim}
        onClose={() => {
          setSelectedAuditRef(null);
          setSelectedAuditClaim(null);
        }}
      />

      <ComparativeDiffModal
        isOpen={isDiffOpen}
        onClose={() => setIsDiffOpen(false)}
      />

      <EntityModal
        entity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
      />

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectAudit={(ref) => handleOpenClaimAudit(ref)}
      />

      {/* AI Modals */}
      <VeoVideoModal
        isOpen={isVeoOpen}
        onClose={() => setIsVeoOpen(false)}
        defaultImage={veoInitialImage}
      />

      <GeminiChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onSelectAudit={handleOpenClaimAudit}
      />

      <SearchGroundingModal
        isOpen={isSearchGroundingOpen}
        onClose={() => setIsSearchGroundingOpen(false)}
      />

      <MapsGroundingModal
        isOpen={isMapsGroundingOpen}
        onClose={() => setIsMapsGroundingOpen(false)}
      />
    </div>
  );
}
