import React from 'react';

const rows = [
  { plan: "Starter", included: "1,000 Ops", fee: "$0.02 per op", featured: false },
  { plan: "Launch", included: "5,000 Ops/mo", fee: "$0.01 per op", featured: false },
  { plan: "Grow", included: "25,000 Ops/mo", fee: "$0.005 per op", featured: true },
  { plan: "Enterprise", included: "Unlimited", fee: "Zero Markup", featured: false },
];

export default function GasSponsorshipTable() {
  return (
    <div className="overflow-x-auto my-6 rounded-lg border border-[rgba(255,255,255,0.08)]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.08)]">
            <th className="text-left p-4 text-xs font-semibold uppercase tracking-widest opacity-35 font-normal">Plan</th>
            <th className="text-left p-4 text-xs font-semibold uppercase tracking-widest opacity-35 font-normal">Included Free</th>
            <th className="text-left p-4 text-xs font-semibold uppercase tracking-widest opacity-35 font-normal">Fee After Included</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-t border-[rgba(255,255,255,0.05)] transition-colors ${
                row.featured
                  ? 'bg-[rgba(231,0,115,0.05)]'
                  : 'hover:bg-[rgba(255,255,255,0.02)]'
              }`}
            >
              <td className="p-4 font-medium">
                {row.plan}
                {row.featured && (
                  <span className="ml-2 text-[10px] text-[#E70073] uppercase tracking-widest font-semibold">
                    Most Popular
                  </span>
                )}
              </td>
              <td className="p-4 opacity-75">{row.included}</td>
              <td className="p-4 opacity-75">{row.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
