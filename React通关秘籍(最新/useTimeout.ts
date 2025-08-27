import { useEffect, useRef } from "react";

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef<() => void>(callback);
  callbackRef.current = callback;

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  const cancel = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  };

  return cancel;
}
