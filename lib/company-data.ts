// ============================================================
// Verdant Ledger — B2B Company Dashboard Data Layer
// /lib/company-data.ts
// Supabase-ready architecture for B2B carbon management.
// ============================================================

import { PROJECTS, Project } from './mock-data';

export interface Company {
  id: string;
  name: string;
  industry: string;
  logo: string; // Avatar initial or SVG asset
  email: string;
  joinedDate: string;
  verified: boolean;
  
  // Dashboard Overview
  creditsPurchased: number; // tCO₂e
  creditsRetired: number;   // tCO₂e
  totalSpentINR: number;    // ₹
  carbonImpact: number;     // tCO₂e
  availableCredits: number; // tCO₂e

  // Carbon Impact Progress
  annualTarget: number;     // tCO₂e
  achievedTarget: number;   // tCO₂e
  
  // Monthly progress history for line chart
  monthlyProgress: { month: string; offset: number; target: number }[];

  // Transactions
  transactions: CompanyTransaction[];

  // Projects Invested In IDs
  investedProjectIds: string[];
}

export interface CompanyTransaction {
  id: string;
  type: 'Purchase' | 'Retirement' | 'Transfer';
  projectId: string;
  projectName: string;
  credits: number;       // tCO₂e
  amountINR: number;     // ₹
  date: string;          // YYYY-MM-DD
  status: 'Completed' | 'Processing' | 'Retired';
  txHash: string;
}

