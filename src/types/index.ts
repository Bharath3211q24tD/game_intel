export type ClaimStatus = 'CONFIRMED' | 'REPORTED' | 'SPECULATION' | 'DISPUTED' | 'UNKNOWN';

export type TaxonomyCategory = 
  | 'All'
  | 'World & Map'
  | 'Story & Protagonists'
  | 'Vehicles & Arsenal'
  | 'Game Mechanics'
  | 'Technical Engine (RAGE 9)';

export type CorpusType = 'GTA VI' | 'GTA V';

export interface Claim {
  id: string; // e.g., 'CLM-084'
  subject: string;
  corpus: CorpusType;
  status: ClaimStatus;
  primarySource: string;
  auditRef: string; // e.g. 'EVD-01'
  taxonomy: TaxonomyCategory;
  dateLogged: string;
  confidenceScore: number; // 0 - 100
  summary: string;
  corroboratingDetails: string[];
  secFilingRef?: string;
  patentRef?: string;
}

export interface RadarItem {
  id: string;
  category: string;
  status: ClaimStatus;
  title: string;
  description: string;
  source: string;
  auditRef: string;
  auditId: string;
  publishedTime: string;
  readTime: string;
  fullBody?: string;
}

export interface DispatchDossier {
  id: string;
  ref: string;
  status: ClaimStatus;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
  date: string;
  citationsCount: number;
  readTime: string;
  sections?: { heading: string; content: string }[];
}

export interface DatabaseEntity {
  id: string;
  name: string;
  category: 'CHARACTERS' | 'LOCATIONS' | 'VEHICLES & ARSENAL' | 'TECHNICAL SPECS';
  badge?: string;
  status: ClaimStatus;
  description: string;
  verifiedIn: string;
  tags: string[];
  metrics?: Record<string, string>;
  coordinates?: string;
}

export interface ComparativeMetric {
  id: string;
  feature: string;
  category: string;
  gtaV: string;
  gtaVI: string;
  verifiedSource: string;
  deltaNote: string;
}
