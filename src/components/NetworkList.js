import React from "react";

const networks = [
  { src: "/img/networks/1.png", name: "Ethereum" },
  { src: "/img/networks/42161.png", name: "Arbitrum" },
  { src: "/img/networks/10.png", name: "Optimism" },
  { src: "/img/networks/137.png", name: "Polygon" },
  { src: "/img/networks/100.svg", name: "Gnosis" },
  { src: "/img/networks/8453.png", name: "Base" },
  { src: "/img/networks/5567.png", name: "Celo" },
  { src: "/img/networks/9745.svg", name: "Plasma" },
  { src: "/img/networks/56.png", name: "BnB Chain" },
  { src: "/img/networks/480.svg", name: "World Chain" },
  { src: "/img/networks/43114.png", name: "Avalanche" },
];

export function NetworkList() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "flex-start", margin: "0.5rem 0" }}>
      {networks.map(({ src, name }) => (
        <div
          key={name}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}
        >
          <img
            src={src}
            alt={name}
            style={{ width: "36px", height: "36px", objectFit: "contain" }}
          />
          <span style={{ fontSize: "0.65rem", opacity: 0.6, whiteSpace: "nowrap" }}>{name}</span>
        </div>
      ))}
    </div>
  );
}
