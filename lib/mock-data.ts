// ============================================================
// Verdant Ledger — Mock Data Layer
// /lib/mock-data.ts
// All pages read from this module. Same IDs/scores appear
// consistently across Marketplace and Passport pages.
// Swap the arrays for real API calls without changing page logic.
// ============================================================

export type ProjectCategory = 'FOREST' | 'SOLAR' | 'WIND' | 'BLUE_CARBON' | 'SOIL';
export type ProjectStatus = 'VERIFIED' | 'PENDING' | 'UNDER_REVIEW' | 'REJECTED';
export type EvidenceStatus = 'CONFIRMED' | 'PENDING' | 'FLAGGED';

// ─── Core Types ────────────────────────────────────────────
export interface Project {
  id: string;               // e.g. "CC-IND-00291"
  slug: string;             // URL-safe slug for routing
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  location: string;
  region: 'Asia' | 'Africa' | 'Latin America' | 'Europe' | 'Oceania' | 'North America';
  description: string;
  metaLine: string;         // one-line descriptor e.g. "40 MW ground-mount · grid-connected"
  evidenceScore: number;    // 0–100
  creditsAvailable: number; // tCO₂e
  creditsIssued: number;
  creditsRetired: number;
  pricePerCredit: number;   // USD
  currency: string;
  ownerOrg: string;
  ownerWallet: string;
  ownerVerified: boolean;
  txRef: string;
  issuedDate: string;       // ISO date string
  verifiedDate: string;
  trustScore: number;       // 0–100 composite
  tags: string[];
  marketRateRange?: string;
}

export interface EvidenceReport {
  projectId: string;
  satelliteScenes: number;
  satelliteDateRange: string;   // e.g. "Jan 2021 – Dec 2023"
  mrvVersion: string;           // e.g. "v2.1"
  mrvSigned: boolean;
  mrvMethodology: string;
  verifierOrg: string;
  verifierDate: string;
  aiAnomalyCount: number;
  aiDoubleCountFlags: number;
  canopyDelta: string;          // e.g. "+12.4%"
  ndviDelta: string;            // e.g. "+0.18"
  deforestationFlags: number;
  beforeYear: number;
  afterYear: number;
  beforeNdviAvg: number;
  afterNdviAvg: number;
  notes: string;
}

export interface LedgerEvent {
  projectId: string;
  blockNumber: number;
  action: 'MINT' | 'TRANSFER' | 'RETIRE' | 'AUDIT' | 'UPDATE';
  deltaAmount: number;          // positive = added, negative = burned
  runningBalance: number;
  from: string | null;          // wallet address or null for mint
  to: string | null;
  txHash: string;
  timestamp: string;
  label?: string;               // human-readable label
}

export interface CreditBatch {
  projectId: string;
  batchId: string;
  totalIssued: number;
  holders: BatchHolder[];
}

export interface BatchHolder {
  label: string;
  wallet: string;
  amount: number;
  percentage: number;
}

