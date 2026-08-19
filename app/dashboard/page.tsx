'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { CompanyList } from '@/components/dashboard/company-list';
import { CompanyLoginModal } from '@/components/dashboard/company-login-modal';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { ImpactProgress } from '@/components/dashboard/impact-progress';
import { ImpactChart } from '@/components/dashboard/impact-chart';
import { TransactionTable } from '@/components/dashboard/transaction-table';
import { InvestedProjects } from '@/components/dashboard/invested-projects';
import { Company, COMPANIES } from '@/lib/company-data';
import { ShieldCheck, Lock } from 'lucide-react';

export default function DashboardPage() {
  const [selectedCompanyForLogin, setSelectedCompanyForLogin] = useState<Company | null>(null);
  const [authenticatedCompany, setAuthenticatedCompany] = useState<Company | null>(null);

  const handleLoginSuccess = (company: Company) => {
    setAuthenticatedCompany(company);
    setSelectedCompanyForLogin(null);
  };

  const handleSignOut = () => {
    setAuthenticatedCompany(null);
  };

  return (
    <AppShell showFooter>
      <div className="container-max py-8 flex flex-col gap-8">
        {!authenticatedCompany ? (
          /* ── UNAUTHENTICATED STATE: COMPANY SELECTION ── */
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="pill pill-mint text-xs">B2B ENTERPRISE DASHBOARD</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Corporate Carbon Management
              </h1>
              <p className="text-sm text-gray-300 max-w-2xl">
                Select your organization below and authenticate to access private carbon-credit purchases, offset progress, transaction ledgers, and invested project passports.
              </p>
            </div>

            <CompanyList
              onSelectCompany={(comp) => setSelectedCompanyForLogin(comp)}
            />
          </div>
        ) : (
          /* ── AUTHENTICATED STATE: COMPANY DASHBOARD ── */
          <div className="flex flex-col gap-8" style={{ animation: 'slide-fade-in 300ms ease' }}>
            {/* Overview Header & 5 Stat Cards */}
            <DashboardOverview
              company={authenticatedCompany}
              onSignOut={handleSignOut}
            />

            {/* Impact Progress & Monthly Line Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ImpactProgress company={authenticatedCompany} />
              <ImpactChart company={authenticatedCompany} />
            </div>

            {/* Invested Projects */}
            <InvestedProjects company={authenticatedCompany} />

            {/* Transaction Table */}
            <TransactionTable transactions={authenticatedCompany.transactions} />
          </div>
        )}
      </div>

      {/* Login Modal */}
      <CompanyLoginModal
        company={selectedCompanyForLogin}
        onClose={() => setSelectedCompanyForLogin(null)}
        onLoginSuccess={handleLoginSuccess}
      />
    </AppShell>
  );
}
