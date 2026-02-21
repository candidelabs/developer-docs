import React, { useState, useEffect } from "react";
import styles from "./banner.module.css";

const LABELS = [
  "Neobanks",
  "Dollar Savings Apps",
  "Remittance Apps",
  "Onchain Treasuries",
  "Creator Tipping",
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      // Fade out
      setVisible(false);
      // After fade-out completes, swap word and fade back in
      setTimeout(() => {
        setIndex(i => (i + 1) % LABELS.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.banner__container}>
      <div className={styles.banner__inner}>
        <div className={styles.banner__eyebrow}>
          ERC-4337 · EIP-7702 · Safe Accounts
        </div>
        <h1 className={styles.banner__title}>
          Build{" "}
          <span
            className={styles.banner__rotating}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-10px)",
            }}
          >
            {LABELS[index]}
          </span>
          {" "}on Ethereum
        </h1>
        <p className={styles.banner__subtitle}>
          Open source toolkit for Smart Accounts: gas sponsorship,
          passkeys, batch transactions, and account recovery.
        </p>
        <div className={styles.banner__install}>
          <span className={styles.banner__prompt}>$</span>
          <code>npm install abstractionkit</code>
        </div>
        <div className={styles.banner__actions}>
          <a href="/wallet/atelier-intro/" className={styles.banner__primary}>
            Get started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </a>
          <a href="/wallet/abstractionkit/introduction/" className={styles.banner__secondary}>
            Why AbstractionKit
          </a>
        </div>
        <div className={styles.banner__trust}>
          <span>10+ chains</span>
          <span className={styles.banner__dot}>·</span>
          <span>ERC-4337</span>
          <span className={styles.banner__dot}>·</span>
          <span>EIP-7702</span>
          <span className={styles.banner__dot}>·</span>
          <span>Open source</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
