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
      centerHeading="Address"
      rightHeading="Website"
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
          <span>{item.token}</span>
        </div>
      )}
      renderCenterItem={(item) => (
        <a
          href={`${item.blockExplorer}${item.address}`}
          target="_blank"
          rel="noopener noreferrer"
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
