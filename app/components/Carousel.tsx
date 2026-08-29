'use client';

/**
 * Carousel.tsx — the network's cascading scroll row.
 *
 * Netflix-style horizontally scrollable rail with scroll-snap, arrow paddles,
 * an AWS-style position counter, and gradient edge fades. Pure CSS scroll
 * behaviour under the hood, so it stays keyboard- and touch-native: the
 * arrows are progressive enhancement, not the mechanism.
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

type CarouselProps = {
  children: ReactNode[];
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
};

export default function Carousel({ children, ariaLabel, prevLabel, nextLabel }: CarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const count = children.length;

  const readPosition = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setCanPrev(rail.scrollLeft > 8);
    setCanNext(rail.scrollLeft < max - 8);
    if (max <= 0) {
      setIndex(0);
      return;
    }
    setIndex(Math.min(count - 1, Math.round((rail.scrollLeft / max) * (count - 1))));
  }, [count]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    readPosition();
    rail.addEventListener('scroll', readPosition, { passive: true });
    window.addEventListener('resize', readPosition);
    return () => {
      rail.removeEventListener('scroll', readPosition);
      window.removeEventListener('resize', readPosition);
    };
  }, [readPosition]);

  const nudge = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div className="vg-carousel" role="group" aria-label={ariaLabel}>
      <div className="vg-carousel-rail" ref={railRef} tabIndex={0}>
        {children}
      </div>
      <div className="vg-carousel-controls">
        <button
          type="button"
          className="vg-carousel-paddle"
          onClick={() => nudge(-1)}
          disabled={!canPrev}
          aria-label={prevLabel}
        >
          &#8249;
        </button>
        <span className="vg-carousel-counter">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          className="vg-carousel-paddle"
          onClick={() => nudge(1)}
          disabled={!canNext}
          aria-label={nextLabel}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
