---
slug: august-update
title: "Safe Recovery SDK, New Status Page & Enhanced Analytics"
description: New Safe Recovery SDK for seamless account recovery, comprehensive status page for API monitoring, and enhanced analytics dashboard with detailed usage insights.
image: "/img/posters/atelier-meta.png"
authors: [marc]
tags: [safe-recovery,sdk,status-page,analytics,monitoring]
---

# Safe Recovery SDK, New Status Page & Enhanced Analytics

We're excited to announce our latest updates designed to improve security, reliability, and developer experience—from a new SDK for account recovery to enhanced monitoring capabilities.

<!-- truncate -->

## Safe Recovery Service SDK

We've released a new SDK that simplifies integration with our Safe Recovery Service API. Provide users with peace of mind through a seamless recovery experience when they lose access to their main signer.

**Key features:**

- **Auto-execution**: Automatically handles recovery and finalization after the grace period
- **Emoji codes**: Prevents recovery scams through unique verification codes
- **Off-chain signatures**: Guardians sign without paying gas fees while maintaining privacy
- **Candide Guardian**: Email/SMS recovery as guardian options (coming soon)
- **Alert system**: Instant notifications for account owners when recovery is initiated

### Get started

```bash
npm install safe-recovery-service-sdk
```

**Learn more**:
- [Guide: Adding a guardian](/wallet/plugins/how-to-add-a-guardian) 
- [Guide: Account recovery](/wallet/plugins/recovery-flow-guide)

## New Status Page

We've launched a comprehensive status page providing full transparency into our infrastructure. Track historical and real-time uptime for both Bundler and Paymaster API services across all supported networks.

Our monitoring system runs continuous live tests, submitting real transactions every few minutes to ensure optimal performance.

**Check it out:** [status.candide.dev](https://status.candide.dev)

## Enhanced Dashboard Analytics

Gain deeper insights into your API usage with our upgraded analytics dashboard. The new interface provides granular visibility into your application's behavior and usage patterns.

**What's new:**
- **Per-API key breakdown**: Detailed statistics for each API key
- **Method-level insights**: Identify your most-used RPC methods
- **Network distribution**: Analyze usage across different chains
- **Time-series data**: View daily and monthly usage trends
- **Performance metrics**: Monitor response times and success rates

Access these insights by selecting any API key in your dashboard and navigating to the Analytics tab.