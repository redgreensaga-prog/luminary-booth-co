import type { Metadata } from 'next';
import ClientReport from '@/components/admin/ClientReport';

export const metadata: Metadata = {
  title: 'Website Delivery Report — Luminary Booth Co.',
  description: 'Internal client delivery report for the Luminary Booth Co. website project.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ReportPage() {
  return <ClientReport />;
}
