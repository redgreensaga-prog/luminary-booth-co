'use client';

import { useCallback } from 'react';

// ─── Static report data ────────────────────────────────────────────────────

const REPORT_DATE = 'May 2025';
const DEVELOPER_NAME = '[Developer Name]';
const LIVE_URL = 'https://luminaryboothco.vercel.app';
const REPO_URL = 'github.com/redgreensaga-prog/luminary-booth-co';

const PAGES = [
  { url: '/', label: 'Homepage', purpose: 'Single-page marketing experience — hero, gallery, stats, testimonials, FAQ' },
  { url: '/about', label: 'About', purpose: 'Brand story, team introduction, and company values' },
  { url: '/services', label: 'Services', purpose: 'Photo booth packages and service offerings' },
  { url: '/portfolio', label: 'Portfolio', purpose: 'Visual showcase of past event work' },
  { url: '/pricing', label: 'Pricing', purpose: 'Package tiers and pricing transparency' },
  { url: '/contact', label: 'Contact', purpose: 'Client inquiry and booking request form' },
];

const FEATURES = [
  'Animated hero section with luxury typography and real event photography',
  'Interactive booth showcase with 3 booth types and tabbed navigation',
  'Filterable photo gallery with 12 works and category search',
  '5-step process timeline with animated entrance',
  'Animated statistics counter (triggers on scroll into view)',
  'Logo marquee with 10 luxury brand names, auto-scrolling',
  'Testimonials carousel with 5 client reviews',
  'FAQ accordion with 6 questions, smooth expand/collapse',
  'SEO structured data — Google LocalBusiness JSON-LD schema',
  'Fully mobile-responsive across all breakpoints',
  'Keyboard-accessible navigation (WCAG AA)',
  'Custom 404 not-found page',
  'Automatic sitemap.xml and robots.txt generation',
  'Performance-optimised images via next/image (WebP, lazy loading)',
];

const TECH_DECISIONS = [
  {
    tech: 'Next.js 15 (Static Site Generation)',
    reason: 'Pages are pre-built at deploy time — no server needed, loads instantly, and ranks better with search engines.',
  },
  {
    tech: 'Framer Motion',
    reason: 'The most capable animation library for React, enabling cinematic scroll-triggered and hover interactions without writing raw CSS keyframes.',
  },
  {
    tech: 'Tailwind CSS',
    reason: 'Utility-first styling keeps the design consistent and the bundle small — no unused CSS ships to visitors.',
  },
  {
    tech: 'Vercel Hosting',
    reason: 'Zero-config deployment with global edge CDN, automatic HTTPS, and preview URLs for every branch — built by the same team that makes Next.js.',
  },
];

const UPSELLS = [
  {
    title: 'Real Photography Package',
    description: 'Replace the current Unsplash placeholder images with a branded photoshoot. We handle retouching and optimisation.',
    badge: 'Recommended',
  },
  {
    title: 'Contact Form Backend',
    description: 'Connect the inquiry form to an email service (Resend or SendGrid) so leads land directly in your inbox.',
    badge: 'Quick win',
  },
  {
    title: 'Online Booking System',
    description: 'Calendar integration with deposit collection — clients can book and pay without a phone call.',
    badge: 'High value',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Google Analytics 4 setup with a simple monthly report so you know which pages drive bookings.',
    badge: 'Quick win',
  },
  {
    title: 'CMS Integration',
    description: 'Sanity or Contentful integration so you can edit copy, add testimonials, and update pricing yourself — no developer needed.',
    badge: 'Independence',
  },
];

const HANDOVER = [
  'GitHub repository access transferred',
  'Vercel project access transferred',
  'Domain connection instructions provided',
  'Content update guide provided',
];

const METRICS = [
  { label: 'Performance', target: '90+', color: '#005C48' },
  { label: 'Accessibility', target: '95+', color: '#005C48' },
  { label: 'Best Practices', target: '90+', color: '#005C48' },
  { label: 'SEO', target: '100', color: '#005C48' },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-8 pb-4 border-b-2 border-[#005C48]">
      <span
        className="text-5xl font-light text-[#005C48] leading-none select-none"
        style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)" }}
      >
        {number}
      </span>
      <h2
        className="text-2xl font-light tracking-wide text-black uppercase"
        style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)" }}
      >
        {title}
      </h2>
    </div>
  );
}

