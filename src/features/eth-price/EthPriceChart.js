import React from "react";
import {
  ChartAxisLabel,
  ChartAxisLabels,
  ChartBody,
  ChartCard,
  ChartCurrency,
  ChartError,
  ChartFill,
  ChartGridLine,
  ChartHeader,
  ChartLine,
  ChartMeta,
  ChartMonthAxis,
  ChartMonthLabel,
  ChartPrice,
  ChartStatus,
  ChartSvg,
  ChartTitle,
} from "./styles";

const buildSparkline = (history) => {
  if (!history || history.length === 0) {
    return null;
  }
  const values = history.map((point) => point.value);
  const seriesValues = values.length === 1 ? [values[0], values[0]] : values;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;
  const lastIndex = Math.max(seriesValues.length - 1, 1);

  const points = seriesValues
    .map((value, index) => {
      const x = (index / lastIndex) * 100;
      const y = 40 - ((value - minValue) / range) * 40;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const area = `0,40 ${points} 100,40`;
  const midValue = minValue + range / 2;

  return { points, area, minValue, maxValue, midValue };
};


const buildMonthLabels = (history) => {
  if (!history || history.length === 0) {
    return [];
  }
  const labels = [];
  const seen = new Set();
  for (const point of history) {
    const date = new Date(point.timestamp);
    if (Number.isNaN(date.getTime())) {
      continue;
    }
    const monthName = date.toLocaleString("en-US", { month: "short" });
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!seen.has(key)) {
      seen.add(key);
      labels.push(monthName.toLowerCase());
    }
  }
  return labels.slice(-12);
};
const formatAxisValue = (value) => {
  if (!Number.isFinite(value)) {
    return "";
  }
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

const EthPriceChart = ({ price, history, status, error }) => {
  const sparkline = buildSparkline(history);
  const monthLabels = buildMonthLabels(history);

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>Ethereum Price</ChartTitle>
        {status === "ready" ? (
          <ChartPrice>
            {price} <ChartCurrency>USD</ChartCurrency>
          </ChartPrice>
        ) : null}
      </ChartHeader>
      {status === "error" ? (
        <ChartError>{error}</ChartError>
      ) : status === "ready" && sparkline ? (
        <>
          <ChartBody>
            <ChartAxisLabels>
              <ChartAxisLabel>{formatAxisValue(sparkline.maxValue)}</ChartAxisLabel>
              <ChartAxisLabel>{formatAxisValue(sparkline.midValue)}</ChartAxisLabel>
              <ChartAxisLabel>{formatAxisValue(sparkline.minValue)}</ChartAxisLabel>
            </ChartAxisLabels>
            <ChartSvg viewBox="0 0 100 40" preserveAspectRatio="none">
              <ChartGridLine x1="0" x2="100" y1="0.5" y2="0.5" />
              <ChartGridLine x1="0" x2="100" y1="20" y2="20" />
              <ChartGridLine x1="0" x2="100" y1="39.5" y2="39.5" />
              <ChartFill points={sparkline.area} />
              <ChartLine points={sparkline.points} />
            </ChartSvg>
          </ChartBody>
          {monthLabels.length ? (
            <ChartMonthAxis>
              {monthLabels.map((label, index) => (
                <ChartMonthLabel key={`${label}-${index}`}>
                  {label}
                </ChartMonthLabel>
              ))}
            </ChartMonthAxis>
          ) : null}
          <ChartMeta>Last 12 months, powered by CoinGecko.</ChartMeta>
        </>
      ) : (
        <ChartStatus>Loading ETH price...</ChartStatus>
      )}
    </ChartCard>
  );
};

export default EthPriceChart;
