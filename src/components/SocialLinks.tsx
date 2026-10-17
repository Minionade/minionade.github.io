import React from 'react';
import { Github, MessageCircle, Flame } from 'lucide-react';

const links = [
  { name: 'Discord', href: 'https://discord.gg/Znnd6yQtz3', icon: MessageCircle },
  { name: 'CurseForge', href: 'https://www.curseforge.com/members/minionade/projects', icon: Flame },
  { name: 'GitHub', href: 'https://github.com/Minionade', icon: Github },
];

export function SocialLinks({ isDarkMode }: { isDarkMode: boolean }) {
  return <nav aria-label="Social links" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))', left: 'max(1rem, env(safe-area-inset-left))' }}
    className={`fixed z-30 flex items-center gap-1 rounded-xl border p-1.5 shadow-lg backdrop-blur-md no-print ${isDarkMode ? 'bg-[#181e2b]/95 border-slate-700 text-slate-200' : 'bg-[#faf8f4]/95 border-stone-300 text-stone-800'}`}>
    {links.map(({ name, href, icon: Icon }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer"
      aria-label={`${name} (opens in new tab)`}
      className={`social-link inline-flex h-11 min-w-11 items-center justify-center rounded-lg px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${isDarkMode ? 'hover:bg-slate-700 focus-visible:outline-amber-300' : 'hover:bg-stone-200 focus-visible:outline-amber-800'}`}>
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /><span aria-hidden="true" className="social-link-label">{name}</span>
    </a>)}
  </nav>;
}
