import { jsPDF } from 'jspdf';
import { Persona, ResumeData } from '../types';

interface GeneratePdfOptions {
  data: ResumeData;
  persona: Persona;
  visibleSections?: {
    summary: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
  };
}

export const generateResumePdf = ({
  data,
  persona,
  visibleSections = {
    summary: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
  },
}: GeneratePdfOptions) => {
  const { profile, summaryByPersona, skillsByPersona, projects, experience, education } = data;

  // Title tailored per persona
  const getPersonaTitle = () => {
    switch (persona) {
      case 'gamedev':
        return 'Game Engine & Systems Programmer';
      case 'hardware':
        return 'PC Hardware Technician & Systems Specialist';
      case 'equipment':
        return 'Commercial Grounds & Equipment Specialist';
      case 'hybrid':
      default:
        return 'Systems Programmer & Technical Operations Specialist';
    }
  };

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter', // 612 x 792 pt
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36; // 0.5 in margins
  const contentWidth = pageWidth - margin * 2;
  let y = margin + 12;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin + 16;
    }
  };

  // Color Palette (ATS-Friendly Executive Dark Navy / Slate)
  const primaryColor: [number, number, number] = [15, 23, 42]; // Slate 900
  const accentColor: [number, number, number] = [30, 64, 175]; // Blue 800
  const textColor: [number, number, number] = [30, 41, 59]; // Slate 800
  const mutedColor: [number, number, number] = [100, 116, 139]; // Slate 500
  const dividerColor: [number, number, number] = [203, 213, 225]; // Slate 300

  // 1. Header: Name & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...primaryColor);
  doc.text(profile.name, margin, y);

  const titleText = getPersonaTitle().toUpperCase();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...accentColor);
  const titleWidth = doc.getTextWidth(titleText);
  doc.text(titleText, pageWidth - margin - titleWidth, y - 2);

  y += 14;

  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...mutedColor);
  const contactSegments = [
    profile.location,
    profile.phone,
    profile.email,
    profile.github ? `github.com/minionade` : null,
    profile.portfolio || null,
  ].filter(Boolean) as string[];

  const contactLine = contactSegments.join('   •   ');
  doc.text(contactLine, margin, y);

  y += 10;
  // Header underline
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  // Helper for section headings
  const renderSectionHeader = (title: string) => {
    checkPageBreak(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryColor);
    doc.text(title.toUpperCase(), margin, y);

    y += 4;
    doc.setDrawColor(...dividerColor);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;
  };

  // 2. Professional Profile / Summary
  if (visibleSections.summary) {
    const summary = summaryByPersona[persona] || summaryByPersona.hybrid;
    if (summary) {
      renderSectionHeader('Professional Profile');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...textColor);
      const splitSummary = doc.splitTextToSize(summary, contentWidth);
      checkPageBreak(splitSummary.length * 11);
      doc.text(splitSummary, margin, y);
      y += splitSummary.length * 11 + 8;
    }
  }

  // 3. Core Competencies & Technical Skills
  if (visibleSections.skills) {
    const skills = skillsByPersona[persona] || skillsByPersona.hybrid;
    if (skills && skills.length > 0) {
      renderSectionHeader('Core Competencies & Technical Skills');
      doc.setFontSize(8.5);

      for (const group of skills) {
        checkPageBreak(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        const catLabel = `${group.category}: `;
        doc.text(catLabel, margin, y);

        const labelWidth = doc.getTextWidth(catLabel);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textColor);
        const itemsStr = group.items.join('  •  ');
        const splitItems = doc.splitTextToSize(itemsStr, contentWidth - labelWidth);

        if (splitItems.length === 1) {
          doc.text(splitItems[0], margin + labelWidth, y);
          y += 11;
        } else {
          doc.text(splitItems[0], margin + labelWidth, y);
          y += 11;
          for (let i = 1; i < splitItems.length; i++) {
            checkPageBreak(11);
            doc.text(splitItems[i], margin + 10, y);
            y += 11;
          }
        }
      }
      y += 6;
    }
  }

  // 4. Engineering & Technical Projects
  if (visibleSections.projects && projects && projects.length > 0) {
    renderSectionHeader('Engineering & Technical Projects');

    // Sort projects based on persona priority
    const sortedProjects = [...projects].sort((a, b) => {
      if (persona === 'gamedev') {
        if (a.id === 'custom-engine') return -1;
        if (b.id === 'custom-engine') return 1;
        if (a.id === 'indie-games-ai') return -1;
      }
      if (persona === 'hardware') {
        if (a.id === 'pc-building') return -1;
        if (b.id === 'pc-building') return 1;
      }
      return 0;
    });

    for (const project of sortedProjects) {
      checkPageBreak(38);
      // Project title + subtitle
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...primaryColor);
      doc.text(project.title, margin, y);

      const titleW = doc.getTextWidth(project.title);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...mutedColor);
      doc.text(`  |  ${project.roleSubtitle}`, margin + titleW, y);

      // Period on right
      const periodW = doc.getTextWidth(project.period);
      doc.text(project.period, pageWidth - margin - periodW, y);
      y += 10.5;

      // Tech Stack
      if (project.stack && project.stack.length > 0) {
        checkPageBreak(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...accentColor);
        doc.text('Technologies: ', margin, y);

        const techLabelW = doc.getTextWidth('Technologies: ');
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...mutedColor);
        const stackStr = project.stack.join('  •  ');
        const splitStack = doc.splitTextToSize(stackStr, contentWidth - techLabelW);
        doc.text(splitStack[0], margin + techLabelW, y);
        y += 10;
        for (let i = 1; i < splitStack.length; i++) {
          checkPageBreak(10);
          doc.text(splitStack[i], margin + 10, y);
          y += 10;
        }
      }

      // Bullets
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...textColor);
      for (const bullet of project.accomplishments) {
        const bulletText = `•  ${bullet}`;
        const splitBullet = doc.splitTextToSize(bulletText, contentWidth - 10);
        checkPageBreak(splitBullet.length * 10);
        doc.text(splitBullet, margin + 4, y);
        y += splitBullet.length * 9.5 + 2;
      }
      y += 4;
    }
    y += 4;
  }

  // 5. Professional Work Experience
  if (visibleSections.experience && experience && experience.length > 0) {
    renderSectionHeader('Professional Work Experience');

    for (const exp of experience) {
      checkPageBreak(36);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...primaryColor);
      doc.text(exp.role, margin, y);

      const roleW = doc.getTextWidth(exp.role);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...mutedColor);
      doc.text(`  |  ${exp.company}`, margin + roleW, y);

      const periodW = doc.getTextWidth(exp.period);
      doc.text(exp.period, pageWidth - margin - periodW, y);
      y += 10;

      // Location & skills
      if (exp.location || exp.skillsUsed) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(...mutedColor);
        const metaStr = [exp.location, exp.skillsUsed?.join('  •  ')].filter(Boolean).join('  —  ');
        doc.text(metaStr, margin, y);
        y += 10;
      }

      // Highlights
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...textColor);
      for (const hl of exp.highlights) {
        const bulletText = `•  ${hl}`;
        const splitHl = doc.splitTextToSize(bulletText, contentWidth - 10);
        checkPageBreak(splitHl.length * 10);
        doc.text(splitHl, margin + 4, y);
        y += splitHl.length * 9.5 + 2;
      }
      y += 4;
    }
    y += 4;
  }

  // 6. Education
  if (visibleSections.education && education) {
    renderSectionHeader('Education & Credentials');
    checkPageBreak(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text(education.degree, margin, y);

    const degW = doc.getTextWidth(education.degree);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedColor);
    doc.text(`  |  ${education.institution} (${education.location})`, margin + degW, y);

    const yearW = doc.getTextWidth(education.year);
    doc.text(education.year, pageWidth - margin - yearW, y);
    y += 10.5;

    if (education.notes) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...textColor);
      const splitNotes = doc.splitTextToSize(education.notes, contentWidth);
      doc.text(splitNotes, margin, y);
      y += splitNotes.length * 9.5;
    }
  }

  // Save PDF
  const filename = `Trevor_Barrett_Resume_${persona}.pdf`;
  doc.save(filename);
};
