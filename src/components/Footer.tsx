import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#1a0f0a] text-white pt-[var(--space-3xl)] pb-[var(--space-xl)]">
      <div className="container mx-auto px-6 md:px-14 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 mb-16 md:mb-20 fade-in">
          <div className="flex flex-col gap-6">
            <h3 className="font-heading font-semibold text-[1.5rem] text-[#DBBE85]">Rigolizia</h3>
            <p className="font-body text-[1rem] leading-[1.85] text-white/70 max-w-[40ch]">
              {t('footer_description')}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-heading font-semibold text-[1.5rem] text-[#DBBE85]">
              {t('footer_explore')}
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <a href="#hero" className="font-body text-white/70 hover:text-[#B85C38] transition-colors">
                  {t('footer_home')}
                </a>
              </li>
              <li>
                <a href="#places" className="font-body text-white/70 hover:text-[#B85C38] transition-colors">
                  {t('nav_places')}
                </a>
              </li>
              <li>
                <a href="#community" className="font-body text-white/70 hover:text-[#B85C38] transition-colors">
                  {t('nav_community')}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-heading font-semibold text-[1.5rem] text-[#DBBE85]">
              {t('footer_connect')}
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <a href="https://www.facebook.com/883641484835884" target="_blank" rel="noopener noreferrer" className="font-body text-white/70 hover:text-[#B85C38] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-[var(--space-md)] flex justify-center">
          <p className="font-body text-[0.95rem] text-white/50" dangerouslySetInnerHTML={{ __html: t('footer_heart') }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
