---
slug: platform-api
title: "Platform API: Create Gas Policies Programmatically"
description: Create, update, and manage Candide gas sponsorship policies from your own backend with a team-scoped REST API. No more configuring every policy by hand in the dashboard.
authors: [marc]
tags: [platform-api, instagas, gas-policies, gas-sponsorship, automation]
---

# Platform API: Create Gas Policies Programmatically

You can now create and manage Candide gas policies straight from your backend. The new Platform API gives you the same policy management you had in the dashboard, exposed as a team-scoped REST API you can call from deployment scripts, admin tools, and production services.

<!-- truncate -->

## Why we built it

The Platform API is a control-plane API. It configures which operations Candide may sponsor. It does not submit or sponsor UserOperations itself, so it slots in alongside the [Paymaster API](/wallet/paymaster/rpc-methods) you already use at runtime.

## What you can do

- Create, read, update, and delete gas policies from trusted server-side code
- Manage account, access, and transaction rules with dedicated, idempotent endpoints
- Provision a policy per customer as part of onboarding
- Keep policy configuration in version control and in sync across environments

## Create a policy in a few lines

Create a team management key in the dashboard, grant it only the scopes it needs (`gas-policies:read`, `gas-policies:write`), and send it as a bearer token. Start policies disabled and private, add your restrictions, then enable them:

```bash
curl --request POST \
  --url https://platform-api.candide.dev/v1/gas-policies \
  --header "Authorization: Bearer $CANDIDE_MANAGEMENT_KEY" \
  --header "Content-Type: application/json" \
  --data '{
    "name": "Onboarding sponsorship",
    "chainId": 11155111,
    "general": { "enabled": false, "private": true },
    "accountRules": {
      "rate": 3,
      "ratePeriod": 86400,
      "totalMax": "0x6f05b59d3b20000",
      "maxPerOp": "0x5af3107a4000"
    }
  }'
```

## Keep management keys on the server

A management key can change your sponsorship rules, so treat it like a secret. It must never live in browser code, mobile apps, public repositories, or logs. It is separate from the API key used in your Bundler or Paymaster endpoint.

## Get started

- [Platform API overview](/platform/overview) walks through authentication, scopes, and the full quickstart
- [Gas Policy API reference](/platform/gas-policy-api) documents every endpoint and request format
- Download the [OpenAPI 3.1 specification](/openapi/platform-api.yaml) for client generation and agent tooling

If you are automating gas sponsorship, try it and tell us what you think. Find us on Discord.

~ Marc
