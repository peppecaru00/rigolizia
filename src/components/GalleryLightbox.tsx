import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const GalleryLightbox: React.FC<LightboxProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Pinch-to-zoom state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const lastTouchDist = useRef<number | null>(null);
  const lastTranslate = useRef({ x: 0, y: 0 });
  const isTouching = useRef(false);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const resetZoom = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  const goTo = (idx: number) => {
    resetZoom();
    setCurrentIndex(idx);
  };
  const prev = () => goTo(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  const next = () => goTo(currentIndex < images.length - 1 ? currentIndex + 1 : 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length, onClose]);

  // --- Touch handlers for pinch zoom + pan ---
  const getTouchDist = (t: React.TouchList) =>
    Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

  const onTouchStart = (e: React.TouchEvent) => {
    isTouching.current = true;
    if (e.touches.length === 2) {
      lastTouchDist.current = getTouchDist(e.touches);
    } else if (e.touches.length === 1) {
      touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastTranslate.current = translate;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      // Pinch to zoom
      const dist = getTouchDist(e.touches);
      if (lastTouchDist.current !== null) {
        const delta = dist / lastTouchDist.current;
        setScale((s) => Math.min(Math.max(s * delta, 1), 5));
      }
      lastTouchDist.current = dist;
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan when zoomed in
      const dx = e.touches[0].clientX - touchStartPos.current.x;
      const dy = e.touches[0].clientY - touchStartPos.current.y;
      setTranslate({ x: lastTranslate.current.x + dx, y: lastTranslate.current.y + dy });
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) lastTouchDist.current = null;

    // Swipe to navigate only when not zoomed
    if (scale === 1 && e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartPos.current.x;
      if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
    }
    isTouching.current = false;
  };

  // Double-tap to reset zoom
  const lastTap = useRef(0);
  const onTouchEndDbl = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      scale > 1 ? resetZoom() : setScale(2);
    }
    lastTap.current = now;
    onTouchEnd(e);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndDbl}
    >
      {/* Header */}
      <div className="absolute top-0 inset-x-0 p-4 md:p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="text-white/60 font-body tracking-widest text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors pointer-events-auto"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Image */}
      <div className="w-full h-full flex items-center justify-center p-4 md:p-16 overflow-hidden">
        <img
          ref={imgRef}
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Gallery detail ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain select-none shadow-2xl"
          style={{
            transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
            transition: isTouching.current ? 'none' : 'transform 0.2s ease',
            cursor: scale > 1 ? 'grab' : 'default',
            touchAction: 'none',
          }}
          loading="eager"
          draggable={false}
          onDoubleClick={() => (scale > 1 ? resetZoom() : setScale(2))}
        />
      </div>

      {/* Arrows — hide while zoomed in on mobile */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all active:scale-95 group transform-gpu border border-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 stroke-[2px] text-white transition-transform duration-300 group-hover:-translate-x-1" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all active:scale-95 group transform-gpu border border-white/10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 stroke-[2px] text-white transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </>
      )}

      {/* Zoom hint on mobile */}
      {scale === 1 && (
        <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none md:hidden">
          <span className="text-white/30 text-xs tracking-widest">Pinch to zoom · Swipe to navigate</span>
        </div>
      )}
    </div>
  );
};

export default GalleryLightbox;