// ─── 8 Seed Companies Data ─────────────────────────────────
export const COMPANIES: Company[] = [
  {
    id: 'comp-ecofuture',
    name: 'EcoFuture Industries',
    industry: 'Manufacturing & Heavy Industry',
    logo: '🏭',
    email: 'ecofuture@verdantledger.io',
    joinedDate: '2023-01-15',
    verified: true,
    creditsPurchased: 5000,
    creditsRetired: 2000,
    totalSpentINR: 12500000,
    carbonImpact: 2000,
    availableCredits: 3000,
    annualTarget: 10000,
    achievedTarget: 6500,
    monthlyProgress: [
      { month: 'Jan', offset: 800, target: 830 },
      { month: 'Feb', offset: 1600, target: 1660 },
      { month: 'Mar', offset: 2700, target: 2500 },
      { month: 'Apr', offset: 3600, target: 3330 },
      { month: 'May', offset: 4800, target: 4160 },
      { month: 'Jun', offset: 5400, target: 5000 },
      { month: 'Jul', offset: 6500, target: 5830 },
    ],
    investedProjectIds: ['CC-IND-00291', 'CC-IND-00447', 'CC-AUS-00072'],
    transactions: [
      {
        id: 'tx-eco-101',
        type: 'Purchase',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 2000,
        amountINR: 3100000,
        date: '2023-02-10',
        status: 'Completed',
        txHash: '0x1a4b8c2d9e7f3a1b4c8d2e9f3a1b4c8d2e9f3a1b4c8d2e9f',
      },
      {
        id: 'tx-eco-102',
        type: 'Purchase',
        projectId: 'CC-IND-00447',
        projectName: 'Rajasthan Solar Displacement Grid',
        credits: 2000,
        amountINR: 2400000,
        date: '2023-04-18',
        status: 'Completed',
        txHash: '0x7e1a4b8c2d9e7f3a1b4c8d2e9f3a1b4c8d2e9f3a1b4c8d2e',
      },
      {
        id: 'tx-eco-103',
        type: 'Retirement',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 1000,
        amountINR: 0,
        date: '2023-05-20',
        status: 'Retired',
        txHash: '0x3c6d5c3d4e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      },
      {
        id: 'tx-eco-104',
        type: 'Purchase',
        projectId: 'CC-AUS-00072',
        projectName: 'Pilbara Regenerative Agriculture',
        credits: 1000,
        amountINR: 2750000,
        date: '2023-06-15',
        status: 'Completed',
        txHash: '0x4df97b38c2a1e4b7d9f2c5a8e1b4d7f9c2a5e8b1',
      },
      {
        id: 'tx-eco-105',
        type: 'Retirement',
        projectId: 'CC-IND-00447',
        projectName: 'Rajasthan Solar Displacement Grid',
        credits: 1000,
        amountINR: 0,
        date: '2023-07-01',
        status: 'Retired',
        txHash: '0x8f2bc93g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w',
      },
    ],
  },
  {
    id: 'comp-greenfinity',
    name: 'Greenfinity Pvt. Ltd.',
    industry: 'Technology & Cloud Infrastructure',
    logo: '💻',
    email: 'greenfinity@verdantledger.io',
    joinedDate: '2023-02-01',
    verified: true,
    creditsPurchased: 8400,
    creditsRetired: 4200,
    totalSpentINR: 14760000,
    carbonImpact: 4200,
    availableCredits: 4200,
    annualTarget: 12000,
    achievedTarget: 8400,
    monthlyProgress: [
      { month: 'Jan', offset: 1200, target: 1000 },
      { month: 'Feb', offset: 2400, target: 2000 },
      { month: 'Mar', offset: 3800, target: 3000 },
      { month: 'Apr', offset: 5000, target: 4000 },
      { month: 'May', offset: 6200, target: 5000 },
      { month: 'Jun', offset: 7400, target: 6000 },
      { month: 'Jul', offset: 8400, target: 7000 },
    ],
    investedProjectIds: ['CC-IND-00447', 'CC-KEN-00113', 'CC-IND-00291'],
    transactions: [
      {
        id: 'tx-gf-201',
        type: 'Purchase',
        projectId: 'CC-IND-00447',
        projectName: 'Rajasthan Solar Displacement Grid',
        credits: 4000,
        amountINR: 4800000,
        date: '2023-03-01',
        status: 'Completed',
        txHash: '0x9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
      },
      {
        id: 'tx-gf-202',
        type: 'Purchase',
        projectId: 'CC-KEN-00113',
        projectName: 'Aberdare Community Reforestation',
        credits: 2400,
        amountINR: 4320000,
        date: '2023-04-12',
        status: 'Completed',
        txHash: '0x2cb34d47a8f1e2b39c56d47a8f1e2b39c56d47a8',
      },
      {
        id: 'tx-gf-203',
        type: 'Retirement',
        projectId: 'CC-IND-00447',
        projectName: 'Rajasthan Solar Displacement Grid',
        credits: 2400,
        amountINR: 0,
        date: '2023-05-18',
        status: 'Retired',
        txHash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
      },
      {
        id: 'tx-gf-204',
        type: 'Purchase',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 2000,
        amountINR: 3100000,
        date: '2023-06-22',
        status: 'Completed',
        txHash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c',
      },
      {
        id: 'tx-gf-205',
        type: 'Retirement',
        projectId: 'CC-KEN-00113',
        projectName: 'Aberdare Community Reforestation',
        credits: 1800,
        amountINR: 0,
        date: '2023-07-15',
        status: 'Retired',
        txHash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      },
    ],
  },
  {
    id: 'comp-terranova',
    name: 'TerraNova Solutions',
    industry: 'Infrastructure & Real Estate',
    logo: '🏗️',
    email: 'terranova@verdantledger.io',
    joinedDate: '2023-03-10',
    verified: true,
    creditsPurchased: 6200,
    creditsRetired: 3100,
    totalSpentINR: 11990000,
    carbonImpact: 3100,
    availableCredits: 3100,
    annualTarget: 8000,
    achievedTarget: 6200,
    monthlyProgress: [
      { month: 'Jan', offset: 900, target: 660 },
      { month: 'Feb', offset: 1800, target: 1330 },
      { month: 'Mar', offset: 2700, target: 2000 },
      { month: 'Apr', offset: 3800, target: 2660 },
      { month: 'May', offset: 4800, target: 3330 },
      { month: 'Jun', offset: 5600, target: 4000 },
      { month: 'Jul', offset: 6200, target: 4660 },
    ],
    investedProjectIds: ['CC-AUS-00072', 'CC-KEN-00113'],
    transactions: [
      {
        id: 'tx-tn-301',
        type: 'Purchase',
        projectId: 'CC-AUS-00072',
        projectName: 'Pilbara Regenerative Agriculture',
        credits: 3000,
        amountINR: 8250000,
        date: '2023-03-25',
        status: 'Completed',
        txHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
      },
      {
        id: 'tx-tn-302',
        type: 'Purchase',
        projectId: 'CC-KEN-00113',
        projectName: 'Aberdare Community Reforestation',
        credits: 3200,
        amountINR: 5760000,
        date: '2023-05-10',
        status: 'Completed',
        txHash: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a',
      },
      {
        id: 'tx-tn-303',
        type: 'Retirement',
        projectId: 'CC-AUS-00072',
        projectName: 'Pilbara Regenerative Agriculture',
        credits: 3100,
        amountINR: 0,
        date: '2023-06-30',
        status: 'Retired',
        txHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
      },
    ],
  },
  {
    id: 'comp-blueleaf',
    name: 'BlueLeaf Enterprises',
    industry: 'Retail & Consumer Goods',
    logo: '🌿',
    email: 'blueleaf@verdantledger.io',
    joinedDate: '2023-04-05',
    verified: true,
    creditsPurchased: 4500,
    creditsRetired: 1500,
    totalSpentINR: 6975000,
    carbonImpact: 1500,
    availableCredits: 3000,
    annualTarget: 6000,
    achievedTarget: 4500,
    monthlyProgress: [
      { month: 'Jan', offset: 600, target: 500 },
      { month: 'Feb', offset: 1200, target: 1000 },
      { month: 'Mar', offset: 2000, target: 1500 },
      { month: 'Apr', offset: 2800, target: 2000 },
      { month: 'May', offset: 3400, target: 2500 },
      { month: 'Jun', offset: 4000, target: 3000 },
      { month: 'Jul', offset: 4500, target: 3500 },
    ],
    investedProjectIds: ['CC-IND-00291', 'CC-IND-00447'],
    transactions: [
      {
        id: 'tx-bl-401',
        type: 'Purchase',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 2500,
        amountINR: 3875000,
        date: '2023-04-15',
        status: 'Completed',
        txHash: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
      },
      {
        id: 'tx-bl-402',
        type: 'Purchase',
        projectId: 'CC-IND-00447',
        projectName: 'Rajasthan Solar Displacement Grid',
        credits: 2000,
        amountINR: 2400000,
        date: '2023-05-20',
        status: 'Completed',
        txHash: '0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
      },
      {
        id: 'tx-bl-403',
        type: 'Retirement',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 1500,
        amountINR: 0,
        date: '2023-06-12',
        status: 'Retired',
        txHash: '0x0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e',
      },
    ],
  },
  {
    id: 'comp-planetpositive',
    name: 'Planet Positive Co.',
    industry: 'Logistics & Global Supply Chain',
    logo: '🚚',
    email: 'planetpositive@verdantledger.io',
    joinedDate: '2023-02-18',
    verified: true,
    creditsPurchased: 9200,
    creditsRetired: 5500,
    totalSpentINR: 15640000,
    carbonImpact: 5500,
    availableCredits: 3700,
    annualTarget: 15000,
    achievedTarget: 9200,
    monthlyProgress: [
      { month: 'Jan', offset: 1400, target: 1250 },
      { month: 'Feb', offset: 2800, target: 2500 },
      { month: 'Mar', offset: 4200, target: 3750 },
      { month: 'Apr', offset: 5600, target: 5000 },
      { month: 'May', offset: 7000, target: 6250 },
      { month: 'Jun', offset: 8100, target: 7500 },
      { month: 'Jul', offset: 9200, target: 8750 },
    ],
    investedProjectIds: ['CC-IND-00291', 'CC-AUS-00072', 'CC-KEN-00113'],
    transactions: [
      {
        id: 'tx-pp-501',
        type: 'Purchase',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 4000,
        amountINR: 6200000,
        date: '2023-02-28',
        status: 'Completed',
        txHash: '0x1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f',
      },
      {
        id: 'tx-pp-502',
        type: 'Purchase',
        projectId: 'CC-AUS-00072',
        projectName: 'Pilbara Regenerative Agriculture',
        credits: 2200,
        amountINR: 6050000,
        date: '2023-04-05',
        status: 'Completed',
        txHash: '0x2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a',
      },
      {
        id: 'tx-pp-503',
        type: 'Purchase',
        projectId: 'CC-KEN-00113',
        projectName: 'Aberdare Community Reforestation',
        credits: 3000,
        amountINR: 5400000,
        date: '2023-05-15',
        status: 'Completed',
        txHash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      },
      {
        id: 'tx-pp-504',
        type: 'Retirement',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 3500,
        amountINR: 0,
        date: '2023-06-10',
        status: 'Retired',
        txHash: '0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
      },
      {
        id: 'tx-pp-505',
        type: 'Retirement',
        projectId: 'CC-AUS-00072',
        projectName: 'Pilbara Regenerative Agriculture',
        credits: 2000,
        amountINR: 0,
        date: '2023-07-02',
        status: 'Retired',
        txHash: '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
      },
    ],
  },
  {
    id: 'comp-sustainiq',
    name: 'SustainIQ Corp.',
    industry: 'Financial Services & Investment Banking',
    logo: '🏦',
    email: 'sustainiq@verdantledger.io',
    joinedDate: '2023-01-20',
    verified: true,
    creditsPurchased: 7600,
    creditsRetired: 3800,
    totalSpentINR: 12160000,
    carbonImpact: 3800,
    availableCredits: 3800,
    annualTarget: 10000,
    achievedTarget: 7600,
    monthlyProgress: [
      { month: 'Jan', offset: 1100, target: 830 },
      { month: 'Feb', offset: 2200, target: 1660 },
      { month: 'Mar', offset: 3300, target: 2500 },
      { month: 'Apr', offset: 4400, target: 3330 },
      { month: 'May', offset: 5500, target: 4160 },
      { month: 'Jun', offset: 6600, target: 5000 },
      { month: 'Jul', offset: 7600, target: 5830 },
    ],
    investedProjectIds: ['CC-IND-00447', 'CC-IND-00291'],
    transactions: [
      {
        id: 'tx-siq-601',
        type: 'Purchase',
        projectId: 'CC-IND-00447',
        projectName: 'Rajasthan Solar Displacement Grid',
        credits: 4600,
        amountINR: 5520000,
        date: '2023-02-15',
        status: 'Completed',
        txHash: '0x6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
      },
      {
        id: 'tx-siq-602',
        type: 'Purchase',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 3000,
        amountINR: 4650000,
        date: '2023-04-10',
        status: 'Completed',
        txHash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
      },
      {
        id: 'tx-siq-603',
        type: 'Retirement',
        projectId: 'CC-IND-00447',
        projectName: 'Rajasthan Solar Displacement Grid',
        credits: 3800,
        amountINR: 0,
        date: '2023-06-25',
        status: 'Retired',
        txHash: '0x8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
      },
    ],
  },
  {
    id: 'comp-carboncare',
    name: 'CarbonCare Pvt. Ltd.',
    industry: 'Energy & Utilities',
    logo: '⚡',
    email: 'carboncare@verdantledger.io',
    joinedDate: '2023-03-01',
    verified: true,
    creditsPurchased: 11000,
    creditsRetired: 6000,
    totalSpentINR: 17050000,
    carbonImpact: 6000,
    availableCredits: 5000,
    annualTarget: 16000,
    achievedTarget: 11000,
    monthlyProgress: [
      { month: 'Jan', offset: 1600, target: 1330 },
      { month: 'Feb', offset: 3200, target: 2660 },
      { month: 'Mar', offset: 4800, target: 4000 },
      { month: 'Apr', offset: 6400, target: 5330 },
      { month: 'May', offset: 8000, target: 6660 },
      { month: 'Jun', offset: 9500, target: 8000 },
      { month: 'Jul', offset: 11000, target: 9330 },
    ],
    investedProjectIds: ['CC-IND-00291', 'CC-IND-00447', 'CC-KEN-00113'],
    transactions: [
      {
        id: 'tx-cc-701',
        type: 'Purchase',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 5000,
        amountINR: 7750000,
        date: '2023-03-12',
        status: 'Completed',
        txHash: '0x9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
      },
      {
        id: 'tx-cc-702',
        type: 'Purchase',
        projectId: 'CC-IND-00447',
        projectName: 'Rajasthan Solar Displacement Grid',
        credits: 4000,
        amountINR: 4800000,
        date: '2023-04-25',
        status: 'Completed',
        txHash: '0x0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c',
      },
      {
        id: 'tx-cc-703',
        type: 'Purchase',
        projectId: 'CC-KEN-00113',
        projectName: 'Aberdare Community Reforestation',
        credits: 2000,
        amountINR: 3600000,
        date: '2023-05-30',
        status: 'Completed',
        txHash: '0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d',
      },
      {
        id: 'tx-cc-704',
        type: 'Retirement',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 4000,
        amountINR: 0,
        date: '2023-06-18',
        status: 'Retired',
        txHash: '0x2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e',
      },
      {
        id: 'tx-cc-705',
        type: 'Retirement',
        projectId: 'CC-IND-00447',
        projectName: 'Rajasthan Solar Displacement Grid',
        credits: 2000,
        amountINR: 0,
        date: '2023-07-10',
        status: 'Retired',
        txHash: '0x3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f',
      },
    ],
  },
  {
    id: 'comp-verdant',
    name: 'Verdant Capital',
    industry: 'Venture Capital & ESG Investment',
    logo: '💎',
    email: 'verdant@verdantledger.io',
    joinedDate: '2023-04-01',
    verified: true,
    creditsPurchased: 3800,
    creditsRetired: 1900,
    totalSpentINR: 7600000,
    carbonImpact: 1900,
    availableCredits: 1900,
    annualTarget: 5000,
    achievedTarget: 3800,
    monthlyProgress: [
      { month: 'Jan', offset: 500, target: 410 },
      { month: 'Feb', offset: 1000, target: 830 },
      { month: 'Mar', offset: 1600, target: 1250 },
      { month: 'Apr', offset: 2200, target: 1660 },
      { month: 'May', offset: 2800, target: 2080 },
      { month: 'Jun', offset: 3300, target: 2500 },
      { month: 'Jul', offset: 3800, target: 2910 },
    ],
    investedProjectIds: ['CC-AUS-00072', 'CC-IND-00291'],
    transactions: [
      {
        id: 'tx-vc-801',
        type: 'Purchase',
        projectId: 'CC-AUS-00072',
        projectName: 'Pilbara Regenerative Agriculture',
        credits: 2000,
        amountINR: 5500000,
        date: '2023-04-18',
        status: 'Completed',
        txHash: '0x4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a',
      },
      {
        id: 'tx-vc-802',
        type: 'Purchase',
        projectId: 'CC-IND-00291',
        projectName: 'Sundarbans Mangrove Restoration',
        credits: 1800,
        amountINR: 2790000,
        date: '2023-05-22',
        status: 'Completed',
        txHash: '0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
      },
      {
        id: 'tx-vc-803',
        type: 'Retirement',
        projectId: 'CC-AUS-00072',
        projectName: 'Pilbara Regenerative Agriculture',
        credits: 1900,
        amountINR: 0,
        date: '2023-06-28',
        status: 'Retired',
        txHash: '0x6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
      },
    ],
  },
];

// ─── Helper Functions ──────────────────────────────────────
export function getCompanyById(id: string): Company | undefined {
  return COMPANIES.find((c) => c.id === id);
}

export function getInvestedProjectsForCompany(company: Company): Project[] {
  return company.investedProjectIds
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined);
}

export function formatINR(amount: number): string {
  if (amount === 0) return '—';
  return '₹' + new Intl.NumberFormat('en-IN').format(amount);
}

export function formatCredits(credits: number): string {
  return new Intl.NumberFormat('en-IN').format(credits) + ' tCO₂e';
}
