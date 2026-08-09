import { useEffect, useState } from 'react';

import type { SectionId } from '../content/site';

const sectionIds: readonly SectionId[] = [
  'top',
  'work',
  'contact',
];

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('top');

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;

    const update = () => {
      const readingLine = Math.max(96, window.innerHeight * 0.36);
      const current =
        sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= readingLine && bounds.bottom > readingLine;
        }) ?? sections[0];

      if (current && sectionIds.includes(current.id as SectionId)) {
        setActiveSection(current.id as SectionId);
      }
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return activeSection;
}
