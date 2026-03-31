import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TranslationProvider } from './hooks/useTranslation';
import { useFadeIn } from './hooks/useFadeIn';
import { useImagePreloader } from './hooks/useImagePreloader';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

// Component to handle scrolling to hash fragments
function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  return null;
}

function App() {
  useFadeIn();
  const { imagesLoaded, progress } = useImagePreloader();

  return (
    <TranslationProvider>
      <LoadingScreen isLoading={!imagesLoaded} progress={progress} />
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </TranslationProvider>
  );
}

export default App;
