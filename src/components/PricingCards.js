import React from 'react';
import Link from '@docusaurus/Link';

const plans = [
  {
    name: "Starter",
    price: "Free",
    tagline: "Development & Testing",
    features: [
      "2,500 mainnet UserOps — 90-day trial",
      "Unlimited testnet, forever",
      "Full AbstractionKit SDK",
      "All account features (Passkeys, Social Recovery, Unified Accounts)",
      "2 mainnet chains",
      "Community support (Discord)",
    ],
    cta: { label: "Start Building Free", href: "https://dashboard.candide.dev" },
    featured: false,
  },
  {
    name: "Launch",
    price: "$399/mo",
    tagline: "Going to Production",
    features: [
      "100,000 UserOps/mo",
      "7 mainnet chains",
      "3 API key environments",
      "10 gas policies, 3 team seats",
      "1M API requests/mo",
      "Slack/Telegram support (24h)",
    ],
    cta: { label: "Get Started", href: "https://dashboard.candide.dev/team-settings/manage-plan" },
    featured: false,
  },
  {
    name: "Grow",
    price: "$899/mo",
    tagline: "Scaling",
    badge: "Most Popular",
    features: [
      "500,000 UserOps/mo",
      "All mainnet chains",
      "Unlimited gas policies + custom rules",
      "15 team seats, 5 environments",
      "1 Account Plugin included",
      "99.0% uptime SLA",
      "Slack/Telegram support (4h)",
    ],
    cta: { label: "Get Started", href: "https://dashboard.candide.dev/team-settings/manage-plan" },
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$3,000+/mo",
    tagline: "Dedicated Infrastructure",
    features: [
      "Unlimited UserOps",
      "All chains + custom networks",
      "Dedicated bundler",
      "99.9% uptime SLA (w/ penalties)",
      "Unlimited team seats & environments",
      "Custom plugins",
      "Slack/Telegram (1h) + 24/7 incident response",
    ],
    cta: { label: "Contact Us", href: "mailto:team@candidelabs.com" },
    featured: false,
  },
];

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`flex flex-col rounded-lg p-5 dark:bg-[rgba(255,255,255,0.05)] bg-white ${
            plan.featured
              ? 'ring-2 ring-[#E70073]'
              : 'border border-[rgba(255,255,255,0.08)]'
          }`}
        >
          {plan.badge ? (
            <span className="text-xs font-semibold text-[#E70073] uppercase tracking-wide mb-2">
              {plan.badge}
            </span>
          ) : (
            <span className="mb-5" />
          )}
          <p className="text-base font-bold mb-0">{plan.name}</p>
          <p className="text-2xl font-bold my-2 mb-1">{plan.price}</p>
          <p className="text-sm opacity-50 mb-4 mt-0">{plan.tagline}</p>
          <hr className="border-[rgba(255,255,255,0.1)] mb-4" />
          <ul className="flex-1 !pl-0 !list-none space-y-2 text-sm mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#E70073] shrink-0 mt-0.5">✓</span>
                <span className="opacity-80">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            to={plan.cta.href}
            className={`text-center rounded px-4 py-2 text-sm font-medium hover:no-underline transition-opacity hover:opacity-80 ${
              plan.featured
                ? 'bg-[#E70073] text-white'
                : 'border border-[rgba(255,255,255,0.15)] dark:text-white text-black'
            }`}
          >
            {plan.cta.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
