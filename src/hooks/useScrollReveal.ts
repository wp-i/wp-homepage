import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(() => {
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return prefersReducedMotion || !('IntersectionObserver' in window);
  });

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (isVisible || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px 0px -24% 0px',
        threshold: 0.14,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return { ref, isVisible } as const;
}
