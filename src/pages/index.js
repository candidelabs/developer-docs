import React from 'react';
import Layout from '@theme/Layout';
import Banner from '../components/Banner/Banner';

export default function Home() {
  return (
    <Layout
      title={`Candide Documentation`}
      description="Candide is a set of open-source tools that lets you build Smart Wallets with both ERC-4337 and EIP-7702 Account Abstraction"
    >
      <Banner />
    </Layout>
  )
}
