import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  id: string;
  autoplay?: boolean;
  interval?: number;
  gap?: number;
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({
  autoplay = false,
  interval = 7000,
  gap = 24, // gap is in pixels (2rem)
  children
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<number | null>(null);

  const total = children.length;

  const next = (isManual = false) => {
    if (isManual) stopAutoplay();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prev = (isManual = false) => {
    if (isManual) stopAutoplay();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goTo = (index: number) => {
    stopAutoplay();
    setCurrentIndex(index);
  };

  const startAutoplay = () => {
    if (!autoplay) return;
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, interval);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [autoplay, total]);

  useEffect(() => {
    if (trackRef.current && trackRef.current.children[0]) {
      const slideWidth = (trackRef.current.children[0] as HTMLElement).offsetWidth;
      trackRef.current.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
    }
  }, [currentIndex, gap]);

  // Touch support
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next(true) : prev(true);
  };

  return (
    <div className="relative rounded-[32px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div
        ref={trackRef}
        className="flex transition-transform duration-700 ease-in-out"
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>

      <button
        onClick={() => prev(true)}
        className="absolute left-4 md:left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/80 backdrop-blur-md hidden md:flex items-center justify-center shadow-lg transition-all active:scale-95 border border-black/10 group transform-gpu"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5px] text-primary transition-transform duration-300 group-hover:scale-125" />
      </button>

      <button
        onClick={() => next(true)}
        className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/80 backdrop-blur-md hidden md:flex items-center justify-center shadow-lg transition-all active:scale-95 border border-black/10 group transform-gpu"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5px] text-primary transition-transform duration-300 group-hover:scale-125" />
      </button>

      <div className="flex justify-center gap-2 mt-8">
        {children.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-primary scale-125' : 'bg-[#c8a96e33]'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
