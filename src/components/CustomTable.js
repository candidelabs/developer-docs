import React from "react";
import Table from "./Table";

export function BundlerEndPointTable({ items }) {
  return (
    <Table
      items={items}
      leftHeading="Network"
      rightHeading="RPC"
      centerHeading="Chain ID"
      renderLeftItem={(item) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start center",
          }}
        >
          <img
            src={item.logo}
            style={{
              width: "25px",
              marginRight: "10px",
            }}
          />
          <span>{item.network}</span>
        </div>
      )}
      renderRightItem={(item) => <a>{item.address}</a>}
      renderCenterItem={(item) => <span>{item.chainId}</span>}
    />
  );
}

export function ChainListTable({ items }) {
  return (
    <Table
      items={items}
      leftHeading="Network"
      rightHeading="Chain ID"
      renderLeftItem={(item) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start center",
          }}
        >
          {item.logo && <img
            src={item.logo}
            alt={item.network}
            style={{
              width: "25px",
              marginRight: "10px",
            }}
          />}
          <span>{item.network}</span>
        </div>
      )}
      renderRightItem={(item) => <span>{item.chainId}</span>}
    />
  );
}
export function PaymasterSupportedToken({ items }) {
  return (
    <Table
      items={items}
      leftHeading="Token"
      centerHeading="Contract / Mint Address"
      rightHeading="Website"
      renderLeftItem={(item) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={item.logo}
            alt=""
            width="24"
            height="24"
            style={{
              width: "24px",
              height: "24px",
              flexShrink: 0,
              objectFit: "contain",
            }}
          />
          <span>{item.token}</span>
        </div>
      )}
      renderCenterItem={(item) => (
        <a
          href={`${item.blockExplorer}${item.address}${item.blockExplorerQuery ?? ""}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--ifm-font-family-monospace)",
            fontSize: "0.8125rem",
            whiteSpace: "nowrap",
          }}
        >
          {item.address}
        </a>
      )}
      renderRightItem={(item) =>
        item.website ? (
          <a
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {new URL(item.website).hostname.replace('www.', '')}
          </a>
        ) : null
      }
    />
  );
}
