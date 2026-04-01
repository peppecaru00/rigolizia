import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
const Navbar: React.FC = () => {
  const location = useLocation();
  const isGallery = location.pathname === '/gallery';
  const isHistory = location.pathname === '/history';
  const { lang, setLang, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#places', label: 'nav_places' },
    { href: '/#community', label: 'nav_community' },
    { href: '/#visit', label: 'nav_visit' },
    { href: '/history', label: 'nav_history', isRoute: true },
    { href: '/gallery', label: 'nav_gallery', isRoute: true },
  ];

  const isDarkText = scrolled || mobileActive || isGallery || isHistory;

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ease-out py-3 h-[60px] flex items-center',
      isDarkText && 'bg-[#FFF9F0]/92 backdrop-blur-[20px] shadow-[0_1px_20px_rgba(44,24,16,0.06)] border-b border-black/5',
      mobileActive && 'bg-[#FFF9F0]'
    )}>
      <div className="container mx-auto px-8 max-w-[1440px] flex justify-between items-center h-full relative z-[110]">
        <Link to="/" className={cn(
          "font-heading font-bold text-[1.8rem] flex items-center tracking-tight transition-colors duration-400 leading-none",
          isDarkText ? "text-[#C8A96E]" : "text-white"
        )}>
          Rigolizia
        </Link>

        <div className="flex items-center gap-12">
          <ul className={cn(
            "flex gap-12 list-none items-center",
            "hidden lg:flex"
          )}>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link 
                  to={link.href}
                  className={cn(
                    "text-[1.1rem] font-body font-bold uppercase tracking-[0.12em] transition-all duration-[300ms] ease-out",
                    isDarkText ? "text-[#2C1810] hover:text-[#B85C38]" : "text-white hover:text-white/70"
                  )}
                  onClick={() => setMobileActive(false)}
                >
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>

          <div 
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button 
              className={cn(
                "h-10 px-4 border rounded-full flex items-center gap-1 font-body font-bold text-[0.75rem] transition-all duration-300 outline-none",
                isDarkText 
                  ? "border-black/10 text-[#2C1810] hover:border-[#B85C38] hover:bg-[#B85C38]/5" 
                  : "border-white/30 text-white hover:border-white/60 hover:bg-white/10"
              )}
              onClick={() => setLangOpen(!langOpen)}
            >
              <span>{lang.toUpperCase()}</span>
              <ChevronDown className={cn(
                "w-[14px] h-[14px] transition-transform duration-300",
                langOpen && "rotate-180"
              )} />
            </button>

            <div className={cn(
              "absolute top-[calc(100%+4px)] right-0 bg-white rounded-xl shadow-[0_20px_60px_rgba(44,24,16,0.12)] border border-[#F4ECD9]/10 flex flex-col min-w-[140px] py-2 transition-all duration-200 z-[110] before:content-[''] before:absolute before:top-[-12px] before:inset-x-0 before:h-[12px]",
              langOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-2 pointer-events-none"
            )}>
              <button 
                onClick={() => { setLang('en'); setLangOpen(false); }}
                className="w-full text-left px-4 py-2 font-body text-[0.85rem] text-[#2C1810] hover:bg-[#B85C38]/10 hover:text-[#B85C38] transition-colors outline-none"
              >
                English
              </button>
              <button 
                onClick={() => { setLang('it'); setLangOpen(false); }}
                className="w-full text-left px-4 py-2 font-body text-[0.85rem] text-[#2C1810] hover:bg-[#B85C38]/10 hover:text-[#B85C38] transition-colors outline-none"
              >
                Italiano
              </button>
            </div>
          </div>


          <button 
            className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1.5 focus:outline-none relative z-[1001]"
            onClick={() => {
              setMobileActive(!mobileActive);
              document.body.classList.toggle('no-scroll', !mobileActive);
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} className={cn(
                "block w-full h-[2px] rounded-full transition-all duration-300 origin-center",
                isDarkText ? "bg-[#2C1810]" : "bg-white",
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
        "fixed top-0 left-0 w-full h-[100dvh] bg-[#FFF9F0] pointer-events-none opacity-0 translate-x-full transition-all duration-500 ease-in-out z-[90] flex flex-col items-center justify-center gap-8 p-6 lg:hidden overflow-y-auto",
        mobileActive && "opacity-100 translate-x-0 pointer-events-auto"
      )}>
        {navLinks.map(link => (
          <Link 
            key={link.href}
            to={link.href}
            className="text-[1.8rem] sm:text-[2.2rem] font-body font-bold uppercase tracking-[0.12em] text-[#2C1810] hover:text-[#B85C38] transition-all duration-300"
            onClick={() => {
              setMobileActive(false);
              document.body.classList.remove('no-scroll');
            }}
          >
            {t(link.label)}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
