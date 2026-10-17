import React from 'react';
import { X, ListFilter } from 'lucide-react';

export function TagFilter({ options, selected, onChange, isDarkMode = false }: {
  options: { tag: string; count: number }[];
  selected: string[];
  onChange: (tags: string[]) => void;
  isDarkMode?: boolean;
}) {
  return <div className="flex flex-wrap items-center gap-2 text-xs">
    <label className={`inline-flex items-center gap-2 border rounded-lg px-3 py-2 ${isDarkMode ? 'bg-[#242b3b] border-slate-600 text-slate-100' : 'bg-[#faf8f4] border-stone-300 text-stone-900'}`}>
      <ListFilter aria-hidden="true" className="w-4 h-4" />
      <select aria-label="Filter by tag (matches any selected tag)" value="" onChange={e => { if (e.target.value) onChange([...selected, e.target.value]); }}
        className="bg-transparent max-w-[min(65vw,260px)] focus:outline-none">
        <option value="">Add tag filter…</option>
        {options.filter(({tag}) => !selected.includes(tag)).sort((a,b) => a.tag.localeCompare(b.tag)).map(({tag,count}) =>
          <option className={isDarkMode ? 'bg-slate-800' : 'bg-white'} key={tag} value={tag}>{tag} ({count})</option>)}
      </select>
    </label>
    <ul aria-label="Selected tags" className="flex flex-wrap gap-2">
      {selected.map(tag => <li key={tag}><button onClick={() => onChange(selected.filter(t => t !== tag))}
        aria-label={`Remove ${tag} filter`} className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-3 py-2 hover:bg-blue-500">
        {tag}<X aria-hidden="true" className="w-3 h-3" />
      </button></li>)}
    </ul>
    {selected.length > 0 && <button onClick={() => onChange([])} className="underline underline-offset-2 px-2 py-2">Clear all</button>}
  </div>;
}
