import React from "react";
import {
  ChartBody,
  ChartCard,
  ChartCurrency,
  ChartError,
  ChartFill,
  ChartHeader,
  ChartLine,
  ChartMeta,
  ChartPrice,
  ChartStatus,
  ChartSvg,
  ChartTitle,
} from "./EthPriceChart.styles";

const buildSparkline = (history) => {
  if (!history || history.length === 0) {
    return null;
  }
  const values = history.map((point) => point.value);
  const seriesValues =
    values.length === 1 ? [values[0], values[0]] : values;
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

  return { points, area };
};

const EthPriceChart = ({ price, history, status, error }) => {
  const sparkline = buildSparkline(history);

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
            <ChartSvg viewBox="0 0 100 40" preserveAspectRatio="none">
              <ChartFill points={sparkline.area} />
              <ChartLine points={sparkline.points} />
            </ChartSvg>
          </ChartBody>
          <ChartMeta>Last 12 months, powered by CoinGecko.</ChartMeta>
        </>
      ) : (
        <ChartStatus>Loading ETH price...</ChartStatus>
      )}
    </ChartCard>
  );
};

export default EthPriceChart;
