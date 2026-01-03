import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ETHERSCAN_API_BASE_URL,
  ETHERSCAN_CHAIN_ID,
  GENERIC_FETCH_ERROR_MESSAGE,
  MAX_BACKOFF_MS,
  MISSING_API_KEY_MESSAGE,
} from "./constants";
import getRefreshIntervalMs from "../../shared/config/refreshInterval";
import usePollingRequest from "../../shared/hooks/usePollingRequest";

const useGasPrice = ({ apiKey }) => {
  const baseRefreshMs = getRefreshIntervalMs();
  const [gasPrices, setGasPrices] = useState(null);
  const [countdown, setCountdown] = useState(() =>
    Math.round(baseRefreshMs / 1000)
  );
  const [error, setError] = useState(null);
  const refreshMsRef = useRef(baseRefreshMs);

  useEffect(() => {
    refreshMsRef.current = baseRefreshMs;
    setCountdown(Math.round(baseRefreshMs / 1000));
  }, [baseRefreshMs]);

  useEffect(() => {
    if (!apiKey) {
      setError(MISSING_API_KEY_MESSAGE);
      return;
    }
    setError(null);
  }, [apiKey]);

  const getNumericField = useCallback((source, keys) => {
    for (const key of keys) {
      const value = source?.[key];
      const parsed = Number.parseFloat(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
    return null;
  }, []);

  const fetchGasPrice = useCallback(
    async (signal) => {
      const requestUrl = `${ETHERSCAN_API_BASE_URL}?chainid=${ETHERSCAN_CHAIN_ID}&module=gastracker&action=gasoracle&apikey=${apiKey}`;
      const response = await axios.get(requestUrl, {
        signal,
      });
      if (response.data?.status === "0") {
        const apiMessage =
          response.data?.result ||
          response.data?.message ||
          response.data?.error?.message;
        throw new Error(`Etherscan error: ${apiMessage || "Unknown error"}`);
      }
      const oracle = Array.isArray(response.data?.result)
        ? response.data.result[0]
        : response.data?.result;
      if (typeof oracle === "string") {
        throw new Error(`Etherscan error: ${oracle}`);
      }
      const lowGas = getNumericField(oracle, [
        "SafeGasPrice",
        "safeGasPrice",
        "LowGasPrice",
        "lowGasPrice",
        "SafeGas",
        "safe",
        "low",
      ]);
      const averageGas = getNumericField(oracle, [
        "ProposeGasPrice",
        "proposeGasPrice",
        "AverageGasPrice",
        "averageGasPrice",
        "AverageGas",
        "average",
        "avg",
      ]);
      const highGas = getNumericField(oracle, [
        "FastGasPrice",
        "fastGasPrice",
        "HighGasPrice",
        "highGasPrice",
        "FastGas",
        "fast",
        "high",
      ]);
      if (
        !Number.isFinite(lowGas) ||
        !Number.isFinite(averageGas) ||
        !Number.isFinite(highGas)
      ) {
        throw new Error(
          `Invalid gas oracle response: ${JSON.stringify(oracle)}`
        );
      }
      return {
        low: lowGas.toFixed(2),
        average: averageGas.toFixed(2),
        high: highGas.toFixed(2),
      };
    },
    [apiKey, getNumericField]
  );

  const handleSuccess = useCallback(
    (prices) => {
      setGasPrices(prices);
      setError(null);
      refreshMsRef.current = baseRefreshMs;
      setCountdown(Math.round(refreshMsRef.current / 1000));
    },
    [baseRefreshMs]
  );

  const handleError = useCallback((error) => {
    console.error("Error fetching gas price:", error);
    setError(error?.message || GENERIC_FETCH_ERROR_MESSAGE);
    refreshMsRef.current = Math.min(MAX_BACKOFF_MS, refreshMsRef.current * 2);
    setCountdown(Math.round(refreshMsRef.current / 1000));
  }, []);

  const shouldIgnoreError = useCallback(
    (error) => error?.code === "ERR_CANCELED" || axios.isCancel?.(error),
    []
  );

  const runFetch = usePollingRequest({
    fetcher: fetchGasPrice,
    intervalMs: null,
    immediate: false,
    enabled: Boolean(apiKey),
    onSuccess: handleSuccess,
    onError: handleError,
    shouldIgnoreError,
  });

  useEffect(() => {
    if (!apiKey) {
      return;
    }
    runFetch();
    setCountdown(Math.round(refreshMsRef.current / 1000));
  }, [apiKey, runFetch]);

  useEffect(() => {
    if (!apiKey) {
      return;
    }
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          runFetch();
          return Math.round(refreshMsRef.current / 1000);
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [apiKey, runFetch]);

  const status = error ? "error" : gasPrices ? "ready" : "loading";

  return { gasPrices, countdown, error, status };
};

export default useGasPrice;
