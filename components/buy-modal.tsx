'use client';

import { useState, useEffect } from 'react';
import { X, Check, AlertTriangle } from 'lucide-react';
import { Project } from '@/lib/mock-data';

interface BuyModalProps {
  project: Project | null;
  onClose: () => void;
}

type Step = 'confirm' | 'processing' | 'success';

export function BuyModal({ project, onClose }: BuyModalProps) {
  const [step, setStep] = useState<Step>('confirm');
  const [quantity, setQuantity] = useState(100);

  useEffect(() => {
    if (project) setStep('confirm');
  }, [project]);

  if (!project) return null;

  const total = (quantity * project.pricePerCredit).toFixed(2);

  const handleConfirm = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(5,7,10,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="card relative w-full max-w-md mx-4"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.8)', border: '1px solid var(--border-hairline-lg)' }}
      >
        {/* Close */}
        <button
          id="modal-close"
          onClick={onClose}
          className="absolute top-4 right-4"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <X size={18} />
        </button>

        {step === 'confirm' && (
          <div className="p-6 flex flex-col gap-5">
            <div>
              <div className="font-mono-label mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                MOCK PURCHASE — NO REAL TRANSACTION
              </div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Buy Carbon Credits
              </h2>
            </div>

            {/* Project info */}
            <div className="card-alt p-4 flex flex-col gap-1.5">
              <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {project.name}
              </div>
              <div className="font-mono-label" style={{ color: 'var(--color-cyan)', fontSize: 10 }}>
                {project.id}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {project.location} · Evidence Score: {project.evidenceScore}/100
              </div>
            </div>

            {/* Quantity input */}
            <div className="flex flex-col gap-2">
              <label className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 10 }}>
                QUANTITY (tCO₂e)
              </label>
              <div
                className="flex items-center"
                style={{
                  background: 'var(--color-bg-panel-alt)',
                  border: '1px solid var(--border-hairline-lg)',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <button
                  className="px-4 py-3"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onClick={() => setQuantity(Math.max(1, quantity - 10))}
                >−</button>
                <input
                  type="number"
                  id="modal-quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 text-center stat-value text-lg py-3"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--color-text-primary)',
                  }}
                />
                <button
                  className="px-4 py-3"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onClick={() => setQuantity(quantity + 10)}
                >+</button>
              </div>
            </div>

            {/* Summary */}
            <div
              className="flex flex-col gap-2 p-4 rounded-xl"
              style={{ background: 'var(--color-bg-panel-alt)', border: '1px solid var(--border-hairline)' }}
            >
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--color-text-secondary)' }}>Unit price</span>
                <span style={{ color: 'var(--color-text-primary)' }}>
                  ₹{project.pricePerCredit.toLocaleString('en-IN')} / tCO₂e
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--color-text-secondary)' }}>Quantity</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{quantity.toLocaleString()} tCO₂e</span>
              </div>
              <div
                className="flex justify-between pt-2"
                style={{ borderTop: '1px solid var(--border-hairline)' }}
              >
                <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Total</span>
                <span className="stat-value font-bold text-lg" style={{ color: 'var(--color-mint)' }}>
                  ₹{Number(total).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <div
              className="flex items-start gap-2 p-3 rounded-lg text-xs"
              style={{
                background: 'rgba(251,191,36,0.06)',
                border: '1px solid rgba(251,191,36,0.2)',
                color: 'var(--color-amber)',
              }}
            >
              <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
              <span>
                This is a demo purchase. No real payment will be processed and no credits will be transferred.
              </span>
            </div>

            <button
              id="modal-confirm"
              className="btn-primary w-full justify-center"
              onClick={handleConfirm}
            >
              Confirm Purchase
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border-2 border-t-transparent"
              style={{
                borderColor: 'var(--color-mint)',
                borderTopColor: 'transparent',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <p className="font-mono-label" style={{ color: 'var(--color-text-secondary)' }}>
              WRITING TO LEDGER...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-10 flex flex-col items-center gap-5 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.4)' }}
            >
              <Check size={28} color="var(--color-mint)" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                Purchase Recorded
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {quantity.toLocaleString()} tCO₂e of {project.id} has been simulated in the ledger.
              </p>
            </div>
            <div
              className="font-mono-label px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.2)',
                color: 'var(--color-mint)',
                fontSize: 11,
              }}
            >
              TX_REF: {project.txRef.slice(0, 20)}...
            </div>
            <button
              id="modal-done"
              className="btn-ghost w-full justify-center"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
