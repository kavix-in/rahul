import {
  Homemade_Apple,
  Shadows_Into_Light,
  Reenie_Beanie,
  Rock_Salt,
} from 'next/font/google';

/**
 * Deliberately “imperfect” handwriting faces (not formal script).
 * Order matches SlidingImages cards: speakers, sunnystate, ekaa, spadtek.
 */
export const hand0 = Homemade_Apple({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const hand1 = Shadows_Into_Light({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const hand2 = Reenie_Beanie({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const hand3 = Rock_Salt({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const signatureFontClasses = [
  hand0.className,
  hand1.className,
  hand2.className,
  hand3.className,
];
