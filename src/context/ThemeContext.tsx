import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemePalette = 'navy' | 'sage' | 'orange' | 'cream';

interface ThemeContextType {
  theme: ThemePalette;
  setTheme: (theme: ThemePalette) => void;
  activeColorName: string;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'sage',
  setTheme: () => {},
  activeColorName: 'Sage Green',
});

const THEME_NAMES: Record<ThemePalette, string> = {
  navy: 'Midnight Navy',
  sage: 'Sage Green',
  orange: 'Warm Orange',
  cream: 'Cream White',
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePalette>(() => {
    try {
      const saved = localStorage.getItem('shopnest_palette') as ThemePalette;
      if (saved && ['navy', 'sage', 'orange', 'cream'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return 'sage';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setTheme = (newTheme: ThemePalette) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('shopnest_palette', newTheme);
    } catch (e) {
      console.error(e);
    }

    setToastMessage(`Color Palette switched to ${THEME_NAMES[newTheme]}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        activeColorName: THEME_NAMES[theme],
      }}
    >
      {children}

      {/* Floating Theme Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md">
            <span
              className={`w-3 h-3 rounded-full ${
                theme === 'navy'
                  ? 'bg-[#0F172A] border border-slate-500'
                  : theme === 'sage'
                  ? 'bg-[#059669]'
                  : theme === 'orange'
                  ? 'bg-[#F97316]'
                  : 'bg-[#F8FAFC] border border-slate-400'
              }`}
            />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
