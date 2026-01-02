import { useEffect, useRef, useState } from "react";
import axios from "axios";

const REFRESH_INTERVAL_MS = 15000; // 15 seconds
const MAX_BACKOFF_MS = 60000; // 60 seconds

const useGasPrice = (apiKey) => {
  const [gasPrice, setGasPrice] = useState(null);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL_MS / 1000);
  const [error, setError] = useState(null);
  const refreshMsRef = useRef(REFRESH_INTERVAL_MS);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    if (!apiKey) {
      setError(
        "Missing Etherscan API key. Set REACT_APP_ETHERSCAN_API_KEY in .env.local."
      );
      return () => {
        isMountedRef.current = false;
      };
    }

    const fetchGasPrice = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await axios.get(
          `https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=${apiKey}`,
          { signal: controller.signal }
        );
        const result = response.data?.result;
        const isHexResult =
          typeof result === "string" && /^0x[0-9a-fA-F]+$/.test(result);
        if (!isHexResult) {
          const apiMessage =
            response.data?.error?.message ||
            response.data?.result ||
            response.data?.message;
          if (apiMessage) {
            throw new Error(`Etherscan error: ${apiMessage}`);
          }
          throw new Error("Invalid gas price response");
        }
        const parsed = Number.parseInt(result, 16);
        const gasPriceInGwei = parsed / 1e9;
        if (isMountedRef.current) {
          setGasPrice(gasPriceInGwei.toFixed(2));
          setError(null);
        }
        refreshMsRef.current = REFRESH_INTERVAL_MS;
      } catch (error) {
        if (error?.code === "ERR_CANCELED" || axios.isCancel?.(error)) {
          return;
        }
        console.error("Error fetching gas price:", error);
        if (isMountedRef.current) {
          setError(error?.message || "Error fetching gas price");
        }
        refreshMsRef.current = Math.min(
          MAX_BACKOFF_MS,
          refreshMsRef.current * 2
        );
      } finally {
        if (isMountedRef.current) {
          setCountdown(Math.round(refreshMsRef.current / 1000));
        }
      }
    };

    const updateCountdown = () => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          fetchGasPrice();
          return Math.round(refreshMsRef.current / 1000);
        }
        return prevCountdown - 1;
      });
    };

    fetchGasPrice(); // Initial fetch
    const interval = setInterval(updateCountdown, 1000); // Update countdown every second

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [apiKey]);

  return { gasPrice, countdown, error };
};

export default useGasPrice;
