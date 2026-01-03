import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import getRefreshIntervalMs from "../../shared/config/refreshInterval";
import usePollingRequest from "../../shared/hooks/usePollingRequest";

const GENERIC_ETH_PRICE_ERROR_MESSAGE = "Error fetching ETH price";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=365";
const MIN_REFRESH_MS = 60000;

const useEthPrice = () => {
  const baseRefreshMs = getRefreshIntervalMs();
  const refreshMs = Math.max(baseRefreshMs, MIN_REFRESH_MS);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const fetchEthPrice = useCallback(async (signal) => {
    const response = await axios.get(COINGECKO_URL, { signal });
    const points = response.data?.prices;
    if (!Array.isArray(points) || points.length === 0) {
      throw new Error("Invalid ETH price response");
    }
    const mapped = points
      .map(([timestamp, value]) => ({
        timestamp,
        value: Number.parseFloat(value),
      }))
      .filter((point) => Number.isFinite(point.value));
    const lastPoint = mapped[mapped.length - 1];
    if (!lastPoint) {
      throw new Error("Invalid ETH price response");
    }
    return mapped;
  }, []);

  const handleSuccess = useCallback((mapped) => {
    setHistory(mapped);
    setError(null);
  }, []);

  const handleError = useCallback((error) => {
    console.error("Error fetching ETH price:", error);
    setError(error?.message || GENERIC_ETH_PRICE_ERROR_MESSAGE);
  }, []);

  const shouldIgnoreError = useCallback(
    (error) => error?.code === "ERR_CANCELED" || axios.isCancel?.(error),
    []
  );

  usePollingRequest({
    fetcher: fetchEthPrice,
    intervalMs: refreshMs,
    onSuccess: handleSuccess,
    onError: handleError,
    shouldIgnoreError,
  });

  const price = useMemo(() => {
    if (!history.length) {
      return null;
    }
    const latestPoint = history[history.length - 1];
    if (!latestPoint || !Number.isFinite(latestPoint.value)) {
      return null;
    }
    return latestPoint.value.toFixed(2);
  }, [history]);

  const status = error ? "error" : price ? "ready" : "loading";

  return { price, history, error, status };
};

export default useEthPrice;
