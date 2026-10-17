import { jsPDF } from 'jspdf';
import { Persona, ResumeData } from '../types';
import { RESUME_REGULAR, RESUME_BOLD } from '../assets/fonts/resumeFonts';

interface GeneratePdfOptions {
  data: ResumeData;
  persona: Persona;
  visibleSections?: Record<'summary' | 'skills' | 'projects' | 'experience' | 'education', boolean>;
}

export const generateResumePdf = ({ data, persona, visibleSections = {
  summary: true, skills: true, projects: true, experience: true, education: true,
} }: GeneratePdfOptions) => {
  const doc = new jsPDF({ unit: 'pt', format: 'letter', putOnlyUsedFonts: true });
  doc.addFileToVFS('Resume-Regular.ttf', RESUME_REGULAR);
  doc.addFont('Resume-Regular.ttf', 'Resume', 'normal');
  doc.addFileToVFS('Resume-Bold.ttf', RESUME_BOLD);
  doc.addFont('Resume-Bold.ttf', 'Resume', 'bold');
  doc.setCharSpace(0);
  doc.setLineHeightFactor(1.25);
  doc.setProperties({ title: `${data.profile.name} - Resume`, author: data.profile.name });

  const margin = 36;
  const width = 540;
  const bottom = 756;
  const bodySize = 9.5;
  const leading = 11.5;
  let y = margin;
  const ink = '#20252b';
  const muted = '#525b65';

  const font = (bold = false, size = bodySize, color = ink) => {
    doc.setFont('Resume', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(color);
  };
  const space = (height: number) => {
    if (y + height > bottom) { doc.addPage(); y = margin; }
  };
  const paragraph = (text: string, options: { bold?: boolean; size?: number; color?: string; indent?: number } = {}) => {
    const { bold = false, size = bodySize, color = ink, indent = 0 } = options;
    font(bold, size, color);
    const lines = doc.splitTextToSize(text, width - indent) as string[];
    for (const line of lines) {
      space(leading);
      doc.text(line, margin + indent, y);
      y += leading;
    }
  };
  const section = (title: string) => {
    space(40);
    y += 5;
    font(true, 10);
    doc.text(title, margin, y);
    y += 5;
    doc.setDrawColor('#b5bbc2');
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + width, y);
    y += 12;
  };
  const entryTitle = (title: string, period: string) => {
    font(false, 9, muted);
    const dateWidth = doc.getTextWidth(period);
    font(true);
    const lines = doc.splitTextToSize(title, width - dateWidth - 18) as string[];
    space(lines.length * leading + leading * 2);
    lines.forEach((line, i) => {
      font(true);
      doc.text(line, margin, y);
      if (i === 0) {
        font(false, 9, muted);
        doc.text(period, margin + width, y, { align: 'right' });
      }
      y += leading;
    });
  };
  const bullet = (text: string) => {
    font();
    const lines = doc.splitTextToSize(text, width - 12) as string[];
    space(lines.length * leading);
    doc.text('•', margin + 2, y);
    lines.forEach(line => { doc.text(line, margin + 12, y); y += leading; });
    y += 1;
  };

  const titles: Record<Persona, string> = {
    hybrid: 'Software Development & Technical Work',
    gamedev: 'Game & Systems Developer',
    hardware: 'PC Building & Troubleshooting',
    equipment: 'Grounds Maintenance & Equipment Operation',
  };
  paragraph(data.profile.name, { bold: true, size: 20 });
  y += 10;
  paragraph(titles[persona], { size: 10, color: muted });
  y += 2;
  paragraph([data.profile.location, data.profile.phone, data.profile.email,
    data.profile.github?.replace(/^https?:\/\//, '')].filter(Boolean).join(' | '), { size: 8.5, color: muted });
  font(false, 8.5, '#345979');
  doc.textWithLink('Website: minionade.github.io', margin, y, { url: 'https://minionade.github.io/' });
  y += leading;


  if (visibleSections.summary) {
    const summary = data.summaryByPersona[persona] || data.summaryByPersona.hybrid;
    if (summary) { section('Profile'); paragraph(summary); }
  }
  if (visibleSections.skills) {
    const skills = data.skillsByPersona[persona] || data.skillsByPersona.hybrid;
    if (skills.length) {
      section('Skills');
      skills.forEach(group => paragraph(`${group.category}: ${group.items.join(' · ')}`));
    }
  }
  if (visibleSections.projects && data.projects.length) {
    section('Personal Projects');
    const priority = persona === 'gamedev' ? ['custom-engine', 'indie-games-ai']
      : persona === 'hardware' ? ['pc-building'] : [];
    const rank = (id: string) => priority.includes(id) ? priority.indexOf(id) : priority.length;
    [...data.projects].sort((a, b) => rank(a.id) - rank(b.id)).forEach(project => {
      entryTitle(project.title, project.period);
      if (project.stack.length) paragraph(project.stack.join(' · '), { size: 9, color: muted });
      project.accomplishments.forEach(bullet);
      y += 4;
    });
  }
  if (visibleSections.experience && data.experience.length) {
    section('Work Experience');
    data.experience.forEach(job => {
      entryTitle(job.role, job.period);
      paragraph(`${job.company} | ${job.location}`, { size: 9, color: muted });
      job.highlights.forEach(bullet);
      y += 4;
    });
  }
  if (visibleSections.education && data.education) {
    section('Education');
    const education = data.education;
    entryTitle(education.degree, education.year);
    paragraph(`${education.institution} | ${education.location}`, { size: 9, color: muted });
    if (education.notes) paragraph(education.notes);
  }
  doc.save(`Trevor_Barrett_Resume_${persona}.pdf`);
};
