/**
 * Automatically discovers all images in the matching public/images directories
 * without requiring any JSON manifest or hardcoded file names.
 */

export function getHeroImages(): string[] {
  const imageModules = import.meta.glob('/public/images/hero/*.{png,jpg,jpeg,webp,avif,gif}', {
    query: '?url',
    import: 'default',
    eager: true
  });
  
  // Sort by filename (the keys of the glob object)
  return Object.keys(imageModules)
    .sort()
    .map(key => (imageModules[key] as string).replace('/public', ''));
}

export function getPlacesImages(): string[] {
  const imageModules = import.meta.glob('/public/images/iconicPlaces/*.{png,jpg,jpeg,webp,avif,gif}', {
    query: '?url',
    import: 'default',
    eager: true
  });
  
  // Sort by filename
  return Object.keys(imageModules)
    .sort()
    .map(key => (imageModules[key] as string).replace('/public', ''));
}

export function getGalleryImagesByCategory(): Record<string, string[]> {
  // Use ** to match files recursively within the gallery folder
  const imageModules = import.meta.glob('/public/images/gallery/**/*.{png,jpg,jpeg,webp,avif,gif}', {
    query: '?url',
    import: 'default',
    eager: true
  });

  const categories: Record<string, string[]> = {
    'All': [] // Default category for everything
  };

  const sortedPaths = Object.keys(imageModules).sort();

  for (const path of sortedPaths) {
    const url = imageModules[path] as string;
    const publicUrl = url.replace('/public', '');
    categories['All'].push(publicUrl);

    const relativePath = path.replace('/public/images/gallery/', '');
    const parts = relativePath.split('/');

    if (parts.length > 1) {
      const category = parts[0];
      
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(publicUrl);
    }
  }

  return categories;
}


