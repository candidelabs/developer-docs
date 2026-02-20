import React, { useState, useRef, useEffect } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ClipboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="2" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: 4, opacity: 0.45 }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const MarkdownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 208 128" fill="currentColor" aria-hidden="true">
    <rect width="208" height="128" rx="15" ry="15" fill="none" stroke="currentColor" strokeWidth="10" />
    <path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z" />
  </svg>
);

const ChatGPTIcon = () => (
  <svg width="15" height="15" viewBox="0 0 41 41" fill="currentColor" aria-hidden="true">
    <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.205-2.371 10.079 10.079 0 0 0-9.612 6.981 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.205 2.371 10.079 10.079 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.664-4.834 10.079 10.079 0 0 0-1.243-11.818zm-17.297 24.019a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.5zm-16.106-6.892a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zm-2.169-17.404a7.469 7.469 0 0 1 3.903-3.276 66.558 66.558 0 0 0-.005.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L8.017 25.969a7.504 7.504 0 0 1-5.957-8.376zm27.706 6.441l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 66.558 66.558 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.499v4.998l-4.331 2.5-4.331-2.5V21.977z" />
  </svg>
);

const ClaudeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 46 46" fill="currentColor" aria-hidden="true">
    <path d="M31.007 2.68C26.792 2.68 23.11 5.066 21.2 8.6 19.29 5.066 15.607 2.68 11.394 2.68 5.097 2.68 0 7.748 0 14.007c0 3.505 1.607 6.637 4.135 8.737L21.2 36.44l17.064-13.696C40.793 20.644 42.4 17.512 42.4 14.007 42.4 7.748 37.303 2.68 31.007 2.68z" transform="translate(1.8 4.8)" />
  </svg>
);

export default function LLMToolsButton() {
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState('idle'); // idle | loading | copied | error
  const containerRef = useRef(null);

  const permalink = metadata.permalink;
  // Evaluated lazily inside event handlers — never called during SSR
  const getLocalMdUrl = () => window.location.origin + permalink.replace(/\/$/, '') + '.md';
  // Production URL for LLM prompt (always points to the live site)
  const prodMdUrl = siteConfig.url + permalink.replace(/\/$/, '') + '.md';
  const prompt = `I'm building with Candide's Account Abstraction stack (AbstractionKit SDK, ERC-4337 Bundler & Paymaster APIs).

Read this docs page: ${prodMdUrl}

Help me implement "${metadata.title}". Provide working TypeScript code examples using AbstractionKit where applicable, and highlight any important caveats or gotchas.`;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleCopyMarkdown = async () => {
    setCopyState('loading');
    setOpen(false);
    try {
      const res = await fetch(getLocalMdUrl());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
    setTimeout(() => setCopyState('idle'), 2500);
  };

  const handleViewMarkdown = () => {
    setOpen(false);
    window.open(getLocalMdUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleOpenChatGPT = () => {
    setOpen(false);
    window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenClaude = () => {
    setOpen(false);
    window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`, '_blank', 'noopener,noreferrer');
  };

  const isIdle = copyState === 'idle';

  const stateColor = {
    idle: 'var(--ifm-color-primary)',
    loading: 'var(--ifm-color-primary)',
    copied: '#22c55e',
    error: '#ef4444',
  }[copyState];

  const copyLabel = {
    idle: 'Copy Page',
    loading: 'Copying…',
    copied: 'Copied!',
    error: 'Error',
  }[copyState];

  const copyIcon = {
    idle: <ClipboardIcon />,
    loading: <ClipboardIcon />,
    copied: <CheckIcon />,
    error: <AlertIcon />,
  }[copyState];

  const sharedBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    fontSize: '0.78rem',
    fontWeight: 500,
    color: stateColor,
    background: 'transparent',
    border: 'none',
    cursor: copyState === 'loading' ? 'wait' : 'pointer',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
  };

  const styles = {
    container: {
      position: 'relative',
      display: 'inline-flex',
      flexShrink: 0,
      border: `1px solid ${stateColor}`,
      borderRadius: '6px',
      overflow: 'hidden',
      transition: 'border-color 0.15s',
    },
    copyBtn: {
      ...sharedBtnStyle,
    },
    divider: {
      width: 1,
      background: stateColor,
      opacity: 0.25,
      flexShrink: 0,
    },
    caretBtn: {
      ...sharedBtnStyle,
      padding: '4px 7px',
    },
    caret: {
      fontSize: '0.6rem',
      transition: 'transform 0.15s',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    },
    dropdown: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      right: 0,
      zIndex: 200,
      background: 'var(--ifm-background-surface-color)',
      border: '1px solid var(--ifm-color-emphasis-200)',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
      minWidth: 210,
      overflow: 'hidden',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      padding: '9px 14px',
      fontSize: '0.84rem',
      color: 'var(--ifm-font-color-base)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
    },
    dropdownDivider: {
      height: 1,
      background: 'var(--ifm-color-emphasis-200)',
      margin: '2px 0',
    },
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}>
      <div style={styles.container}>
        {/* Primary action: copy */}
        <button
          style={styles.copyBtn}
          onClick={handleCopyMarkdown}
          disabled={copyState === 'loading'}
          title="Copy page as Markdown"
        >
          {copyIcon}
          {copyLabel}
        </button>

        {/* Dropdown toggle — only shown in idle state */}
        {isIdle && (
          <>
            <div style={styles.divider} />
            <button
              style={styles.caretBtn}
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={open}
              title="More options"
            >
              <span style={styles.caret}>▾</span>
            </button>
          </>
        )}
      </div>

      {open && (
        <div style={styles.dropdown} role="menu">
          <DropdownItem style={styles.item} icon={<MarkdownIcon />} onClick={handleViewMarkdown} external>
            View as Markdown
          </DropdownItem>
          <div style={styles.dropdownDivider} />
          <DropdownItem style={styles.item} icon={<ChatGPTIcon />} onClick={handleOpenChatGPT} external>
            Open in ChatGPT
          </DropdownItem>
          <DropdownItem style={styles.item} icon={<ClaudeIcon />} onClick={handleOpenClaude} external>
            Open in Claude
          </DropdownItem>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ icon, children, onClick, style, external }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      role="menuitem"
      style={{
        ...style,
        background: hovered ? 'var(--ifm-color-emphasis-100)' : 'none',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      <span style={{ flex: 1 }}>{children}</span>
      {external && <ExternalLinkIcon />}
    </button>
  );
}
