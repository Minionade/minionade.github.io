import { ArtworkItem } from '../types';

export const ARTWORK_STORAGE_KEY = 'trevor_artworks_v3';

export function loadArtworkData(storage: Pick<Storage, 'getItem'>, published: ArtworkItem[]): ArtworkItem[] {
  const current = storage.getItem(ARTWORK_STORAGE_KEY);
  if (current) return JSON.parse(current);
  const previous = storage.getItem('trevor_artworks_v2');
  if (!previous) return published;
  const saved: ArtworkItem[] = JSON.parse(previous);
  const existing = new Set(saved.map(art => art.id));
  return [...saved, ...published.filter(art => !existing.has(art.id))];
}
