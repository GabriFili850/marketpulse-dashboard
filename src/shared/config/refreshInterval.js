export const DEFAULT_REFRESH_INTERVAL_MS = 15000; // 15 seconds

const getRefreshIntervalMs = () => {
  const rawValue = process.env.REACT_APP_REFRESH_INTERVAL_MS;
  const parsed = Number.parseInt(rawValue, 10);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return DEFAULT_REFRESH_INTERVAL_MS;
};

export default getRefreshIntervalMs;
