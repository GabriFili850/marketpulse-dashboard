import { useCallback, useEffect, useRef } from "react";

const usePollingRequest = ({
  fetcher,
  intervalMs,
  onSuccess,
  onError,
  enabled = true,
  immediate = true,
  shouldIgnoreError,
}) => {
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(false);
  const fetcherRef = useRef(fetcher);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const shouldIgnoreErrorRef = useRef(shouldIgnoreError);

  useEffect(() => {
    fetcherRef.current = fetcher;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    shouldIgnoreErrorRef.current = shouldIgnoreError;
  }, [fetcher, onSuccess, onError, shouldIgnoreError]);

  const run = useCallback(async () => {
    if (!enabled) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const result = await fetcherRef.current(controller.signal);
      if (isMountedRef.current) {
        onSuccessRef.current?.(result);
      }
    } catch (error) {
      if (shouldIgnoreErrorRef.current?.(error)) {
        return;
      }
      if (isMountedRef.current) {
        onErrorRef.current?.(error);
      }
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return;
    }

    isMountedRef.current = true;

    if (immediate) {
      run();
    }

    if (Number.isFinite(intervalMs) && intervalMs > 0) {
      const interval = setInterval(run, intervalMs);

      return () => {
        isMountedRef.current = false;
        clearInterval(interval);
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      };
    }

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [enabled, immediate, intervalMs, run]);

  return run;
};

export default usePollingRequest;
