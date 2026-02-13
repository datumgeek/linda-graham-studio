import { useState, useEffect } from 'react';

type Theme = 'gallery' | 'galleryDark';

const STORAGE_KEY = 'linda-graham-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'gallery';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'gallery' || stored === 'galleryDark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'galleryDark'
    : 'gallery';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () =>
    setTheme((t) => (t === 'gallery' ? 'galleryDark' : 'gallery'));

  const isDark = theme === 'galleryDark';

  return { theme, toggle, isDark } as const;
}
