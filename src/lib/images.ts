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
