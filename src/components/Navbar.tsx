import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';
import { ChevronDown } from 'lucide-react';
const Navbar: React.FC = () => {
  const { lang, setLang, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#places', label: 'nav_places' },
    { href: '#community', label: 'nav_community' },
    { href: '#visit', label: 'nav_visit' },
  ];

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ease-out py-3 h-[60px] flex items-center',
      scrolled && 'bg-[#FFF9F0]/92 backdrop-blur-[20px] shadow-[0_1px_20px_rgba(44,24,16,0.06)] border-b border-black/5',
      mobileActive && 'h-screen'
    )}>
      <div className="container mx-auto px-8 max-w-[1440px] flex justify-between items-center h-full">
        <a href="#" className={cn(
          "font-heading font-bold text-[1.8rem] flex items-center tracking-tight transition-colors duration-400 leading-none",
          (scrolled || mobileActive) ? "text-[#C8A96E]" : "text-white"
        )}>
          Rigolizia
        </a>

        <div className="flex items-center gap-12">
          <ul className={cn(
            "flex gap-12 list-none items-center",
            "hidden lg:flex"
          )}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  className={cn(
                    "text-[1.1rem] font-body font-bold uppercase tracking-[0.12em] transition-all duration-[300ms] ease-out",
                    (scrolled || mobileActive) ? "text-[#2C1810] hover:text-[#B85C38]" : "text-white hover:text-white/70"
                  )}
                  onClick={() => setMobileActive(false)}
                >
                  {t(link.label)}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative group">
            <button 
              className={cn(
                "h-10 px-4 border rounded-full flex items-center gap-1 font-body font-bold text-[0.75rem] transition-all duration-300",
                (scrolled || mobileActive) 
                  ? "border-black/10 text-[#2C1810] hover:border-[#B85C38] hover:bg-[#B85C38]/5" 
                  : "border-white/30 text-white hover:border-white/60 hover:bg-white/10"
              )}
            >
              <span>{lang.toUpperCase()}</span>
              <ChevronDown className={cn(
                "w-[14px] h-[14px] transition-transform duration-300 group-hover:rotate-180"
              )} />
            </button>

            <div className="absolute top-[calc(100%+4px)] right-0 bg-white rounded-xl shadow-[0_20px_60px_rgba(44,24,16,0.12)] border border-[#F4ECD9]/10 invisible group-hover:visible group-hover:opacity-100 opacity-0 flex flex-col min-w-[140px] py-2 transition-all duration-200 z-[110] before:content-[''] before:absolute before:top-[-12px] before:inset-x-0 before:h-[12px]">
              <button 
                onClick={() => setLang('en')}
                className="w-full text-left px-4 py-2 font-body text-[0.85rem] text-[#2C1810] hover:bg-[#B85C38]/10 hover:text-[#B85C38] transition-colors"
              >
                English
              </button>
              <button 
                onClick={() => setLang('it')}
                className="w-full text-left px-4 py-2 font-body text-[0.85rem] text-[#2C1810] hover:bg-[#B85C38]/10 hover:text-[#B85C38] transition-colors"
              >
                Italiano
              </button>
            </div>
          </div>

          <button 
            className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1.5 focus:outline-none z-[1000]"
            onClick={() => {
              setMobileActive(!mobileActive);
              document.body.classList.toggle('no-scroll', !mobileActive);
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} className={cn(
                "block w-full h-[2px] rounded-full transition-all duration-300 origin-center",
                (scrolled || mobileActive) ? "bg-[#2C1810]" : "bg-white",
                mobileActive && i === 0 && "rotate-45 translate-y-[8px]",
                mobileActive && i === 1 && "opacity-0 -translate-x-2",
                mobileActive && i === 2 && "-rotate-45 -translate-y-[8px]"
              )} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={cn(
        "fixed inset-0 top-0 left-0 bg-[#FFF9F0] pointer-events-none opacity-0 translate-x-full transition-all duration-500 ease-in-out z-[90] flex flex-col items-center justify-center gap-12 p-12 lg:hidden",
        mobileActive && "opacity-100 translate-x-0 pointer-events-auto"
      )}>
        {navLinks.map(link => (
          <a 
            key={link.href}
            href={link.href}
            className="text-[2.2rem] font-body font-bold uppercase tracking-[0.12em] text-[#2C1810] hover:text-[#B85C38] transition-all duration-300"
            onClick={() => {
              setMobileActive(false);
              document.body.classList.remove('no-scroll');
            }}
          >
            {t(link.label)}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