function Pill({ label, color = '#005C48' }: { label: string; color?: string }) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase rounded-full text-white"
      style={{ backgroundColor: color, fontSize: '10px' }}
    >
      {label}
    </span>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function ClientReport() {
  const handlePrint = useCallback(() => window.print(), []);

  return (
    <>
      {/* Print & page CSS */}
      <style>{`
        @page {
          size: A4;
          margin: 2cm 2.2cm;
        }
        @media print {
          .no-print { display: none !important; }
          .page-break { page-break-after: always; break-after: page; }
          .avoid-break { page-break-inside: avoid; break-inside: avoid; }
          body { background: white !important; color: black !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          /* Hide site chrome */
          [class*="grain-overlay"],
          [class*="ScrollProgress"] { display: none !important; }
        }
      `}</style>

      {/* Root wrapper — white background overrides the dark site theme */}
      <div
        className="bg-white text-black min-h-screen"
        style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
      >
        {/* ── Print button (screen only) ───────────────────────────────── */}
        <div className="no-print fixed top-6 right-6 z-50">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#005C48] text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-[#004235] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save as PDF
          </button>
        </div>

        {/* ── COVER PAGE ───────────────────────────────────────────────── */}
        <div className="page-break min-h-screen flex flex-col px-16 py-20">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-auto pb-8 border-b border-gray-200">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#005C48] font-semibold mb-1">
                Luminary Booth Co.
              </p>
              <p
                className="text-3xl font-light text-black"
                style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)" }}
              >
                Luminary Booth Co.
              </p>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#005C48] flex items-center justify-center">
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)" }}
              >
                L
              </span>
            </div>
          </div>

          {/* Cover centrepiece */}
          <div className="flex-1 flex flex-col justify-center py-20">
            <p className="text-xs tracking-[0.4em] uppercase text-[#005C48] font-semibold mb-6">
              Confidential · Client Delivery
            </p>
            <h1
              className="text-6xl md:text-7xl font-light text-black leading-tight mb-6"
              style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)" }}
            >
              Website<br />
              <span className="text-[#005C48]">Delivery</span><br />
              Report
            </h1>
            <div className="w-16 h-0.5 bg-[#005C48] mb-8" />
            <p className="text-lg text-gray-500 mb-2">
              {LIVE_URL}
            </p>
            <p className="text-gray-400 text-sm">{REPORT_DATE}</p>
          </div>

          {/* Cover footer */}
          <div className="mt-auto pt-8 border-t border-gray-200 flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Prepared by</p>
              <p className="text-sm font-medium text-black">{DEVELOPER_NAME}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Date</p>
              <p className="text-sm text-black">{REPORT_DATE}</p>
            </div>
          </div>
        </div>

        {/* ── CONTENT PAGES ────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-16 py-16 space-y-20">

          {/* ── SECTION 1 — Project Overview ─────────────────────────── */}
          <section className="avoid-break">
            <SectionHeading number="01" title="Project Overview" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="avoid-break">
                <p className="text-xs tracking-widest uppercase text-[#005C48] font-semibold mb-3">Project</p>
                <p className="text-lg font-medium text-black mb-1">Luminary Booth Co.</p>
                <p className="text-sm text-gray-500 mb-4">Luxury photo booth rental — Los Angeles, CA</p>
                <a href={LIVE_URL} className="text-sm text-[#005C48] underline break-all">{LIVE_URL}</a>
              </div>
              <div className="avoid-break">
                <p className="text-xs tracking-widest uppercase text-[#005C48] font-semibold mb-3">Tech Stack</p>
                {['Next.js 15 (App Router, SSG)', 'React 19 + TypeScript', 'Tailwind CSS v3', 'Framer Motion', 'Vercel (hosting + CDN)'].map(t => (
                  <p key={t} className="text-sm text-gray-700 leading-relaxed">— {t}</p>
                ))}
              </div>
            </div>

            <div className="avoid-break bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <p className="text-xs tracking-widest uppercase text-[#005C48] font-semibold mb-3">Brief</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                A luxury editorial photo booth website built on Next.js 15 with static site generation.
                The site serves as the primary marketing presence for Luminary Booth Co., targeting
                high-end event clients in the Los Angeles market. All pages are pre-rendered at build
                time for maximum performance, SEO, and reliability — no server or database required.
              </p>
            </div>

            <div className="avoid-break">
              <p className="text-xs tracking-widest uppercase text-[#005C48] font-semibold mb-4">Delivery Timeline</p>
              <div className="space-y-3">
                {[
                  { phase: 'Foundation', detail: 'Layout, design system, tokens, typography' },
                  { phase: 'Phase 2', detail: 'Hero, navigation, footer, base sections' },
                  { phase: 'Phase 3', detail: 'Gallery, testimonials, FAQ, process timeline' },
                  { phase: 'Phase 4', detail: 'Stats counter, logo marquee, booth showcase' },
                  { phase: 'Phase 5', detail: 'Background alternation, section dividers, CTA polish' },
                  { phase: 'Elite Touches', detail: 'Film grain overlay, micro-interactions, entrance animations' },
                  { phase: 'Bug Fixes', detail: 'Hydration fix, accessibility, performance audit' },
                  { phase: 'Photography', detail: 'Unsplash real images, next/image optimisation' },
                ].map(({ phase, detail }) => (
                  <div key={phase} className="flex items-start gap-4 avoid-break">
                    <span className="text-xs font-semibold text-[#005C48] w-28 shrink-0 pt-0.5">{phase}</span>
                    <span className="text-sm text-gray-600">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECTION 2 — What Was Built ───────────────────────────── */}
          <section>
            <SectionHeading number="02" title="What Was Built" />
            <div className="space-y-3">
              {PAGES.map(({ url, label, purpose }) => (
                <div
                  key={url}
                  className="avoid-break flex items-start gap-6 py-4 border-b border-gray-100 last:border-0"
                >
                  <code className="text-sm font-mono text-[#005C48] w-28 shrink-0 pt-0.5 bg-green-50 px-2 py-0.5 rounded">
                    {url}
                  </code>
                  <div>
                    <p className="text-sm font-semibold text-black mb-0.5">{label}</p>
                    <p className="text-sm text-gray-500">{purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 3 — Features Delivered ──────────────────────── */}
          <section>
            <SectionHeading number="03" title="Features Delivered" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
              {FEATURES.map(f => (
                <div key={f} className="avoid-break flex items-start gap-3 py-2 border-b border-gray-100">
                  <span className="text-[#005C48] mt-0.5 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 4 — Technical Decisions ─────────────────────── */}
          <section>
            <SectionHeading number="04" title="Technical Decisions" />
            <div className="space-y-6">
              {TECH_DECISIONS.map(({ tech, reason }) => (
                <div key={tech} className="avoid-break flex gap-6">
                  <div className="w-1 shrink-0 rounded-full bg-[#005C48]" />
                  <div>
                    <p className="text-sm font-semibold text-black mb-1">{tech}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 5 — Performance ──────────────────────────────── */}
          <section>
            <SectionHeading number="05" title="Performance" />
            <div className="avoid-break bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-500 italic">
                Lighthouse scores pending final deployment to custom domain with production CDN cache warm-up.
                Targets below are based on the SSG architecture and next/image optimisation already in place.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {METRICS.map(({ label, target }) => (
                <div
                  key={label}
                  className="avoid-break border border-gray-200 rounded-lg p-6 text-center"
                >
                  <p
                    className="text-4xl font-light text-[#005C48] mb-2"
                    style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)" }}
                  >
                    {target}
                  </p>
                  <div className="w-8 h-0.5 bg-[#005C48] mx-auto mb-2" />
                  <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-1">target score</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 6 — What's Next ──────────────────────────────── */}
          <section>
            <SectionHeading number="06" title="What's Next" />
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              The following enhancements are available as add-on packages.
              Each is designed to drive more bookings or reduce your operational overhead.
            </p>
            <div className="space-y-4">
              {UPSELLS.map(({ title, description, badge }) => (
                <div
                  key={title}
                  className="avoid-break flex items-start gap-5 p-5 border border-gray-200 rounded-lg hover:border-[#005C48] transition-colors duration-200"
                >
                  <div className="w-2 h-2 rounded-full bg-[#005C48] mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm font-semibold text-black">{title}</p>
                      <Pill label={badge} />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 7 — Handover Checklist ──────────────────────── */}
          <section className="avoid-break">
            <SectionHeading number="07" title="Handover Checklist" />
            <div className="space-y-3 mb-12">
              {HANDOVER.map(item => (
                <div key={item} className="avoid-break flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                  <div className="w-6 h-6 rounded-full bg-[#005C48] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            {/* Sign-off block */}
            <div className="avoid-break border border-gray-200 rounded-lg p-8">
              <p
                className="text-xl font-light text-black mb-6"
                style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)" }}
              >
                Thank you for choosing Luminary Booth Co.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Client signature</p>
                  <div className="border-b border-gray-300 mb-2" />
                  <p className="text-xs text-gray-400">Date</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Developer signature</p>
                  <div className="border-b border-gray-300 mb-2" />
                  <p className="text-xs text-gray-400">{DEVELOPER_NAME}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Document footer */}
          <footer className="pt-8 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 pb-16">
            <span>Luminary Booth Co. — Website Delivery Report</span>
            <span>{LIVE_URL}</span>
            <span>{REPORT_DATE}</span>
          </footer>

        </div>
      </div>
    </>
  );
}
