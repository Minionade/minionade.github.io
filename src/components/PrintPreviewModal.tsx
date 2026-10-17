import React, { useState } from 'react';
import { X, Printer, Download, FileText, Info } from 'lucide-react';
import { Persona, ResumeData, ThemeId } from '../types';
import { ResumeDocument } from './ResumeDocument';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPdf: () => void;
  data: ResumeData;
  persona: Persona;
  theme: ThemeId;
  fontSize: 'compact' | 'standard' | 'spacious';
  visibleSections: {
    summary: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
  };
  isDarkMode?: boolean;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  onDownloadPdf,
  data,
  persona,
  theme,
  fontSize,
  visibleSections,
  isDarkMode = false,
}) => {
  const [printTip, setPrintTip] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePrintSystem = () => {
    try {
      window.print();
      setPrintTip('Print dialog opened. If your browser blocks dialogs inside frames, click "Download 1-Page PDF" below.');
    } catch (e) {
      console.warn('System print failed or blocked:', e);
      setPrintTip('Browser print is restricted in this window. Generating 1-page PDF download instead...');
      onDownloadPdf();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 no-print animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`rounded-2xl shadow-2xl max-w-4xl w-full h-[95dvh] flex flex-col border overflow-hidden ${
          isDarkMode
            ? 'bg-[#1a202c] border-slate-700/80 text-slate-100'
            : 'bg-[#faf8f4] border-[#ded7ca] text-stone-900'
        }`}
      >
        {/* Modal Toolbar */}
        <div
          className={`px-4 sm:px-6 py-3.5 shrink-0 border-b flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 ${
            isDarkMode ? 'bg-[#151a24] border-slate-700/80' : 'bg-[#f4efe6] border-[#ded7ca]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-amber-600/20 text-amber-800'}`}>
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                Print & Export Preview
              </h2>
              <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>
                US Letter (8.5 × 11 in) Single-Page Layout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* System Print Action */}
            <button
              onClick={handlePrintSystem}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isDarkMode
                  ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : 'border-[#cfc6b6] bg-white hover:bg-[#ede7dc] text-stone-800 shadow-xs'
              }`}
              title="Open browser system print dialog"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Print Dialog</span>
            </button>

            {/* Direct 1-Page PDF Download */}
            <button
              onClick={onDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-colors"
              title="Download clean 1-page vector PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download 1-Page PDF</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ml-1 ${
                isDarkMode
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-stone-500 hover:text-stone-900 hover:bg-[#e4ded2]'
              }`}
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tip / Notice if print action invoked */}
        {printTip && (
          <div className={`px-5 py-2 text-xs flex items-center justify-between border-b ${
            isDarkMode ? 'bg-blue-950/40 text-blue-300 border-blue-900/40' : 'bg-[#ede6d8] text-stone-800 border-[#ded7ca]'
          }`}>
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{printTip}</span>
            </div>
            <button onClick={() => setPrintTip(null)} className="text-[11px] underline ml-2">Dismiss</button>
          </div>
        )}

        {/* Modal Scrollable Canvas */}
        <div className={`flex-1 min-h-0 overflow-auto p-4 sm:p-8 ${
          isDarkMode ? 'bg-slate-950/60' : 'bg-[#eae4d8]'
        }`}>
          <div className="w-full max-w-[820px] mx-auto shadow-2xl rounded-sm bg-white text-slate-900 border border-black/10">
            <ResumeDocument
              data={data}
              persona={persona}
              theme={theme}
              fontSize={fontSize}
              visibleSections={visibleSections}
              isDarkMode={false} // Always preview in clean white paper mode
            />
          </div>
        </div>
      </div>
    </div>
  );
};
