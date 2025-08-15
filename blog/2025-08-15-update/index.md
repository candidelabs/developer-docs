---
slug: august-update
title: "Safe Recovery SDK, New Status Page & Enhanced Analytics"
description: New Safe Recovery SDK for seamless account recovery, comprehensive status page for API monitoring, and enhanced analytics dashboard with detailed usage insights.
image: "/img/posters/atelier-meta.png"
authors: [marc]
tags: [safe-recovery,sdk,status-page,analytics,monitoring]
---

# Safe Recovery SDK, New Status Page & Enhanced Analytics

We're excited to share our latest updates designed to improve security, reliability, and developer experience. From a brand new SDK for account recovery to enhanced monitoring capabilities, here's what's new.

<!-- truncate -->

## Safe Recovery Service SDK

We've released a new SDK that makes integrating our Safe Recovery Service API dead simple. Give your users peace of mind with a superior UX that never fails when they lose access to their main signer.

**Key features**:

- **Auto-execution**: Handles recovery and finalization after the grace period
- **Emoji codes**: Prevents recovery scams with unique verification
- **Off-chain signatures**: Guardians sign without gas fees, keeps everything private
- **Candide Guardian**: Email/SMS recovery as guardian options (coming soon)
- **Alert system**: Owners get notified instantly when recovery starts

### Get started

```bash
npm install safe-recovery-service-sdk
```

**Learn more**:
- [Guide: Adding a guardian](/wallet/plugins/how-to-add-a-guardian) 
- [Guide: Account recovery](/wallet/plugins/recovery-flow-guide)

## New Status Page

We've launched a comprehensive status page to give you full transparency into our infrastructure. Track historic and real-time uptime for both Bundler and Paymaster API services across all supported networks.

Our monitoring system runs 24/7 live tests, submitting real transactions every few minutes to ensure optimal performance.

**Check it out**: [status.candide.dev](https://status.candide.dev)

## Enhanced Dashboard Analytics

Get deeper insights into your API usage with our upgraded analytics dashboard. The new interface provides granular visibility into your application's behavior and usage patterns.

**What's new**:
- **Per-API key breakdown**: Detailed stats for each of your API keys
- **Method-level insights**: See which RPC methods you're using most
- **Network distribution**: Understand usage across different chains
- **Time-series data**: Daily and monthly usage trends
- **Performance metrics**: Response times and success rates

Access these insights by clicking on any API key in your dashboard and navigating to the Analytics tab.