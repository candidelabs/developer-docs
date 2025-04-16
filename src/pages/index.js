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
        </div>
      </main>
    </Layout>
  )
}
