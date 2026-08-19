'use client';

import { useState } from 'react';
import { CompanyTransaction, formatINR } from '@/lib/company-data';
import { MonoLabel } from '@/components/badge';
import { Copy, Check, ExternalLink, ArrowDownLeft, ArrowUpRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface TransactionTableProps {
  transactions: CompanyTransaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyHash = (id: string, hash: string) => {
    navigator.clipboard.writeText(hash).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const typeIcon = (type: CompanyTransaction['type']) => {
    switch (type) {
      case 'Purchase':
        return <ArrowDownLeft size={14} className="text-emerald-400" />;
      case 'Retirement':
        return <ArrowUpRight size={14} className="text-amber-400" />;
      case 'Transfer':
        return <RefreshCw size={14} className="text-cyan-400" />;
    }
  };

  const typePill = (type: CompanyTransaction['type']) => {
    switch (type) {
      case 'Purchase':
        return <span className="pill pill-mint text-[10px]">Purchase</span>;
      case 'Retirement':
        return <span className="pill pill-amber text-[10px]">Retirement</span>;
      case 'Transfer':
        return <span className="pill pill-cyan text-[10px]">Transfer</span>;
    }
  };

  return (
    <div className="card p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MonoLabel color="tertiary">RECENT TRANSACTION LEDGER</MonoLabel>
          <span className="pill pill-dim text-[10px]">VERIFIED AUDIT TRAIL</span>
        </div>
        <span className="text-xs text-gray-400 font-mono">
          {transactions.length} Transactions
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-gray-400">
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Project Name</th>
              <th className="py-3 px-4 text-right">Credits (tCO₂e)</th>
              <th className="py-3 px-4 text-right">Amount (₹)</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Blockchain Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/[0.03] transition-colors">
                {/* Type */}
                <td className="py-3.5 px-4 font-semibold">
                  <div className="flex items-center gap-2">
                    {typeIcon(tx.type)}
                    {typePill(tx.type)}
                  </div>
                </td>

                {/* Project */}
                <td className="py-3.5 px-4 font-medium text-white">
                  <Link
                    href={`/passport/${tx.projectId}`}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{tx.projectName}</span>
                    <ExternalLink size={12} className="text-gray-500" />
                  </Link>
                </td>

                {/* Credits */}
                <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                  {tx.credits.toLocaleString()}
                </td>

                {/* Amount */}
                <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">
                  {formatINR(tx.amountINR)}
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 text-xs text-gray-300 font-mono">
                  {tx.date}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                      tx.status === 'Completed'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : tx.status === 'Retired'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>

                {/* Blockchain Reference */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="mono-hash text-xs" title={tx.txHash}>
                      {tx.txHash.slice(0, 16)}...
                    </span>
                    <button
                      onClick={() => copyHash(tx.id, tx.txHash)}
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Copy transaction hash"
                    >
                      {copiedId === tx.id ? (
                        <Check size={13} className="text-emerald-400" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
