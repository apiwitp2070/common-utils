/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from "react";

function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFn;
}

export default useDebounce;
