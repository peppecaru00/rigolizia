import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TranslationProvider } from './hooks/useTranslation';
import { useFadeIn } from './hooks/useFadeIn';
import { useImagePreloader } from './hooks/useImagePreloader';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import History from './pages/History';

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
  const { pathname } = useLocation();
  const { imagesLoaded, progress } = useImagePreloader();
  
  // Re-run animation observer when switching pages or finishing loading image assets
  useFadeIn([pathname, imagesLoaded]);

  return (
    <TranslationProvider>
      <LoadingScreen isLoading={!imagesLoaded} progress={progress} />
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home imagesLoaded={imagesLoaded} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </TranslationProvider>
  );
}

export default App;
