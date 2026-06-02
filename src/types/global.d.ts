declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: Record<string, unknown>[];
  }
}

export {};
