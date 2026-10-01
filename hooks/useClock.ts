import { useSyncExternalStore } from 'react';

// Shared one-second ticker. Snapshots are rounded to the minute so components
// only re-render when the displayed hh:mm actually changes.
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  if (!timer) {
    timer = setInterval(() => listeners.forEach((listener) => listener()), 1000);
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
};

const getSnapshot = () => Math.floor(Date.now() / 60_000) * 60_000;
const getServerSnapshot = () => null;

/**
 * Current time (minute precision) as epoch ms, or null during SSR / hydration
 * so server and client markup match.
 */
export function useClock(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
