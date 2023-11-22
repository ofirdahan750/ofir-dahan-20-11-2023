// useDebounce.ts
import { useRef, useCallback } from "react";

const useDebounce = <F extends (...args: any[]) => any>(
  callback: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  const timerRef = useRef<number | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<F>) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
};

export default useDebounce;
