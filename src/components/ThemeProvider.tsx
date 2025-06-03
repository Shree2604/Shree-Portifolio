
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      
      // Apply color adjustments for light theme
      if (systemTheme === 'light') {
        applyLightThemeAdjustments(root);
      } else {
        removeLightThemeAdjustments(root);
      }
      return;
    }

    root.classList.add(theme);
    
    // Apply color adjustments for light theme
    if (theme === 'light') {
      applyLightThemeAdjustments(root);
    } else {
      removeLightThemeAdjustments(root);
    }
  }, [theme]);

  // Function to apply light theme adjustments - improved for better contrast and readability
  const applyLightThemeAdjustments = (root: HTMLElement) => {
    root.style.setProperty('--primary', '220 70% 30%'); // Deeper blue for better contrast
    root.style.setProperty('--accent', '199 89% 40%'); // More vibrant accent
    root.style.setProperty('--background', '210 30% 99%'); // Clean white background
    root.style.setProperty('--muted', '210 40% 96%'); // Slightly darker for better contrast
    root.style.setProperty('--muted-foreground', '215 25% 30%'); // Darker muted foreground for readability
    root.style.setProperty('--secondary', '210 20% 93%'); // Consistent with overall palette
    root.style.setProperty('--border', '214 25% 80%'); // More visible borders
    root.style.setProperty('--card', '0 0% 100%'); // Pure white card
    root.style.setProperty('--card-foreground', '240 10% 4%'); // Nearly black text for maximum contrast
    root.style.setProperty('--foreground', '240 10% 4%'); // Nearly black text
    
    // Additional variables for better light theme experience
    root.style.setProperty('--neo-blur-light', 'rgba(255, 255, 255, 0.9)');
    root.style.setProperty('--navbar-bg-light', 'rgba(255, 255, 255, 0.8)');
    root.style.setProperty('--navbar-border-light', 'rgba(0, 0, 0, 0.1)');
  };

  // Function to remove light theme adjustments
  const removeLightThemeAdjustments = (root: HTMLElement) => {
    root.style.removeProperty('--primary');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--background');
    root.style.removeProperty('--muted');
    root.style.removeProperty('--muted-foreground');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--border');
    root.style.removeProperty('--card');
    root.style.removeProperty('--card-foreground');
    root.style.removeProperty('--foreground');
    root.style.removeProperty('--neo-blur-light');
    root.style.removeProperty('--navbar-bg-light');
    root.style.removeProperty('--navbar-border-light');
  };

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
