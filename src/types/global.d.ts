declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: Record<string, unknown>[];
    setupAdmin?: () => Promise<unknown>;
  }
}

export {};
