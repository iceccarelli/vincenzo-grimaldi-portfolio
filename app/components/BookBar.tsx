'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../lib/i18n';
import { extra } from '../lib/uiStrings';
import { emit } from '../lib/events';

/**
 * BookBar — sticky mobile conversion bar. Appears after the visitor has
 * scrolled 40% of the document on viewports < 768px (CSS hides it above
 * that). Hidden on /connect (already the destination) and the legal pages.
 */
export default function BookBar() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setVisible(max > 0 && window.scrollY / max > 0.4);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname === '/connect' || pathname === '/impressum' || pathname === '/datenschutz') {
    return null;
  }

  return (
    <div className={`book-bar${visible ? ' book-bar--visible' : ''}`} aria-hidden={!visible}>
      <a
        className="primary-button book-bar-cta"
        href="/connect"
        tabIndex={visible ? 0 : -1}
        onClick={() => emit('book_click', { source: 'book_bar' })}
      >
        {extra[locale].bookBar}
      </a>
    </div>
  );
}
