import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import content from '../data/content.json';
import Carousel from './Carousel';

const IconicPlaces: React.FC = () => {
  const { lang, t } = useTranslation();
  
  // Get the places based on current language
  const places = (content as any)[lang]?.places || [];

  return (
    <section className="relative py-[var(--space-3xl)] bg-[#FAF3E8] before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#DBBE85] before:to-transparent" id="places">
      <div className="container mx-auto px-14 max-w-[1440px]">
        <div className="section-header text-center mb-[var(--space-3xl)] fade-in">
          <span className="block font-body font-bold text-[1rem] tracking-[0.25em] uppercase text-[#A8893E] mb-[var(--space-sm)]">
            {t('places_label')}
          </span>
          <h2 className="font-heading font-semibold text-[clamp(2.5rem,5vw,4rem)] text-[#2C1810] mb-[var(--space-md)] leading-tight tracking-[-0.015em]">
            {t('places_title')}
          </h2>
          <p className="font-body font-light text-[1.15rem] leading-[1.85] text-[#5A4636] mx-auto max-w-[65ch] tracking-[0.02em]">
            {t('places_subtitle')}
          </p>
        </div>

        <div className="fade-in-scale">
          <Carousel id="places-carousel" autoplay={true} interval={7000} gap={32}>
            {places.map((place: any) => (
              <div key={place.id} className="min-w-full relative group overflow-hidden rounded-[32px]">
                <img 
                  src={place.image} 
                  alt={place.alt} 
                  className="w-full h-[680px] object-cover rounded-[32px] shadow-[0_8px_40px_rgba(44,24,16,0.1)] transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/75 via-[#2C1810]/30 to-transparent transition-opacity duration-700 p-[var(--space-2xl)] px-[var(--space-xl)] pb-[var(--space-xl)] flex flex-col justify-end text-white">
                  <h3 className="font-heading font-semibold text-[clamp(1.4rem,3vw,2.2rem)] mb-[var(--space-xs)] leading-tight text-white drop-shadow-md">
                    {place.title}
                  </h3>
                  <p className="font-body font-light text-[1rem] leading-[1.85] text-white/85 max-w-[50ch] drop-shadow-md">
                    {place.description}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default IconicPlaces;
