import { useEffect, useState } from 'react';

interface UseImagePreloadOptions {
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const useImagePreload = (src: string, options: UseImagePreloadOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      options.onLoad?.();
    };
    
    img.onerror = () => {
      setHasError(true);
      options.onError?.();
    };

    // Set priority loading if specified
    if (options.priority) {
      img.fetchPriority = 'high';
    }

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, options.priority, options.onLoad, options.onError]);

  return { isLoaded, hasError };
};

// Hook for preloading multiple images
export const useImagesPreload = (sources: string[], priority = false) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (!sources.length) return;

    let loadedImages = 0;
    const images: HTMLImageElement[] = [];

    sources.forEach((src) => {
      const img = new Image();
      
      img.onload = () => {
        loadedImages++;
        setLoadedCount(loadedImages);
        
        if (loadedImages === sources.length) {
          setAllLoaded(true);
        }
      };

      if (priority) {
        img.fetchPriority = 'high';
      }

      img.src = src;
      images.push(img);
    });

    return () => {
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [sources, priority]);

  return { loadedCount, allLoaded, progress: sources.length ? loadedCount / sources.length : 0 };
};
