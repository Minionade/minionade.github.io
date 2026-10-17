import { ArtworkItem } from '../types';

export function parseArtworkCategories(value: string): string[] {
  return [...new Set(value.split(',').map(tag => tag.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean))];
}

export function getArtworkCategories(artwork: ArtworkItem): string[] {
  const tags = parseArtworkCategories(artwork.categories?.length ? artwork.categories.join(',') : artwork.category || '');
  return tags.length ? tags : ['other'];
}

export function formatArtworkCategory(value: string): string {
  return value.replace(/[-_]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())
    .replace(/\bAi\b/g, 'AI').replace(/\b3d\b/gi, '3D');
}
