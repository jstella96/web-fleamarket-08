import { useEffect, useState } from 'react';

interface useInfiniteScrollProps {
  loader: React.RefObject<HTMLDivElement>;
  asyncCallback: () => Promise<void>;
}

function useInfiniteScroll({ loader, asyncCallback }: useInfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const onIntersect = async ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isLoading) {
        setIsLoading(true);
        await asyncCallback();
        setIsLoading(false);
      }
    };

    let observer: IntersectionObserver;

    if (loader.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(loader.current);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, [loader, isLoading, asyncCallback]);

  return { isLoading };
}

export default useInfiniteScroll;
