import React from 'react'
import styles from '../../pages/index.module.css'
import Link from '@docusaurus/Link'
import { ICON_MAP } from './icons'

export default function HomepageFeatures(props) {
  return (
    <>
      {props.columns.map((column, index) => {
        const SectionIcon = column.iconName ? ICON_MAP[column.iconName] : null;
        return (
          <div key={index} className={styles.section}>
            <h2 className={styles.section_title}>
              {SectionIcon && (
                <span className={styles.section_icon}>
                  <SectionIcon size={14} />
                </span>
              )}
              {column.title}
            </h2>
            <div className={styles.cards_list}>
              {column.rows.map((row, rowIndex) => {
                const CardIcon = row.iconName ? ICON_MAP[row.iconName] : null;
                return (
                  <Link
                    key={rowIndex}
                    className={styles.card}
                    to={row.to}
                  >
                    {CardIcon && (
                      <span className={styles.card_icon}>
                        <CardIcon size={20} />
                      </span>
                    )}
                    <div className={styles.card_body}>
                      <p className={styles.card_title}>{row.title}</p>
                      <p className={styles.card_description}>{row.description}</p>
                    </div>
                    <span className={styles.card_arrow}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="14" height="14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  )
}
