import React from 'react';

const FEATURED_INDEX = 2; // Grow column

const plans = [
  { name: "Starter", price: "Free" },
  { name: "Launch", price: "$399/mo" },
  { name: "Grow", price: "$899/mo" },
  { name: "Enterprise", price: "$3,000+/mo" },
];

const groups = [
  {
    label: "Usage",
    rows: [
      { feature: "Mainnet UserOps", values: ["2,500 Ops — 90-Day Trial", "100,000/mo", "500,000/mo", "Unlimited"] },
      { feature: "Testnet Usage", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
      { feature: "Mainnet Chains", values: ["2", "7", "All", "All"] },
      { feature: "Exclusive Networks", values: [null, "Add-on", "1 Included", "Custom"] },
    ],
  },
  {
    label: "Infrastructure",
    rows: [
      { feature: "Bundler", values: ["Public", "Shared", "Priority", "Isolated (Dedicated)"] },
      { feature: "Uptime SLA", values: ["Best Effort", "Best Effort", "99.0%", "99.9% (w/ penalties)"] },
      { feature: "Throughput", values: ["10 req/sec", "50 req/sec", "200 req/sec", "Custom / Uncapped"] },
    ],
  },
  {
    label: "Developer Experience",
    rows: [
      { feature: "API Key Environments", values: ["1", "3 (Prod + Staging + Test)", "5", "Unlimited"] },
      { feature: "Gas Policies", values: ["2", "10", "Unlimited + Custom Rules", "Unlimited + Custom Rules"] },
      { feature: "Team Seats", values: ["1", "3", "15", "Unlimited"] },
      { feature: "Included Capacity", values: ["25,000 API Req (total)", "1M API Req/mo", "5M API Req/mo", "Unlimited / Dedicated"] },
      { feature: "Account Plugins", values: ["SDK", "Add-on", "1 Included", "Custom"] },
    ],
  },
  {
    label: "Gas Sponsorship",
    rows: [
      { feature: "Included Ops", values: ["1,000 Ops", "5,000 Ops/mo", "25,000 Ops/mo", "Unlimited"] },
      { feature: "Fee After Included", values: ["$0.02/op", "$0.01/op", "$0.005/op", "Zero Markup"] },
    ],
  },
  {
    label: "Support",
    rows: [
      { feature: "Channel & Response", values: ["Community (Discord)", "Slack/Telegram (24h)", "Slack/Telegram (4h)", "Slack/Telegram (1h) + 24/7"] },
      { feature: "Monthly Calls", values: [null, "1", "2", "Custom"] },
    ],
  },
];

function CellValue({ value }) {
  if (value === null) {
    return <span className="opacity-25 text-base select-none">—</span>;
  }
  return <span>{value}</span>;
}

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto my-6 rounded-lg border border-[rgba(255,255,255,0.08)]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.08)]">
            <th className="text-left p-4 w-[28%] font-normal opacity-0 select-none">Feature</th>
            {plans.map((plan, i) => (
              <th
                key={plan.name}
                className={`text-center p-4 font-normal ${
                  i === FEATURED_INDEX
                    ? 'bg-[rgba(231,0,115,0.07)] border-x border-[rgba(231,0,115,0.25)]'
                    : ''
                }`}
              >
                {i === FEATURED_INDEX && (
                  <div className="text-[10px] font-semibold text-[#E70073] uppercase tracking-widest mb-1.5">
                    Most Popular
                  </div>
                )}
                <div className="font-bold text-base">{plan.name}</div>
                <div className={`text-sm mt-0.5 ${i === FEATURED_INDEX ? 'text-[#E70073]' : 'opacity-40'}`}>
                  {plan.price}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((group, gi) => (
            <React.Fragment key={gi}>
              <tr className="border-t border-[rgba(255,255,255,0.06)]">
                <td
                  colSpan={5}
                  className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest opacity-35 bg-[rgba(255,255,255,0.025)]"
                >
                  {group.label}
                </td>
              </tr>
              {group.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-t border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <td className="p-4 opacity-60 text-sm">{row.feature}</td>
                  {row.values.map((val, vi) => (
                    <td
                      key={vi}
                      className={`p-4 text-center text-sm ${
                        vi === FEATURED_INDEX
                          ? 'bg-[rgba(231,0,115,0.05)] border-x border-[rgba(231,0,115,0.15)]'
                          : ''
                      }`}
                    >
                      <CellValue value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
          <tr className="border-t border-[rgba(255,255,255,0.06)]">
            <td className="p-4" />
            {plans.map((_, i) => (
              <td
                key={i}
                className={`p-2 ${
                  i === FEATURED_INDEX
                    ? 'bg-[rgba(231,0,115,0.07)] border-x border-[rgba(231,0,115,0.25)]'
                    : ''
                }`}
              />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
