// lib/analytics.ts
export const logEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Event: ${eventName}`, params);
    }
  }
};
