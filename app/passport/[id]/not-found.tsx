import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { MonoLabel } from '@/components/badge';

export default function NotFound() {
  return (
    <AppShell>
      <div className="container-max py-24 flex flex-col items-center gap-6 text-center">
        <MonoLabel color="tertiary">404 · NOT FOUND</MonoLabel>
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: 48, color: 'var(--color-text-primary)' }}
        >
          Passport Not Found
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          No credit passport found for that ID. Double-check the project identifier.
        </p>
        <Link href="/marketplace" className="btn-primary">
          Browse Marketplace
        </Link>
      </div>
    </AppShell>
  );
}
