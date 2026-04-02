import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';
import { getHeroImages } from '../lib/images';

const heroImages = getHeroImages();

interface HeroProps {
  startCarousel?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startCarousel = true }) => {
  const { t } = useTranslation();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (heroImages.length < 2 || !startCarousel) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages, startCarousel]);

  return (
    <section className="relative h-screen w-full flex items-end justify-start overflow-hidden bg-black z-10" id="hero">
      <div className="absolute inset-0 z-[1]">
        {heroImages.map((src, idx) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out scale-110 opacity-0",
              idx === currentIdx && "opacity-100 scale-100 duration-[2500ms] ease-out"
            )}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>

      {/* Hero Overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 px-[5%] pb-[25%] md:pb-[8%] max-w-[900px] flex flex-col items-start gap-4">
        <h1
          className="flex flex-col items-start gap-0.5 mb-2 opacity-0 -translate-y-[-30px] animate-[heroFadeUp_1.2s_cubic-bezier(0.22,1,0.36,1)_0.5s_forwards]"
          dangerouslySetInnerHTML={{ __html: t('hero_title').replace("class='hero-pre'", "class='font-heading italic font-normal text-[clamp(1.8rem,3vw,2.8rem)] text-[#DBBE85] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]'").replace("class='hero-main'", "class='font-heading font-bold text-[clamp(4rem,8vw,8rem)] leading-[0.9] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]'") }}
        />
        <p className="opacity-0 -translate-y-[-20px] animate-[heroFadeUp_1.2s_cubic-bezier(0.22,1,0.36,1)_0.8s_forwards] font-body font-normal text-white/90 text-[clamp(1rem,2vw,1.5rem)] max-w-[700px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] tracking-wide">
          {t('hero_subtitle')}
        </p>

      </div>
    </section>
  );
};

export default Hero;
