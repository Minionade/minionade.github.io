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

  const getPersonaTitle = () => {
    switch (persona) {
      case 'gamedev':
        return 'Game & Systems Developer';
      case 'hardware':
        return 'PC Building & Troubleshooting';
      case 'equipment':
        return 'Grounds Maintenance & Equipment Operation';
      case 'hybrid':
      default:
        return 'Software Development & Technical Work';
    }
  };

  // US Letter: 612 x 792 pt
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
  });

  const pageWidth = 612;
  const marginX = 30; // 30 pt side margins
  const contentWidth = pageWidth - marginX * 2; // 552 pt
  let y = 26; // Start 26 pt from top

  // Typography and colors
  const colorDark: [number, number, number] = [15, 23, 42]; // Slate 950
  const colorAccent: [number, number, number] = [30, 64, 175]; // Navy Blue 800
  const colorBody: [number, number, number] = [30, 41, 59]; // Slate 800
  const colorMuted: [number, number, number] = [100, 116, 139]; // Slate 500
  const colorLine: [number, number, number] = [203, 213, 225]; // Slate 300

  // 1. Header: Name & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(...colorDark);
  doc.text(profile.name.toUpperCase(), marginX, y);

  const titleStr = getPersonaTitle().toUpperCase();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorAccent);
  const titleW = doc.getTextWidth(titleStr);
  doc.text(titleStr, pageWidth - marginX - titleW, y - 1);

  y += 12;

  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...colorMuted);
  const contactParts = [
    profile.location,
    profile.phone,
    profile.email,
    profile.github?.replace(/^https?:\/\//, '') || null,

  ].filter(Boolean) as string[];

  const contactLines = doc.splitTextToSize(contactParts.join('  |  '), contentWidth);
  doc.text(contactLines, marginX, y);

  y += contactLines.length * 10 + 2;
  // Header rule
  doc.setDrawColor(...colorAccent);
  doc.setLineWidth(1.0);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 12;

  // Helper for section headings
  const renderSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...colorAccent);
    doc.text(title.toUpperCase(), marginX, y);

    y += 3;
    doc.setDrawColor(...colorLine);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 8;
  };

  // 2. Summary
  if (visibleSections.summary) {
    const summary = summaryByPersona[persona] || summaryByPersona.hybrid;
    if (summary) {
      renderSectionHeader('Profile');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...colorBody);
      const splitSummary = doc.splitTextToSize(summary, contentWidth);
      doc.text(splitSummary, marginX, y);
      y += splitSummary.length * 12 + 6;
    }
  }

  // 3. Technical Skills (Balanced 2-Column Layout to save vertical space)
  if (visibleSections.skills) {
    const skills = skillsByPersona[persona] || skillsByPersona.hybrid;
    if (skills && skills.length > 0) {
      renderSectionHeader('Skills');

      const colWidth = (contentWidth - 16) / 2;
      const leftColX = marginX;
      const rightColX = marginX + colWidth + 16;
      let leftY = y;
      let rightY = y;

      skills.forEach((group, idx) => {
        const isLeft = idx % 2 === 0;
        const colX = isLeft ? leftColX : rightColX;
        let currY = isLeft ? leftY : rightY;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...colorDark);
        doc.text(`${group.category}: `, colX, currY);

        const catW = doc.getTextWidth(`${group.category}: `);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colorBody);

        const itemsStr = group.items.join('  •  ');
        const splitItems = doc.splitTextToSize(itemsStr, colWidth - catW);

        doc.text(splitItems[0], colX + catW, currY);
        currY += 12;

        for (let i = 1; i < splitItems.length; i++) {
          doc.text(splitItems[i], colX + 8, currY);
          currY += 12;
        }

        if (isLeft) {
          leftY = currY + 1;
        } else {
          rightY = currY + 1;
        }
      });

      y = Math.max(leftY, rightY) + 5;
    }
  }

  // 4. Personal Projects (Top 3 prioritized for exact 1-page fit)
  if (visibleSections.projects && projects && projects.length > 0) {
    renderSectionHeader('Personal Projects');

    const sortedProjects = [...projects]
      .sort((a, b) => {
        if (persona === 'gamedev') {
          if (a.id === 'custom-engine') return -1;
          if (b.id === 'custom-engine') return 1;
          if (a.id === 'indie-games-ai') return -1;
        }
        if (persona === 'hardware') {
          if (a.id === 'pc-building') return -1;
          if (b.id === 'pc-building') return 1;
        }
        if (persona === 'equipment') {
          if (a.id === 'equipment-ops') return -1;
          if (b.id === 'equipment-ops') return 1;
        }
        return 0;
      })
      ;

    sortedProjects.forEach((project) => {
      // Title and project context
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...colorDark);
      doc.text(project.title, marginX, y);

      const titleW2 = doc.getTextWidth(project.title);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...colorMuted);
      doc.text(`  |  ${project.roleSubtitle}`, marginX + titleW2, y);

      // Date right-aligned
      const periodW = doc.getTextWidth(project.period);
      doc.text(project.period, pageWidth - marginX - periodW, y);
      y += 11;

      // Tech line
      if (project.stack && project.stack.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...colorAccent);
        doc.text('Tech: ', marginX, y);

        const techLabelW = doc.getTextWidth('Tech: ');
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(...colorMuted);
        const stackStr = project.stack.slice(0, 6).join('  •  ');
        doc.text(stackStr, marginX + techLabelW, y);
        y += 10;
      }

      // Project details
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...colorBody);

      const topBullets = project.accomplishments;
      topBullets.forEach((bullet) => {
        const bulletText = `•   ${bullet}`;
        const splitBullet = doc.splitTextToSize(bulletText, contentWidth - 8);
        doc.text(splitBullet, marginX + 4, y);
        y += splitBullet.length * 12 + 1;
      });

      y += 2.5;
    });

    y += 3;
  }

  // 5. Work Experience
  if (visibleSections.experience && experience && experience.length > 0) {
    renderSectionHeader('Work Experience');

    experience.forEach((exp) => {
      // Role & Company
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...colorDark);
      doc.text(exp.role, marginX, y);

      y += 11;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colorMuted);
      doc.setFontSize(9);
      doc.text(`${exp.company} | ${exp.location}`, marginX, y);

      // Period on right
      const expPeriodW = doc.getTextWidth(exp.period);
      doc.text(exp.period, pageWidth - marginX - expPeriodW, y - 11);
      y += 11;

      // Work experience details
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...colorBody);
      const topHighlights = exp.highlights;
      topHighlights.forEach((hl) => {
        const bulletText = `•   ${hl}`;
        const splitHl = doc.splitTextToSize(bulletText, contentWidth - 8);
        doc.text(splitHl, marginX + 4, y);
        y += splitHl.length * 12 + 1;
      });

      y += 2.5;
    });

    y += 3;
  }

  // 6. Education
  if (visibleSections.education && education) {
    renderSectionHeader('Education');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...colorDark);
    doc.text(education.degree, marginX, y);

    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colorMuted);
    doc.setFontSize(9);
    doc.text(`${education.institution} | ${education.location}`, marginX, y);

    const yearW2 = doc.getTextWidth(education.year);
    doc.text(education.year, pageWidth - marginX - yearW2, y - 11);
    y += 11;

    if (education.notes) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...colorBody);
      const splitNotes = doc.splitTextToSize(education.notes, contentWidth);
      doc.text(splitNotes, marginX, y);
    }
  }

  // Save the 1-page PDF
  const filename = `Trevor_Barrett_Resume_${persona}.pdf`;
  doc.save(filename);
};
