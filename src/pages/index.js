import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import homePageFeatures from '../homePageFeatures'
import styles from './index.module.css';
import Banner from '../components/Banner/Banner';

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Candide Documentation`}
      description="Candide is a set of open-source tools that lets you build Smart Wallets with both ERC-4337 and EIP-7702 Account Abstraction"
    >
      <Banner />
      <main>
        <div className={styles.container}>
          <div className={styles.row}>
            <HomepageFeatures columns={homePageFeatures} />
          </div>
          <div className={styles.ai_strip}>
            <span className={styles.ai_strip_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="14" height="14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
            </span>
            <span className={styles.ai_strip_text}>
              <strong>AI-ready docs</strong>: every page has a <strong>Copy Page</strong> button to paste directly into Claude or ChatGPT.
              For agents and IDE integrations like Claude Code or Cursor, use{' '}
              <a href="https://docs.candide.dev/llms.txt" target="_blank" rel="noopener noreferrer">/llms.txt</a>.
            </span>
          </div>
        </div>
      </main>
    </Layout>
  )
}
