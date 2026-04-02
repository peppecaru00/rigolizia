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

  useEffect(() => {
    let resizeTimeoutId: number;
    let pollInterval: number;

    const renderFbPlugin = () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = '';

      const fbPage = document.createElement('div');
      fbPage.className = 'fb-page';
      fbPage.setAttribute('data-href', FB_PAGE_URL);
      fbPage.setAttribute('data-tabs', 'timeline');
      fbPage.setAttribute('data-height', '800');
      fbPage.setAttribute('data-adapt-container-width', 'true');
      fbPage.setAttribute('data-small-header', 'true');
      fbPage.setAttribute('data-hide-cover', 'true');
      fbPage.setAttribute('data-show-facepile', 'false');

      containerRef.current.appendChild(fbPage);
      window.FB!.XFBML.parse(containerRef.current);
    };

    // Poll until window.FB is available (SDK loads asynchronously)
    pollInterval = window.setInterval(() => {
      if (window.FB) {
        clearInterval(pollInterval);
        renderFbPlugin();
      }
    }, 200);

    const handleResize = () => {
      clearTimeout(resizeTimeoutId);
      if (window.FB) {
        resizeTimeoutId = window.setTimeout(renderFbPlugin, 500);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(resizeTimeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [lang]);

  return (
    <section className="py-[var(--space-xl)] bg-[#FFF9F0]" id="community">
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

        <div className="fade-in-scale flex justify-center w-full max-w-[500px] mx-auto">
          <div ref={containerRef} className="w-full flex justify-center" />
        </div>
      </div>
    </section>
  );
};

export default Community;
