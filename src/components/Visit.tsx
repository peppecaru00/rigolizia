import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Visit: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-[var(--space-xl)] bg-[#FAF3E8]" id="visit">
      <div className="container mx-auto px-4 md:px-14 max-w-[1440px]">
        <div className="section-header text-center mb-[var(--space-3xl)] fade-in px-4 md:px-0">
          <span className="block font-body font-bold text-[1rem] tracking-[0.25em] uppercase text-[#A8893E] mb-[var(--space-sm)]">
            {t('visit_label')}
          </span>
          <h2 className="font-heading font-semibold text-[clamp(2.5rem,5vw,4rem)] text-[#2C1810] mb-[var(--space-md)] leading-tight tracking-[-0.015em]">
            {t('visit_title')}
          </h2>
          <p className="font-body font-light text-[1.15rem] leading-[1.85] text-[#5A4636] mx-auto max-w-[65ch] tracking-[0.02em]">
            {t('visit_subtitle')}
          </p>
        </div>

        <div className="map-full fade-in shadow-[0_8px_40px_rgba(44,24,16,0.1)] border border-black/5 rounded-[32px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12713.882484393661!2d15.0016024!3d36.9328225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13110a3f8a49c3b1%3A0x1f063a8a80479f64!2sRigolizia%2C%2096017%20Noto%20SR!5e0!3m2!1sen!2sit!4v1711893000000!5m2!1sen!2sit"
            width="100%"
            height="550"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Rigolizia"
          />
        </div>
      </div>
    </section>
  );
};

export default Visit;
