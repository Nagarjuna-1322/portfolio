import { useState, useEffect } from 'react';
import { subscribeToVisitorCount } from '../lib/firebase';

export function useVisitorCount() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToVisitorCount((count, liveStatus) => {
      setVisitorCount(count);
      setIsLive(liveStatus);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { visitorCount, isLive, loading };
}
