import React from 'react'

/**
 * Small gray pill, for labels like "Testnet" or "Server only".
 * Works inline in text and next to headings.
 *
 * Usage:
 *   ## Linux <Tag>Server only</Tag>
 */
export default function Tag({ children }) {
    return (
        <span className="ml-2 inline-block rounded-full px-2.5 py-0.5 align-middle text-[0.8125rem] font-normal leading-normal tracking-normal dark:bg-[rgba(255,255,255,0.08)] dark:text-white-80 bg-[rgba(0,0,0,0.06)] text-black-80">
            {children}
        </span>
    )
}
