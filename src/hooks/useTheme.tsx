import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light";

    const getStoredTheme = () => {
      try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") return stored;
      } catch {
        return null;
      }
      return null;
    };

    const storedTheme = getStoredTheme();
    if (storedTheme) return storedTheme;

    const documentTheme =
      document.documentElement.getAttribute("data-theme") ||
      document.body.getAttribute("data-theme");
    if (documentTheme === "light" || documentTheme === "dark") {
      return documentTheme;
    }

    if (document.documentElement.classList.contains("theme-dark")) {
      return "dark";
    }
    if (document.body.classList.contains("theme-dark")) {
      return "dark";
    }

    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const app = document.getElementById("root");

    [root, body, app].forEach((node) => {
      if (!node) return;
      node.classList.remove("theme-light", "theme-dark");
      node.classList.add(`theme-${theme}`);
      node.setAttribute("data-theme", theme);
    });

    try {
      localStorage.setItem("theme", theme);
    } catch {
      return;
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme, setTheme };
}
