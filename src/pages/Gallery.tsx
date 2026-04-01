import React, { useState, useMemo, useEffect } from 'react';
import { getGalleryImagesByCategory } from '../lib/images';
import { useTranslation } from '../hooks/useTranslation';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import GalleryLightbox from '../components/GalleryLightbox';

const getCategoryDisplayName = (cat: string, lang: string) => {
  if (cat === 'All') return lang === 'it' ? 'Tutte' : 'All';

  const parts = cat.split('-');
  let displayName = cat;

  if (parts.length >= 2) {
    displayName = lang === 'it' ? parts[0] : parts[1];
  } else {
    displayName = parts[0];
  }

  displayName = displayName.replace(/[_-]/g, ' ');
  return displayName.charAt(0).toUpperCase() + displayName.slice(1);
};

/** Returns the number of columns based on window width */
function useColumnCount() {
  const [cols, setCols] = useState(() => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCols(4);
      else if (w >= 1024) setCols(3);
      else if (w >= 640) setCols(2);
      else setCols(1);
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return cols;
}

/** Distributes items into columns in left-to-right order (round-robin) */
function distributeToColumns<T>(items: T[], colCount: number): { item: T; originalIndex: number }[][] {
  const columns: { item: T; originalIndex: number }[][] = Array.from({ length: colCount }, () => []);
  items.forEach((item, i) => {
    columns[i % colCount].push({ item, originalIndex: i });
  });
  return columns;
}

const Gallery: React.FC = () => {
  const { lang } = useTranslation();
  const colCount = useColumnCount();

  const categoryMap = useMemo(() => getGalleryImagesByCategory(), []);
  const availableCategories = Object.keys(categoryMap).sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    return a.localeCompare(b);
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeImages = categoryMap[activeCategory] || [];
  const columns = useMemo(() => distributeToColumns(activeImages, colCount), [activeImages, colCount]);

  return (
    <div className="min-h-screen bg-[#FAF3E8] pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C1810] mb-2">
            {lang === 'it' ? 'Galleria' : 'Gallery'}
          </h1>
          <p className="text-[#5A4636] text-lg">
            {lang === 'it' ? 'Un viaggio visivo attraverso Rigolizia' : 'A visual journey through Rigolizia'}
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#C8A96E] hover:text-[#B85C38] transition-colors font-body font-bold uppercase tracking-widest text-[0.85rem] border border-[#C8A96E]/20 hover:border-[#B85C38] px-6 py-3 rounded-full shrink-0"
        >
          <ArrowLeft size={16} />
          {lang === 'it' ? 'Torna alla Home' : 'Back to Home'}
        </Link>
      </div>

      {availableCategories.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-[#2C1810]/5">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full font-body font-bold uppercase tracking-widest text-[0.75rem] transition-all duration-300 border backdrop-blur-sm",
                activeCategory === cat
                  ? "bg-[#2C1810] text-[#FFF9F0] border-[#2C1810] shadow-md -translate-y-[1px]"
                  : "bg-transparent text-[#5A4636] border-[#2C1810]/15 hover:border-[#B85C38] hover:text-[#B85C38] hover:bg-[#B85C38]/5"
              )}
            >
              {getCategoryDisplayName(cat, lang)}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Layout - Left-to-Right Order */}
      {activeImages.length === 0 ? (
        <div className="py-20 text-center text-[#5A4636] font-body text-xl">
          {lang === 'it' ? 'Nessuna immagine trovata in questa categoria.' : 'No images found in this category.'}
        </div>
      ) : (
        <div className="flex gap-3 items-start">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-3">
              {col.map(({ item: src, originalIndex }) => (
                <button
                  key={src}
                  onClick={() => setLightboxIndex(originalIndex)}
                  className="w-full text-left relative group rounded-2xl overflow-hidden bg-[#E8E0D5] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-zoom-in"
                  aria-label={`View image ${originalIndex + 1}`}
                >
                  <img
                    src={src}
                    alt={`${getCategoryDisplayName(activeCategory, lang)} ${originalIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Bottom Label */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    <span className="text-white/90 text-xs font-bold tracking-widest drop-shadow-md">
                      {String(originalIndex + 1).padStart(2, '0')} — Rigolizia
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={activeImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default Gallery;