// ─── Seed Data ─────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'CC-IND-00291',
    slug: 'sundarbans-mangrove-restoration',
    name: 'Sundarbans Mangrove Restoration',
    category: 'BLUE_CARBON',
    status: 'VERIFIED',
    location: 'West Bengal, India',
    region: 'Asia',
    description:
      'Large-scale mangrove reforestation across 8,400 hectares of degraded coastal wetlands in the Sundarbans delta. Blue-carbon sequestration verified with bi-annual satellite monitoring.',
    metaLine: '8,400 ha coastal mangrove · blue-carbon',
    evidenceScore: 91,
    creditsAvailable: 14200,
    creditsIssued: 22800,
    creditsRetired: 8600,
    pricePerCredit: 1550,
    currency: 'INR',
    ownerOrg: 'GreenSeal Ventures',
    ownerWallet: '0x3f7E...9c14',
    ownerVerified: true,
    txRef: '0x1a4b8c2d9e7f3a1b4c8d2e9f3a1b4c8d2e9f3a1b4c8d2e9f3a1b4c8d2e9f3a',
    issuedDate: '2023-03-15',
    verifiedDate: '2023-04-02',
    trustScore: 91,
    tags: ['blue-carbon', 'mangrove', 'coastal', 'India'],
  },
  {
    id: 'CC-AUS-00072',
    slug: 'pilbara-soil-carbon',
    name: 'Pilbara Regenerative Agriculture',
    category: 'SOIL',
    status: 'VERIFIED',
    location: 'Pilbara, Western Australia',
    region: 'Oceania',
    description:
      'Soil carbon sequestration through holistic grazing management across 1.2M ha of pastoral land. Third-party verified with bi-annual soil core sampling.',
    metaLine: '1.2M ha pastoral · holistic grazing',
    evidenceScore: 89,
    creditsAvailable: 7100,
    creditsIssued: 12200,
    creditsRetired: 5100,
    pricePerCredit: 2750,
    currency: 'INR',
    ownerOrg: 'OutbackCarbon Pty',
    ownerWallet: '0x4dF9...7b38',
    ownerVerified: true,
    txRef: '0x4df97b38c2a1e4b7d9f2c5a8e1b4d7f9c2a5e8b1d4f7c9a2e5b8d1f4c7a9e2b5',
    issuedDate: '2023-05-10',
    verifiedDate: '2023-05-28',
    trustScore: 89,
    tags: ['soil-carbon', 'agriculture', 'Australia'],
  },
  {
    id: 'CC-IND-00447',
    slug: 'rajasthan-solar-grid',
    name: 'Rajasthan Solar Displacement Grid',
    category: 'SOLAR',
    status: 'VERIFIED',
    location: 'Rajasthan, India',
    region: 'Asia',
    description:
      '40 MW ground-mount solar array displacing coal-fired generation. Grid-connected with real-time metering and IREC-certified measurement & reporting.',
    metaLine: '40 MW ground-mount · grid-connected',
    evidenceScore: 87,
    creditsAvailable: 9800,
    creditsIssued: 18400,
    creditsRetired: 8600,
    pricePerCredit: 1200,
    currency: 'INR',
    ownerOrg: 'SolarPath India',
    ownerWallet: '0x7eA1...b82F',
    ownerVerified: true,
    txRef: '0x7e1a4b8c2d9e7f3a1b4c8d2e9f3a1b4c8d2e9f3a1b4c8d2e9f3a1b4c8d2e9f',
    issuedDate: '2023-06-01',
    verifiedDate: '2023-06-18',
    trustScore: 87,
    tags: ['solar', 'renewable', 'grid', 'India'],
    marketRateRange: 'Average India market rate: ₹900 – ₹1,400 per tCO₂e',
  },
  {
    id: 'CC-KEN-00113',
    slug: 'aberdare-community-forest',
    name: 'Aberdare Community Reforestation',
    category: 'FOREST',
    status: 'VERIFIED',
    location: 'Aberdare Range, Kenya',
    region: 'Africa',
    description:
      'Community-led native tree planting across 3,200 ha of degraded highland forest buffer zones. Smallholder co-benefit and biodiversity uplift verified by Gold Standard.',
    metaLine: '3,200 ha highland forest · smallholder co-benefit',
    evidenceScore: 83,
    creditsAvailable: 6400,
    creditsIssued: 11000,
    creditsRetired: 4600,
    pricePerCredit: 1800,
    currency: 'INR',
    ownerOrg: 'AfriCarbon Trust',
    ownerWallet: '0x2cB3...d47A',
    ownerVerified: true,
    txRef: '0x2cb34d47a8f1e2b39c56d47a8f1e2b39c56d47a8f1e2b39c56d47a8f1e2b39c',
    issuedDate: '2023-01-22',
    verifiedDate: '2023-02-08',
    trustScore: 83,
    tags: ['reforestation', 'community', 'Africa', 'Gold Standard'],
    marketRateRange: 'Average India market rate: ₹1,200 – ₹2,200 per tCO₂e',
  },
  {
    id: 'CC-BRA-00508',
    slug: 'amazon-parana-redd',
    name: 'Amazon Paraná REDD+ Protection',
    category: 'FOREST',
    status: 'PENDING',
    location: 'Pará, Brazil',
    region: 'Latin America',
    description:
      'Avoided deforestation REDD+ project covering 67,000 ha of primary Amazon rainforest. Pending re-verification cycle; last satellite pass flagged 2 boundary anomalies under review.',
    metaLine: '67,000 ha primary forest · REDD+ avoided deforestation',
    evidenceScore: 64,
    creditsAvailable: 31000,
    creditsIssued: 54000,
    creditsRetired: 23000,
    pricePerCredit: 8.5,
    currency: 'INR',
    ownerOrg: 'Floresta Verde S.A.',
    ownerWallet: '0x9fC8...e201',
    ownerVerified: false,
    txRef: '0x9fc8e201a3b5c7d9f1e3a5b7c9d1f3e5a7b9c1d3f5e7a9b1c3d5f7e9a1b3c5d7',
    issuedDate: '2022-11-30',
    verifiedDate: '2023-09-15',
    trustScore: 64,
    tags: ['REDD+', 'Amazon', 'avoided-deforestation', 'Brazil'],
  },
  {
    id: 'CC-CHI-00334',
    slug: 'atacama-wind-corridor',
    name: 'Atacama Wind Corridor',
    category: 'WIND',
    status: 'UNDER_REVIEW',
    location: 'Atacama Desert, Chile',
    region: 'Latin America',
    description:
      '280 MW onshore wind farm in the Atacama corridor. Additionality under review after grid mix reclassification; new MRV cycle scheduled Q2 2025.',
    metaLine: '280 MW onshore wind · additionality review',
    evidenceScore: 71,
    creditsAvailable: 19500,
    creditsIssued: 38000,
    creditsRetired: 18500,
    pricePerCredit: 6.75,
    currency: 'INR',
    ownerOrg: 'VientoLimpio SpA',
    ownerWallet: '0x6aE5...c912',
    ownerVerified: true,
    txRef: '0x6ae5c912b3d4f6a8e1c3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7',
    issuedDate: '2022-09-01',
    verifiedDate: '2024-01-12',
    trustScore: 71,
    tags: ['wind', 'Chile', 'additionality'],
  },
];

