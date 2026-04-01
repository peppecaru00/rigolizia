import { useEffect } from 'react';

export const useFadeIn = (deps: any[] = []) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px' 
      }
    );

    const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);
};
