import { DEFAULT_REFRESH_INTERVAL_MS } from "../GasPrice/constants";

const getRefreshIntervalMs = () => {
  const rawValue = process.env.REACT_APP_REFRESH_INTERVAL_MS;
  const parsed = Number.parseInt(rawValue, 10);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return DEFAULT_REFRESH_INTERVAL_MS;
};

export default getRefreshIntervalMs;