export const EVIDENCE_REPORTS: EvidenceReport[] = [
  {
    projectId: 'CC-IND-00291',
    satelliteScenes: 47,
    satelliteDateRange: 'Jan 2021 – Dec 2023',
    mrvVersion: 'v2.1',
    mrvSigned: true,
    mrvMethodology: 'VM0033 Methodology for Tidal Wetland and Seagrass Restoration',
    verifierOrg: 'Verra Gold Standard',
    verifierDate: '2023-03-28',
    aiAnomalyCount: 1,
    aiDoubleCountFlags: 0,
    canopyDelta: '+18.7%',
    ndviDelta: '+0.23',
    deforestationFlags: 0,
    beforeYear: 2021,
    afterYear: 2023,
    beforeNdviAvg: 0.41,
    afterNdviAvg: 0.64,
    notes:
      'Satellite data is an evidence layer — not a substitute for official carbon-credit certification.',
  },
  {
    projectId: 'CC-IND-00447',
    satelliteScenes: 31,
    satelliteDateRange: 'Jun 2022 – May 2023',
    mrvVersion: 'v1.4',
    mrvSigned: true,
    mrvMethodology: 'AMS-I.D Methodology for Grid-Connected Renewable Electricity Generation',
    verifierOrg: 'DNV Energy',
    verifierDate: '2023-06-12',
    aiAnomalyCount: 0,
    aiDoubleCountFlags: 0,
    canopyDelta: 'N/A',
    ndviDelta: 'N/A',
    deforestationFlags: 0,
    beforeYear: 2022,
    afterYear: 2023,
    beforeNdviAvg: 0.18,
    afterNdviAvg: 0.19,
    notes:
      'Satellite data is an evidence layer — not a substitute for official carbon-credit certification.',
  },
  {
    projectId: 'CC-KEN-00113',
    satelliteScenes: 28,
    satelliteDateRange: 'Mar 2021 – Feb 2023',
    mrvVersion: 'v1.7',
    mrvSigned: true,
    mrvMethodology: 'AR-AM0014 Afforestation/Reforestation of Degraded Land',
    verifierOrg: 'Gold Standard Foundation',
    verifierDate: '2023-02-01',
    aiAnomalyCount: 2,
    aiDoubleCountFlags: 0,
    canopyDelta: '+12.4%',
    ndviDelta: '+0.18',
    deforestationFlags: 1,
    beforeYear: 2021,
    afterYear: 2023,
    beforeNdviAvg: 0.29,
    afterNdviAvg: 0.47,
    notes:
      'Satellite data is an evidence layer — not a substitute for official carbon-credit certification.',
  },
  {
    projectId: 'CC-BRA-00508',
    satelliteScenes: 62,
    satelliteDateRange: 'Jan 2020 – Sep 2023',
    mrvVersion: 'v3.0',
    mrvSigned: false,
    mrvMethodology: 'VM0015 Methodology for Avoided Unplanned Deforestation',
    verifierOrg: 'SCS Global (pending)',
    verifierDate: '2023-09-10',
    aiAnomalyCount: 6,
    aiDoubleCountFlags: 2,
    canopyDelta: '-1.2%',
    ndviDelta: '-0.04',
    deforestationFlags: 2,
    beforeYear: 2020,
    afterYear: 2023,
    beforeNdviAvg: 0.71,
    afterNdviAvg: 0.67,
    notes:
      'Satellite data is an evidence layer — not a substitute for official carbon-credit certification.',
  },
  {
    projectId: 'CC-AUS-00072',
    satelliteScenes: 19,
    satelliteDateRange: 'Sep 2021 – Apr 2023',
    mrvVersion: 'v2.3',
    mrvSigned: true,
    mrvMethodology: 'ERF Soil Carbon Method 2021',
    verifierOrg: 'Clean Energy Regulator (AUS)',
    verifierDate: '2023-05-22',
    aiAnomalyCount: 0,
    aiDoubleCountFlags: 0,
    canopyDelta: '+4.1%',
    ndviDelta: '+0.09',
    deforestationFlags: 0,
    beforeYear: 2021,
    afterYear: 2023,
    beforeNdviAvg: 0.22,
    afterNdviAvg: 0.31,
    notes:
      'Satellite data is an evidence layer — not a substitute for official carbon-credit certification.',
  },
  {
    projectId: 'CC-CHI-00334',
    satelliteScenes: 24,
    satelliteDateRange: 'Oct 2022 – Dec 2023',
    mrvVersion: 'v1.1',
    mrvSigned: true,
    mrvMethodology: 'AMS-I.D Grid-Connected Renewable Electricity Generation',
    verifierOrg: 'Bureau Veritas (under review)',
    verifierDate: '2024-01-08',
    aiAnomalyCount: 3,
    aiDoubleCountFlags: 1,
    canopyDelta: 'N/A',
    ndviDelta: 'N/A',
    deforestationFlags: 0,
    beforeYear: 2022,
    afterYear: 2023,
    beforeNdviAvg: 0.09,
    afterNdviAvg: 0.09,
    notes:
      'Satellite data is an evidence layer — not a substitute for official carbon-credit certification.',
  },
];

