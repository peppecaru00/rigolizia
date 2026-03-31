import { TranslationProvider } from './hooks/useTranslation';
import { useFadeIn } from './hooks/useFadeIn';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IconicPlaces from './components/IconicPlaces';
import Community from './components/Community';
import Visit from './components/Visit';
import Footer from './components/Footer';

function App() {
  useFadeIn();

  return (
    <TranslationProvider>
      <div className="bg-cream min-h-screen">
        <Navbar />
        <Hero />
        <IconicPlaces />
        <Community />
        <Visit />
        <Footer />
      </div>
    </TranslationProvider>
  );
}

export default App;
