import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and if performance API is available
    if (process.env.NODE_ENV !== 'production' || !window.performance) {
      return;
    }

    const metrics: PerformanceMetrics = {};

    // Measure First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
      }
    });

    observer.observe({ entryTypes: ['paint'] });

    // Measure Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        metrics.fid = (entry as any).processingStart - entry.startTime;
      }
    });

    fidObserver.observe({ entryTypes: ['first-input'] });

    // Measure Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      metrics.cls = clsValue;
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Log metrics after page load
    const logMetrics = () => {
      setTimeout(() => {
        console.log('Performance Metrics:', metrics);
        
        // You can send these metrics to your analytics service
        // Example: analytics.track('performance_metrics', metrics);
      }, 5000);
    };

    if (document.readyState === 'complete') {
      logMetrics();
    } else {
      window.addEventListener('load', logMetrics);
    }

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
