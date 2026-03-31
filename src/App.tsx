import { Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './hooks/useTranslation';
import { useFadeIn } from './hooks/useFadeIn';
import { useImagePreloader } from './hooks/useImagePreloader';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

function App() {
  useFadeIn();
  const { imagesLoaded, progress } = useImagePreloader();

  return (
    <TranslationProvider>
      <LoadingScreen isLoading={!imagesLoaded} progress={progress} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </TranslationProvider>
  );
}

export default App;
