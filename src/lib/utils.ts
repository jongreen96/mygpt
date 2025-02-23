import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

// Joins class names together, while also merging Tailwind classes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Checks if the current viewport is mobile.
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}

// Formats user credits into number
export function formatCredits(credits: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(credits / 100000);
}

export function formatCreditsLong(credits: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 5,
    maximumFractionDigits: 6,
  }).format(credits / 100000);
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function seededShuffle(arr: string[], seed: number) {
  const shuffled = [...arr];
  let currentIndex = shuffled.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = (seed * 9301 + 49297) % 233280;
    seed = (seed * 9301 + 49297) % 233280;
    randomIndex = Math.floor((randomIndex / 233280) * currentIndex);
    currentIndex--;

    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
}
