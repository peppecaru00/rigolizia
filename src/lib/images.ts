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
  return (Object.values(imageModules) as string[]).map(path => path.replace('/public', ''));
}

export function getPlacesImages(): string[] {
  const imageModules = import.meta.glob('/public/images/places/*.{png,jpg,jpeg,webp,avif,gif}', {
    query: '?url',
    import: 'default',
    eager: true
  });
  return (Object.values(imageModules) as string[]).map(path => path.replace('/public', ''));
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

  for (const [path, url] of Object.entries(imageModules)) {
    const publicUrl = (url as string).replace('/public', '');
    categories['All'].push(publicUrl);

    const relativePath = path.replace('/public/images/gallery/', '');
    const parts = relativePath.split('/');

    // If it's inside a subfolder, the first part is the folder/category name
    if (parts.length > 1) {
      const category = parts[0]; // e.g., "eventi-events"
      
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(publicUrl);
    }
  }

  return categories;
}


