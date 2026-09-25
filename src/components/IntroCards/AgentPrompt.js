import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

const PROMPT =
    'Read https://docs.candide.dev/llms.txt, then help me integrate Candide into this project.'

const TABS = [
    { label: 'Claude Code', text: `claude "${PROMPT}"` },
    { label: 'Codex', text: `codex "${PROMPT}"` },
    { label: 'Any agent', text: PROMPT },
]

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
                            className={i === active ? styles.tabActive : styles.tab}
                            onClick={() => {
                                setActive(i)
                                setStatus('idle')
                            }}
                        >
                            {t.label}
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