export const LEDGER_EVENTS: LedgerEvent[] = [
  // CC-IND-00291
  { projectId: 'CC-IND-00291', blockNumber: 18432100, action: 'MINT', deltaAmount: 22800, runningBalance: 22800, from: null, to: '0x3f7E...9c14', txHash: '0x1a4b...3a1b', timestamp: '2023-04-02T08:14:33Z', label: 'Initial Mint' },
  { projectId: 'CC-IND-00291', blockNumber: 18450300, action: 'TRANSFER', deltaAmount: -5000, runningBalance: 17800, from: '0x3f7E...9c14', to: '0xCorp...AaBb', txHash: '0x2b5c...4b2c', timestamp: '2023-05-14T11:22:10Z', label: 'Corporate Purchase' },
  { projectId: 'CC-IND-00291', blockNumber: 18510000, action: 'RETIRE', deltaAmount: -3600, runningBalance: 14200, from: '0xCorp...AaBb', to: null, txHash: '0x3c6d...5c3d', timestamp: '2023-07-30T09:00:00Z', label: 'Offset Retirement' },
  { projectId: 'CC-IND-00291', blockNumber: 18600000, action: 'AUDIT', deltaAmount: 0, runningBalance: 14200, from: null, to: null, txHash: '0x4d7e...6d4e', timestamp: '2023-09-15T14:30:00Z', label: 'Annual Audit' },

  // CC-IND-00447
  { projectId: 'CC-IND-00447', blockNumber: 18550000, action: 'MINT', deltaAmount: 18400, runningBalance: 18400, from: null, to: '0x7eA1...b82F', txHash: '0x7e1a...b82f', timestamp: '2023-06-18T10:00:00Z', label: 'Initial Mint' },
  { projectId: 'CC-IND-00447', blockNumber: 18570000, action: 'TRANSFER', deltaAmount: -8600, runningBalance: 9800, from: '0x7eA1...b82F', to: '0xBuyr...C3d4', txHash: '0x8f2b...c93g', timestamp: '2023-08-01T12:15:00Z', label: 'Bulk Sale' },

  // CC-KEN-00113
  { projectId: 'CC-KEN-00113', blockNumber: 18200000, action: 'MINT', deltaAmount: 11000, runningBalance: 11000, from: null, to: '0x2cB3...d47A', txHash: '0x2cb3...d47a', timestamp: '2023-02-08T09:30:00Z', label: 'Initial Mint' },
  { projectId: 'CC-KEN-00113', blockNumber: 18220000, action: 'TRANSFER', deltaAmount: -2000, runningBalance: 9000, from: '0x2cB3...d47A', to: '0xImpA...1122', txHash: '0xabc1...def2', timestamp: '2023-03-20T11:00:00Z', label: 'Impact Fund Purchase' },
  { projectId: 'CC-KEN-00113', blockNumber: 18310000, action: 'RETIRE', deltaAmount: -2600, runningBalance: 6400, from: '0xImpA...1122', to: null, txHash: '0xbcd2...ef34', timestamp: '2023-06-01T08:00:00Z', label: 'ESG Offset' },
  { projectId: 'CC-KEN-00113', blockNumber: 18400000, action: 'AUDIT', deltaAmount: 0, runningBalance: 6400, from: null, to: null, txHash: '0xcde3...f045', timestamp: '2023-08-18T16:00:00Z', label: 'Third-Party Audit' },

  // CC-BRA-00508
  { projectId: 'CC-BRA-00508', blockNumber: 17900000, action: 'MINT', deltaAmount: 54000, runningBalance: 54000, from: null, to: '0x9fC8...e201', txHash: '0x9fc8...e201', timestamp: '2022-12-01T00:00:00Z', label: 'Initial Mint' },
  { projectId: 'CC-BRA-00508', blockNumber: 18000000, action: 'TRANSFER', deltaAmount: -23000, runningBalance: 31000, from: '0x9fC8...e201', to: '0xRetd...5566', txHash: '0xdef4...0156', timestamp: '2023-02-15T09:00:00Z', label: 'Offset Retirement' },
  { projectId: 'CC-BRA-00508', blockNumber: 18500000, action: 'UPDATE', deltaAmount: 0, runningBalance: 31000, from: null, to: null, txHash: '0xefg5...1267', timestamp: '2023-09-15T14:00:00Z', label: 'Re-verification Trigger' },
];

