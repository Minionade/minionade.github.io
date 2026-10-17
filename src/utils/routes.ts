import type { NavTab } from '../components/Navbar';

export function artworkHref(id: string): string {
  return `#art/${encodeURIComponent(id)}`;
}

export function parseHashRoute(hash: string): { tab: NavTab; sectionId?: string; artworkId?: string } {
  const route = hash.replace(/^#/, '') || 'home';
  if (route.startsWith('resume-')) return { tab: 'resume', sectionId: route };
  const [page, encodedId] = route.split('/');
  const tab = ['home', 'resume', 'projects', 'art', 'blog'].includes(page) ? page as NavTab : 'home';
  if (tab === 'art' && encodedId) {
    try { return { tab, artworkId: decodeURIComponent(encodedId) }; } catch { /* Invalid links still show the gallery. */ }
  }
  return { tab };
}
