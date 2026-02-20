import React from 'react';
import Link from '@docusaurus/Link';

export default function CTASection() {
  return (
    <div className="relative overflow-hidden rounded-lg p-8 my-6 text-center border border-[rgba(231,0,115,0.2)] bg-[rgba(231,0,115,0.04)]">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #E70073 0%, transparent 70%)' }}
      />
      <h2 className="text-xl font-bold mb-2 mt-0 relative">Ready to get started?</h2>
      <p className="opacity-55 mb-6 text-sm relative">
        No credit card required. Deploy your first transaction in minutes.
      </p>
      <div className="flex gap-3 justify-center flex-wrap relative">
        <Link
          to="https://dashboard.candide.dev"
          className="bg-[#E70073] text-white px-6 py-2.5 rounded font-medium text-sm hover:no-underline hover:opacity-80 transition-opacity"
        >
          Start Building Free
        </Link>
        <Link
          to="mailto:team@candidelabs.com"
          className="border border-[rgba(255,255,255,0.2)] dark:text-white text-black px-6 py-2.5 rounded font-medium text-sm hover:no-underline hover:opacity-70 transition-opacity"
        >
          Contact Enterprise Sales
        </Link>
      </div>
    </div>
  );
}
