import React from 'react';
import { cn } from '../lib/utils';
import { useTranslation } from '../hooks/useTranslation';

interface LoadingScreenProps {
  isLoading: boolean;
  progress: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, progress }) => {
  const { lang } = useTranslation();
  
  return (
    <div 
      className={cn(
        "fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#1a0f0a] transition-all duration-1000 ease-in-out font-body",
        !isLoading && "opacity-0 pointer-events-none translate-y-[-10px] blur-sm invisible scale-105 duration-1000 delay-500"
      )}
    >
      <div className="flex flex-col items-center gap-8 translate-y-[-20%]">
        <h1 className="font-heading font-medium italic text-[3.5rem] text-[#DBBE85] tracking-widest leading-none drop-shadow-[0_4px_30px_rgba(219,190,133,0.3)] animate-pulse">
          Rigolizia
        </h1>
        
        <div className="w-[200px] h-[1px] bg-white/10 rounded-full overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div 
            className="absolute top-0 left-0 h-full bg-[#C8A96E] transition-all duration-[600ms] ease-out shadow-[0_0_10px_#C8A96E]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <span className="text-[#DBBE85]/60 text-[0.8rem] tracking-[0.2em] font-light uppercase opacity-80">
          {lang === 'it' ? 'Caricamento' : 'Loading'} {progress}%
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
