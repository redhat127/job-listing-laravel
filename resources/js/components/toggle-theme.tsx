import { Monitor, Moon, Sun } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

type Theme = 'system' | 'light' | 'dark';
const STORAGE_KEY = 'theme';

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }

  // fix invalid or missing value
  localStorage.setItem(STORAGE_KEY, 'system');
  return 'system';
};

export const ToggleTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && media.matches);

      root.classList.toggle('dark', isDark);
      localStorage.setItem(STORAGE_KEY, theme);
    };

    applyTheme();
    media.addEventListener('change', applyTheme);
    return () => media.removeEventListener('change', applyTheme);
  }, [theme]);

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
