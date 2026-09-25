import React from 'react'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

// Large cards with an illustration, one link each.
export function ImageCards({ items }) {
    return (
        <div className={styles.imageGrid}>
            {items.map((item) => (
                <ImageCard key={item.title} {...item} />
            ))}
        </div>
    )
}

function ImageCard({ title, description, route, image }) {
    return (
        <Link to={route} className={styles.imageCard}>
            <img src={useBaseUrl(image)} alt="" className={styles.image} loading="lazy" />
            <span className={styles.body}>
                <span className={styles.title}>{title}</span>
                <span className={styles.text}>{description}</span>
            </span>
        </Link>
    )
}

// Small text cards with an icon, one link each.
export function LinkCards({ items }) {
    return (
        <div className={styles.linkGrid}>
            {items.map((item) => (
                <Link key={item.title} to={item.route} className={styles.linkCard}>
                    <span className={styles.icon} aria-hidden="true">{ICONS[item.icon]}</span>
                    <span className={styles.body}>
                        <span className={styles.title}>{item.title}</span>
                        <span className={styles.text}>{item.description}</span>
                    </span>
                </Link>
            ))}
        </div>
    )
}

const iconProps = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
}

const ICONS = {
    book: (
        <svg {...iconProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" /><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" /></svg>
    ),
    key: (
        <svg {...iconProps}><circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.7 12.3 21 2M16 7l3 3M19 4l2 2" /></svg>
    ),
    code: (
        <svg {...iconProps}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
    spark: (
        <svg {...iconProps}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></svg>
    ),
}
