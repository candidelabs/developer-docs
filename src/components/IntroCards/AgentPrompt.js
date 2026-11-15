import React, { useEffect, useRef, useState } from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

const PROMPT =
    'Read https://docs.candide.dev/llms.txt, then help me integrate Candide into this project.'

// `logo` tabs show only the logo; `label` stays as the accessible name and tooltip.
const TABS = [
    { label: 'Claude Code', logo: '/img/agents/claude.svg', color: '#D97757', text: `claude "${PROMPT}"` },
    { label: 'Codex', logo: '/img/agents/openai.svg', color: '#ffffff', text: `codex "${PROMPT}"` },
    { label: 'Any agent', text: PROMPT },
]

// Single-color logo tinted through a CSS mask, so the SVG files stay untouched.
function Logo({ src, color }) {
    const url = `url(${useBaseUrl(src)})`
    return (
        <span
            aria-hidden="true"
            className={styles.tabLogo}
            style={{ backgroundColor: color, maskImage: url, WebkitMaskImage: url }}
        />
    )
}

// Copyable command that starts a coding agent with the docs index.
export default function AgentPrompt() {
    const [active, setActive] = useState(0)
    const [status, setStatus] = useState('idle') // idle | copied | error
    const timer = useRef(null)
    const tab = TABS[active]

    useEffect(() => () => clearTimeout(timer.current), [])

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(tab.text)
            setStatus('copied')
        } catch {
            setStatus('error')
        }
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setStatus('idle'), 1800)
    }

    return (
        <div className={styles.agent}>
            <div className={styles.agentHead}>
                <span className={styles.agentLabel}>Build with your agent</span>
                <div className={styles.tabs} role="group" aria-label="Agent">
                    {TABS.map((t, i) => (
                        <button
                            key={t.label}
                            type="button"
                            aria-pressed={i === active}
                            aria-label={t.logo ? t.label : undefined}
                            title={t.logo ? t.label : undefined}
                            className={i === active ? styles.tabActive : styles.tab}
                            onClick={() => {
                                setActive(i)
                                setStatus('idle')
                            }}
                        >
                            {t.logo ? <Logo src={t.logo} color={t.color} /> : t.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.agentBody}>
                <code className={styles.agentCode}>{tab.text}</code>
                <button type="button" className={styles.copyButton} onClick={copy}>
                    {status === 'copied' ? 'Copied' : status === 'error' ? 'Copy failed' : 'Copy'}
                </button>
            </div>
        </div>
    )
}
