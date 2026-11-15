import React from 'react'
import Link from '@docusaurus/Link'

/**
 * Bordered card with an icon, a title, a subtitle and a pill button.
 *
 * Usage:
 *   <ActionCard
 *     icon="/img/logo/candide_logo_icon.png"
 *     title="Complete example"
 *     description="sponsor-gas.ts in abstractionkit-examples"
 *     action="View on GitHub"
 *     href="https://github.com/..."
 *   />
 */
export default function ActionCard({ icon, title, description, action, href }) {
    return (
        <div className="my-6 flex items-center gap-4 rounded-2xl border p-4 dark:border-[rgba(255,255,255,0.1)] border-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.02)] bg-white">
            {icon && (
                <img
                    src={icon}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-xl"
                />
            )}
            <div className="min-w-0 flex-1">
                <p className="mb-0 font-medium dark:text-white text-black">{title}</p>
                {description && (
                    <p className="mb-0 text-sm dark:text-white-50 text-black-50">{description}</p>
                )}
            </div>
            {action && href && (
                <Link
                    to={href}
                    className="shrink-0 rounded-full px-4 py-1.5 text-sm font-medium hover:no-underline transition-opacity hover:opacity-85 dark:bg-white dark:text-black bg-black text-white dark:hover:text-black hover:text-white"
                >
                    {action}
                </Link>
            )}
        </div>
    )
}
