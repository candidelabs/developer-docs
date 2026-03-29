import React from 'react'
import styles from '../../pages/index.module.css'
import Link from '@docusaurus/Link'
import { ICON_MAP } from './icons'

export default function HomepageFeatures({ items }) {
  return (
    <>
      {items.map((item, index) => {
        const Icon = item.iconName ? ICON_MAP[item.iconName] : null;
        return (
          <Link
            key={index}
            className={styles.card}
            to={item.to}
          >
            {Icon && (
              <span className={styles.card_icon}>
                <Icon size={20} />
              </span>
            )}
            <div className={styles.card_body}>
              <p className={styles.card_title}>{item.title}</p>
              <p className={styles.card_description}>{item.description}</p>
            </div>
            <span className={styles.card_arrow}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="14" height="14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </span>
          </Link>
        );
      })}
    </>
  )
}
