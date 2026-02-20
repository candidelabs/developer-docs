import React from 'react';

const SparkleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    width="15"
    height="15"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

/**
 * Branded callout box for use in MDX pages.
 *
 * Usage:
 *   <Callout title="Optional title">Body text or JSX</Callout>
 *   <Callout icon={<MyIcon />}>Body text</Callout>
 */
export default function Callout({ icon, title, children }) {
  return (
    <div style={{
      display: 'flex',
      gap: '0.75rem',
      margin: '1.5rem 0',
      padding: '0.875rem 1rem',
      borderRadius: '0.5rem',
      borderTop: '1px solid rgba(231, 0, 115, 0.2)',
      borderRight: '1px solid rgba(231, 0, 115, 0.2)',
      borderBottom: '1px solid rgba(231, 0, 115, 0.2)',
      borderLeft: '3px solid #E70073',
      background: 'rgba(231, 0, 115, 0.04)',
      alignItems: 'flex-start',
    }}>
      <span style={{ color: '#E70073', flexShrink: 0, marginTop: '0.15rem', display: 'flex' }}>
        {icon ?? <SparkleIcon />}
      </span>
      <div style={{ fontSize: '0.875rem', lineHeight: 1.65, flex: 1 }}>
        {title && <><strong>{title}</strong>{': '}</>}
        {children}
      </div>
    </div>
  );
}
