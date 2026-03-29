import React, { useState, useEffect } from "react";
import styles from "./banner.module.css";

const LABELS = [
  "Onchain Neobanks",
  "Dollar Savings",
  "Agent Wallets",
  "Remittance Apps",
  "Onchain Treasuries",
  "Creator Tipping",
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);

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
          <button
            className={styles.banner__copy}
            onClick={() => {
              navigator.clipboard.writeText('npm install abstractionkit');
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            title="Copy to clipboard"
            aria-label="Copy install command"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="14" height="14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="14" height="14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            )}
          </button>
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
      </div>
    </div>
  );
};

export default Banner;
