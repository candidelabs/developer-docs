import React from "react";

export default function Table({
  items,
  leftHeading,
  centerHeading,
  rightHeading,
  farRightHeading,
  renderLeftItem,
  renderCenterItem,
  renderRightItem,
  renderFarRightItem,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th align="left">{leftHeading}</th>
          {centerHeading && <th align="left">{centerHeading}</th>}
          <th align="left">{rightHeading}</th>
          {farRightHeading && <th align="left">{farRightHeading}</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td align="left">{renderLeftItem(item)}</td>
            {renderCenterItem && <td align="left">{renderCenterItem(item)}</td>}
            <td align="left">{renderRightItem(item)}</td>
            {renderFarRightItem && (
              <td align="left">{renderFarRightItem(item)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Function to render the value based on its type
function renderValue(value) {
  return <span>{String(value)}</span>;
}

// Nested type definitions (a row whose `type` is an array of rows) are
// flattened into dotted-path rows: nested <table> elements inside cells do
// not survive the HTML-to-markdown conversion that produces llms.txt.
function flattenItems(items, prefix = "") {
  return items.flatMap((item) => {
    const key = item.key === undefined ? "" : String(item.key);
    const fullKey = prefix && key ? `${prefix}.${key}` : key || prefix;
    if (Array.isArray(item.type)) {
      return [
        { ...item, key: fullKey, type: "object" },
        ...flattenItems(item.type, fullKey),
      ];
    }
    return [{ ...item, key: fullKey }];
  });
}

// Main DataTable component
export function DataTable({ items }) {
  if (!items || items.length === 0) return null;

  const rows = flattenItems(items);

  // Extract all unique keys from the data
  const allKeys = Array.from(
    new Set(rows.flatMap((item) => Object.keys(item)))
  );

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {allKeys.map((key, index) => (
            <th key={index} align="left">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {allKeys.map((key, colIndex) => (
              <td key={colIndex} align="left" style={{ padding: "8px" }}>
                {key === "key" && (
                  <code>
                    <span style={{ color: "#22c916" }}>{renderValue(item[key])}</span>
                  </code>
                )}
                {key === "type" && (
                  <code>
                    <span style={{ color: "#e25894" }}>{renderValue(item[key])}</span>
                  </code>
                )}
                {key !== "key" && key !== "type" && renderValue(item[key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
