import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Printer, Download, FileText } from 'lucide-react';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { createResumePdf, GeneratePdfOptions } from '../utils/generateResumePdf';

interface PrintPreviewModalProps extends GeneratePdfOptions {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

function PdfPages({ buffer, fitWidth }: { buffer: ArrayBuffer; fitWidth: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [status, setStatus] = useState('Rendering PDF…');
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const resize = new ResizeObserver(entries => setWidth(Math.floor(entries[0].contentRect.width)));
    resize.observe(container);
    return () => resize.disconnect();
  }, []);
  useEffect(() => {
    if (!width) return;
    let cancelled = false;
    let task: ReturnType<typeof import('pdfjs-dist').getDocument> | undefined;
    const container = containerRef.current!;
    container.replaceChildren();
    setStatus('Rendering PDF…');
    const render = async () => {
      const pdfjs = await import('pdfjs-dist');
      if (cancelled) return;
      pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
      task = pdfjs.getDocument({ data: new Uint8Array(buffer.slice(0)) });
      const pdf = await task.promise;
      for (let number = 1; number <= pdf.numPages; number++) {
        const page = await pdf.getPage(number);
        if (cancelled) return;
        const original = page.getViewport({ scale: 1 });
        const scale = fitWidth ? Math.min(width / original.width, 1.4) : 96 / 72;
        const viewport = page.getViewport({ scale });
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width * ratio);
        canvas.height = Math.ceil(viewport.height * ratio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        canvas.className = 'block bg-white shadow-lg mb-5 mx-auto';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', `Resume PDF, page ${number} of ${pdf.numPages}`);
        container.appendChild(canvas);
        await page.render({ canvas, canvasContext: canvas.getContext('2d')!, viewport,
          transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0],
        }).promise;
      }
      if (!cancelled) setStatus('');
    };
    render().catch(error => {
      if (!cancelled) {
        console.error('PDF preview failed:', error);
        setStatus('Preview could not render. Use Open / Print PDF to view the same document.');
      }
    });
    return () => { cancelled = true; void task?.destroy(); container.replaceChildren(); };
  }, [buffer, width, fitWidth]);
  return <>
    {status && <p role="status" className="text-sm text-center mb-4">{status}</p>}
    <div ref={containerRef} className="w-full" />
  </>;
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
            <p className="text-xs opacity-70">The exact document you download</p></div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className={button} onClick={() => setFitWidth(value => !value)}>{fitWidth ? '100% size' : 'Fit width'}</button>
          <a className={button} href={url || undefined} target="_blank" rel="noopener noreferrer"><Printer className="w-3.5 h-3.5" />Open / Print PDF</a>
          <a className={`${button} bg-blue-600 text-white hover:!bg-blue-500`} href={url || undefined} download={pdf.filename}><Download className="w-3.5 h-3.5" />Download PDF</a>
          <button className="p-2 rounded-lg hover:bg-current/10" onClick={onClose} aria-label="Close PDF preview"><X className="w-5 h-5" /></button>
        </div>
      </div>
      <div className={`flex-1 min-h-0 overflow-auto p-3 sm:p-6 ${isDarkMode ? 'bg-slate-950/60' : 'bg-[#eae4d8]'}`}>
        <PdfPages buffer={pdf.buffer} fitWidth={fitWidth} />
      </div>
    </div>
  </div>;
}
