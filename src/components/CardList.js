import React from 'react'
import Link from '@docusaurus/Link'
import clsx from 'clsx'

export default function CardList({ items }) {
    return (
        <div className="flex flex-col gap-2">
            {items.map((item, i) => (
                <Card key={i} {...item} />
            ))}
        </div>
    )
}

function Card({ title, description, route }) {
    const rootElClassName = clsx(
        'block relative rounded-lg p-4 hover:no-underline group w-full',
        'border transition-all duration-150',
        'dark:bg-[rgba(255,255,255,0.03)] bg-white',
        'dark:border-[rgba(255,255,255,0.08)] border-[rgba(0,0,0,0.1)]',
        !!route && 'cursor-pointer dark:hover:border-[rgba(231,0,115,0.5)] hover:border-[rgba(231,0,115,0.4)] dark:hover:bg-[rgba(231,0,115,0.05)] hover:bg-[rgba(231,0,115,0.03)]'
    )

    const children = (
        <div className="text-sm">
            <p className="dark:text-white-80 text-black-80 font-bold mb-0">{title}</p>
            <p className="dark:text-white-50 text-black-50 mb-0">{description}</p>
            {!!route && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="absolute top-4 right-3 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-150"
                    style={{ width: 14, height: 14 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
            )}
        </div>
    )

    if (!route) {
        return <div className={rootElClassName}>{children}</div>
    }

    return (
        <Link to={route} className={rootElClassName}>
            {children}
        </Link>
    )
}
