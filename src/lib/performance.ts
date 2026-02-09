/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals for production performance optimization
 */

export function reportWebVitals(metric: any) {
  const { name, value, id, rating } = metric;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: Math.round(value),
      rating,
      id,
    });
  }

  // Send to analytics in production
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    window.gtag?.('event', name, {
      value: Math.round(value),
      metric_id: id,
      metric_rating: rating,
    });

    // Example: Send to custom analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, value, id, rating }),
    }).catch(console.error);
  }
}

/**
 * Performance thresholds based on Core Web Vitals
 */
export const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
};

/**
 * Custom performance marks for measuring specific operations
 */
export const performanceMark = {
  start: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`);
    }
  },
  
  end: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      console.log(`[Performance] ${name}: ${Math.round(measure.duration)}ms`);
    }
  },
};
