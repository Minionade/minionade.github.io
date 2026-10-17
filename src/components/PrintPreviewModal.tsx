import React, { useEffect, useMemo, useState } from 'react';
import { X, Printer, Download, FileText } from 'lucide-react';
import { ResumeDocument } from './ResumeDocument';
import { createResumePdf, GeneratePdfOptions } from '../utils/generateResumePdf';

interface PrintPreviewModalProps extends GeneratePdfOptions {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export function PrintPreviewModal({ isOpen, onClose, data, persona, visibleSections, isDarkMode = false }: PrintPreviewModalProps) {
  const [url, setUrl] = useState('');
  const [fitWidth, setFitWidth] = useState(true);
  const pdf = useMemo(() => isOpen ? {
    buffer: createResumePdf({ data, persona, visibleSections }).output('arraybuffer'),
    filename: `Trevor_Barrett_Resume_${persona}.pdf`,
  } : null, [isOpen, data, persona, visibleSections]);

  useEffect(() => {
    if (!pdf) { setUrl(''); return; }
    const objectUrl = URL.createObjectURL(new Blob([pdf.buffer], { type: 'application/pdf' }));
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [pdf]);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', escape);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', escape); };
  }, [isOpen, onClose]);

  if (!isOpen || !pdf) return null;
  const button = `inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border ${isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-stone-300 hover:bg-stone-200'}`;
  return <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 no-print"
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby="pdf-preview-title"
      className={`rounded-2xl shadow-2xl max-w-5xl w-full h-[95dvh] flex flex-col border overflow-hidden ${isDarkMode ? 'bg-[#1a202c] border-slate-700 text-slate-100' : 'bg-[#faf8f4] border-stone-300 text-stone-900'}`}>
      <div className="p-4 border-b border-current/15 shrink-0 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <div><h2 id="pdf-preview-title" className="text-sm font-semibold">PDF preview</h2>
            <p className="text-xs opacity-70">HTML preview · Open PDF to check exact pagination</p></div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className={button} onClick={() => setFitWidth(value => !value)}>{fitWidth ? '100% size' : 'Fit width'}</button>
          <a className={button} href={url || undefined} target="_blank" rel="noopener noreferrer"><Printer className="w-3.5 h-3.5" />Open / Print PDF</a>
          <a className={`${button} bg-blue-600 text-white hover:!bg-blue-500`} href={url || undefined} download={pdf.filename}><Download className="w-3.5 h-3.5" />Download PDF</a>
          <button className="p-2 rounded-lg hover:bg-current/10" onClick={onClose} aria-label="Close PDF preview"><X className="w-5 h-5" /></button>
        </div>
      </div>
      <div className={`flex-1 min-h-0 overflow-auto p-3 sm:p-6 ${isDarkMode ? 'bg-slate-950/60' : 'bg-[#eae4d8]'}`}>
        <div className={fitWidth ? 'w-full' : 'w-[850px] mx-auto'}>
          <ResumeDocument data={{...data, projects: data.projects.map(project => ({...project, summary: ''}))}} persona={persona}
            visibleSections={visibleSections || {summary:true, skills:true, projects:true, experience:true, education:true}} theme="slate" fontSize="standard" isDarkMode={false} />
        </div>
      </div>
    </div>
  </div>;
}
