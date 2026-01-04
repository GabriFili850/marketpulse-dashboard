import { useId } from "react";
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
  const chartId = useId();
  const headingId = `${chartId}-heading`;
  const svgTitleId = `${chartId}-title`;
  const svgDescId = `${chartId}-desc`;
  const rangeSummary = sparkline
    ? `Range ${formatAxisValue(sparkline.minValue)} to ${formatAxisValue(
        sparkline.maxValue
      )}.`
    : "";

  return (
    <ChartCard aria-labelledby={headingId}>
      <ChartHeader>
        <ChartTitle id={headingId}>Ethereum Price</ChartTitle>
        {status === "ready" ? (
          <ChartPrice>
            {price} <ChartCurrency>USD</ChartCurrency>
          </ChartPrice>
        ) : null}
      </ChartHeader>
      {status === "error" ? (
        <ChartError role="alert">{error}</ChartError>
      ) : status === "ready" && sparkline ? (
        <>
          <ChartBody>
            <ChartAxisLabels aria-hidden="true">
              <ChartAxisLabel>{formatAxisValue(sparkline.maxValue)}</ChartAxisLabel>
              <ChartAxisLabel>{formatAxisValue(sparkline.midValue)}</ChartAxisLabel>
              <ChartAxisLabel>{formatAxisValue(sparkline.minValue)}</ChartAxisLabel>
            </ChartAxisLabels>
            <ChartSvg
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              role="img"
              aria-labelledby={`${svgTitleId} ${svgDescId}`}
            >
              <title id={svgTitleId}>Ethereum price trend</title>
              <desc id={svgDescId}>
                Trend over the last 12 months. {rangeSummary}
              </desc>
              <ChartGridLine x1="0" x2="100" y1="0.5" y2="0.5" />
              <ChartGridLine x1="0" x2="100" y1="20" y2="20" />
              <ChartGridLine x1="0" x2="100" y1="39.5" y2="39.5" />
              <ChartFill points={sparkline.area} />
              <ChartLine points={sparkline.points} />
            </ChartSvg>
          </ChartBody>
          {monthLabels.length ? (
            <ChartMonthAxis aria-hidden="true">
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
        <ChartStatus role="status" aria-live="polite">
          Loading ETH price...
        </ChartStatus>
      )}
    </ChartCard>
  );
};

export default EthPriceChart;
