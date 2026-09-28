import { useEffect, useRef } from 'react';

export default function useGameLoop(callback, isRunning, intervalMs) {
  const callbackRef = useRef(callback);

  useEffect(function () {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(function () {
    if (!isRunning) {
      return;
    }
    let lastTime = Date.now();

    const id = setInterval(function () {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      callbackRef.current(dt);
    }, intervalMs);

    return function () {
      clearInterval(id);
    };
  }, [isRunning, intervalMs]);
}
