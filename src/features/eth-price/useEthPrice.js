import { useEffect, useRef, useState } from "react";
import axios from "axios";
import getRefreshIntervalMs from "../../shared/config/refreshInterval";

const GENERIC_ETH_PRICE_ERROR_MESSAGE = "Error fetching ETH price";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=365";
const MIN_REFRESH_MS = 60000;

const useEthPrice = () => {
  const baseRefreshMs = getRefreshIntervalMs();
  const refreshMs = Math.max(baseRefreshMs, MIN_REFRESH_MS);
  const [price, setPrice] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const fetchEthPrice = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await axios.get(COINGECKO_URL, {
          signal: controller.signal,
        });
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

        if (isMountedRef.current) {
          setPrice(lastPoint.value.toFixed(2));
          setHistory(mapped);
          setError(null);
        }
      } catch (error) {
        if (error?.code === "ERR_CANCELED" || axios.isCancel?.(error)) {
          return;
        }
        console.error("Error fetching ETH price:", error);
        if (isMountedRef.current) {
          setError(error?.message || GENERIC_ETH_PRICE_ERROR_MESSAGE);
        }
      }
    };

    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, refreshMs);

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [refreshMs]);

  const status = error ? "error" : price ? "ready" : "loading";

  return { price, history, error, status };
};

export default useEthPrice;
