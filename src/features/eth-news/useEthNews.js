import { useEffect, useRef, useState } from "react";
import axios from "axios";
import getRefreshIntervalMs from "../../shared/config/refreshInterval";

const DEFAULT_NEWS_API_URL =
  "https://min-api.cryptocompare.com/data/v2/news/?categories=ETH";
const MIN_REFRESH_MS = 300000;
const GENERIC_NEWS_ERROR_MESSAGE = "Error fetching Ethereum news";
const MAX_NEWS_ITEMS = 6;

const normalizeNewsItem = (item) => {
  if (!item) {
    return null;
  }
  const title = item.title || item.headline || item.name;
  const url = item.url || item.link || item.guid;
  if (!title || !url) {
    return null;
  }
  const source =
    item.source_info?.name ||
    item.source?.name ||
    item.source ||
    item.provider ||
    "Ethereum";
  const timestamp = item.published_on
    ? item.published_on * 1000
    : item.publishedAt
    ? Date.parse(item.publishedAt)
    : Date.now();
  return {
    id: item.id || item.guid || url,
    title,
    url,
    source,
    timestamp,
  };
};

const extractNewsItems = (data) => {
  if (!data) {
    return [];
  }
  const rawItems = Array.isArray(data.Data)
    ? data.Data
    : Array.isArray(data.articles)
    ? data.articles
    : Array.isArray(data.results)
    ? data.results
    : [];
  return rawItems.map(normalizeNewsItem).filter(Boolean).slice(0, MAX_NEWS_ITEMS);
};

const useEthNews = () => {
  const baseRefreshMs = getRefreshIntervalMs();
  const refreshMs = Math.max(baseRefreshMs, MIN_REFRESH_MS);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const fetchNews = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const requestUrl =
          process.env.REACT_APP_NEWS_API_URL || DEFAULT_NEWS_API_URL;
        const response = await axios.get(requestUrl, {
          signal: controller.signal,
        });
        const normalized = extractNewsItems(response.data);
        if (!normalized.length) {
          throw new Error("Invalid news response");
        }
        if (isMountedRef.current) {
          setItems(normalized);
          setError(null);
        }
      } catch (error) {
        if (error?.code === "ERR_CANCELED" || axios.isCancel?.(error)) {
          return;
        }
        console.error("Error fetching Ethereum news:", error);
        if (isMountedRef.current) {
          setError(error?.message || GENERIC_NEWS_ERROR_MESSAGE);
        }
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, refreshMs);

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [refreshMs]);

  const status = error ? "error" : items.length ? "ready" : "loading";

  return { items, error, status };
};

export default useEthNews;
