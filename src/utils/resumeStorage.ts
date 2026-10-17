import { ResumeData } from '../types';

export const RESUME_STORAGE_KEY = 'trevor_resume_data_v6';

// Only replace the previous shipped draft when it has not been edited.
// Custom browser drafts remain intact and are copied to the new storage key.
export function loadResumeData(storage: Pick<Storage, 'getItem'>, defaults: ResumeData): ResumeData {
  const current = storage.getItem(RESUME_STORAGE_KEY);
  if (current) return JSON.parse(current);
  const legacy = storage.getItem('trevor_resume_data_v5');
  if (!legacy) return defaults;
  const saved = JSON.parse(legacy);
  const serialized = JSON.stringify(saved);
  let hash = 2166136261;
  for (let i = 0; i < serialized.length; i++) {
    hash = Math.imul(hash ^ serialized.charCodeAt(i), 16777619) >>> 0;
  }
  return serialized.length === 12265 && hash === 527411183 ? defaults : saved;
}
