import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const FB_PAGE_URL = 'https://www.facebook.com/61585159655551';

declare global {
  interface Window {
    FB?: {
      XFBML: { parse: (el?: HTMLElement) => void };
    };
  }
}

const Community: React.FC = () => {
  const { t, lang } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Re-parse the XFBML whenever language changes so locale updates
  useEffect(() => {
    const tryParse = () => {
      if (window.FB && containerRef.current) {
        window.FB.XFBML.parse(containerRef.current);
      }
    };

    // Give the SDK a moment to load on first render
    const timer = setTimeout(tryParse, 300);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <section className="py-[var(--space-xl)] bg-[#FFF9F0] overflow-hidden" id="community">
      <div className="container mx-auto px-4 md:px-14 max-w-[1440px]">
        <div className="section-header text-center mb-[var(--space-xl)] fade-in px-4 md:px-0">
          <span className="block font-body font-bold text-[1rem] tracking-[0.25em] uppercase text-[#A8893E] mb-[var(--space-sm)]">
            {t('community_label')}
          </span>
          <h2 className="font-heading font-semibold text-[clamp(2.5rem,5vw,4rem)] text-[#2C1810] mb-[var(--space-md)] leading-tight tracking-[-0.015em]">
            {t('community_title')}
          </h2>
          <p className="font-body font-light text-[1.15rem] leading-[1.85] text-[#5A4636] mx-auto max-w-[65ch] tracking-[0.02em]">
            {t('community_subtitle')}
          </p>
        </div>

        <div className="fade-in-scale flex justify-center" ref={containerRef}>
          <div
            className="fb-page"
            data-href={FB_PAGE_URL}
            data-tabs="timeline"
            data-width="600"
            data-height="800"
            data-small-header="true"
            data-adapt-container-width="true"
            data-hide-cover="true"
            data-show-facepile="false"
          />
        </div>
      </div>
    </section>
  );
};

export default Community;