export const CREDIT_BATCHES: CreditBatch[] = [
  {
    projectId: 'CC-IND-00291',
    batchId: 'BATCH-IND-291-A',
    totalIssued: 22800,
    holders: [
      { label: 'GreenSeal Ventures (Originator)', wallet: '0x3f7E...9c14', amount: 14200, percentage: 62 },
      { label: 'Corporate Buyer (Active)', wallet: '0xCorp...AaBb', amount: 1400, percentage: 6 },
      { label: 'Retired (Offset Claims)', wallet: '0x0000...0000', amount: 7200, percentage: 32 },
    ],
  },
  {
    projectId: 'CC-KEN-00113',
    batchId: 'BATCH-KEN-113-A',
    totalIssued: 11000,
    holders: [
      { label: 'AfriCarbon Trust (Originator)', wallet: '0x2cB3...d47A', amount: 6400, percentage: 58 },
      { label: 'Impact Fund Alpha', wallet: '0xImpA...1122', amount: 0, percentage: 0 },
      { label: 'Retired (ESG Claims)', wallet: '0x0000...0000', amount: 4600, percentage: 42 },
    ],
  },
];

// ─── Dashboard Stats (Marketplace right rail) ───────────────
export const DASHBOARD_STATS = {
  liveProjects: 24,
  avgEvidenceScore: 81,
  pendingReVerification: 3,
  retiredThisMonth: 12400, // tCO₂e
};

// ─── Helpers ────────────────────────────────────────────────
export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id || p.slug === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug || p.id === slug);
}

export function getEvidenceReport(projectId: string): EvidenceReport | undefined {
  return EVIDENCE_REPORTS.find((r) => r.projectId === projectId);
}

export function getLedgerEvents(projectId: string): LedgerEvent[] {
  return LEDGER_EVENTS.filter((e) => e.projectId === projectId);
}

export function getCreditBatch(projectId: string): CreditBatch | undefined {
  return CREDIT_BATCHES.find((b) => b.projectId === projectId);
}

export function scoreColor(score: number): 'mint' | 'cyan' | 'amber' | 'coral' {
  if (score >= 85) return 'mint';
  if (score >= 60) return 'cyan';
  if (score >= 40) return 'amber';
  return 'coral';
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

export function statusLabel(status: ProjectStatus): string {
  switch (status) {
    case 'VERIFIED': return 'Verified';
    case 'PENDING': return 'Pending';
    case 'UNDER_REVIEW': return 'Under Review';
    case 'REJECTED': return 'Rejected';
  }
}
