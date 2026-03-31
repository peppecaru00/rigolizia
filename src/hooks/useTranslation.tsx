import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations.json';

type Language = 'en' | 'it';

interface TranslationContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(
    (localStorage.getItem('preferredLang') as Language) || 'en'
  );

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('preferredLang', newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    const dictionary = (translations as any)[lang];
    return dictionary[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within a TranslationProvider');
  return context;
};
