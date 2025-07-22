export function logEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('[Analytics] Event:', eventName, params || {});
    window.gtag('event', eventName, params || {});
  }
}
