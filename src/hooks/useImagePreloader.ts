import { useState, useEffect } from 'react';
import { getHeroImages, getPlacesImages } from '../lib/images';

export function useImagePreloader() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const heroImages = getHeroImages();
    const placesImages = getPlacesImages();
    // We could add more static images here, but the carousel images are the largest
    const allImages = [...heroImages, ...placesImages];
    
    if (allImages.length === 0) {
      setImagesLoaded(true);
      setProgress(100);
      return;
    }

    let loadedCount = 0;
    
    // Simulate a minimum aesthetic loading time (1s) so the screen doesn't just flash on fast connections
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1000));

    // Load every dynamic image into the browser cache
    const imagePromises = allImages.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        
        const updateProgress = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / allImages.length) * 100));
          resolve(true);
        };
        
        // Resolve on both load and error so that a single broken image doesn't halt the app forever
        img.onload = updateProgress;
        img.onerror = updateProgress;
      });
    });

    // Wait for the minimum time AND all images to finish caching
    Promise.all([Promise.all(imagePromises), minLoadTime]).then(() => {
      // Add a small delay for the 100% to linger before hiding the screen
      setTimeout(() => {
        setImagesLoaded(true);
        document.body.classList.remove('no-scroll');
      }, 400);
    });

    // Disable scrolling while loading
    document.body.classList.add('no-scroll');
    
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return { imagesLoaded, progress };
}
