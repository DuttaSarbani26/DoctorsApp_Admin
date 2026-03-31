"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

type ThemeMode = "dark" | "light";

interface ThemeTokens {
  mode: ThemeMode;
  // Backgrounds
  bg: string;
  bgSurface: string;
  bgElevated: string;
  bgGlass: string;
  bgGlassStrong: string;
  // Borders
  border: string;
  borderLight: string;
  // Text
  text: string;
  textSecondary: string;
  textMuted: string;
  // Sidebar
  sidebarBg: string;
  sidebarGlass: string;
  // Navbar
  navbarBg: string;
  // Cards
  cardBg: string;
  cardBorder: string;
  cardHoverShadow: string;
  // Input
  inputBg: string;
  inputBorder: string;
  // Accent
  accent: string;
  accentLight: string;
  accentGlow: string;
  // Glass
  glassBlur: string;
  glassBorder: string;
  // Scrollbar
  scrollTrack: string;
  scrollThumb: string;
  scrollThumbHover: string;
  // Shadows
  shadow: string;
  shadowStrong: string;
  // Hover
  hoverBg: string;
}

const darkTokens: ThemeTokens = {
  mode: "dark",
  bg: "#161a2b",
  bgSurface: "#1e2235",
  bgElevated: "#272b40",
  bgGlass: "rgba(30, 34, 53, 0.7)",
  bgGlassStrong: "rgba(30, 34, 53, 0.85)",
  border: "rgba(255, 255, 255, 0.08)",
  borderLight: "rgba(255, 255, 255, 0.05)",
  text: "#e2e8f0",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  sidebarBg: "rgba(22, 26, 43, 0.92)",
  sidebarGlass: "blur(20px)",
  navbarBg: "rgba(22, 26, 43, 0.8)",
  cardBg: "rgba(30, 34, 53, 0.6)",
  cardBorder: "rgba(255, 255, 255, 0.08)",
  cardHoverShadow: "0 12px 40px rgba(0,0,0,0.3)",
  inputBg: "rgba(39, 43, 64, 0.5)",
  inputBorder: "rgba(255, 255, 255, 0.1)",
  accent: "#7c3aed",
  accentLight: "#a78bfa",
  accentGlow: "rgba(124, 58, 237, 0.15)",
  glassBlur: "blur(16px)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  scrollTrack: "#161a2b",
  scrollThumb: "#2a2f45",
  scrollThumbHover: "#3a4060",
  shadow: "0 4px 24px rgba(0,0,0,0.2)",
  shadowStrong: "0 8px 40px rgba(0,0,0,0.35)",
  hoverBg: "rgba(255, 255, 255, 0.05)",
};

const lightTokens: ThemeTokens = {
  mode: "light",
  bg: "#eef1f8",
  bgSurface: "#f6f8fc",
  bgElevated: "#ffffff",
  bgGlass: "rgba(255, 255, 255, 0.65)",
  bgGlassStrong: "rgba(255, 255, 255, 0.8)",
  border: "rgba(0, 0, 0, 0.08)",
  borderLight: "rgba(0, 0, 0, 0.04)",
  text: "#1e293b",
  textSecondary: "#475569",
  textMuted: "#94a3b8",
  sidebarBg: "rgba(255, 255, 255, 0.7)",
  sidebarGlass: "blur(20px)",
  navbarBg: "rgba(246, 248, 252, 0.75)",
  cardBg: "rgba(255, 255, 255, 0.65)",
  cardBorder: "rgba(0, 0, 0, 0.06)",
  cardHoverShadow: "0 12px 40px rgba(100,116,139,0.12)",
  inputBg: "rgba(255, 255, 255, 0.8)",
  inputBorder: "rgba(0, 0, 0, 0.1)",
  accent: "#7c3aed",
  accentLight: "#8b5cf6",
  accentGlow: "rgba(124, 58, 237, 0.1)",
  glassBlur: "blur(16px)",
  glassBorder: "rgba(255, 255, 255, 0.5)",
  scrollTrack: "#eef1f8",
  scrollThumb: "#c1c8d6",
  scrollThumbHover: "#a0aab8",
  shadow: "0 4px 24px rgba(100,116,139,0.08)",
  shadowStrong: "0 8px 40px rgba(100,116,139,0.15)",
  hoverBg: "rgba(0, 0, 0, 0.03)",
};

interface ThemeContextValue {
  tokens: ThemeTokens;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  tokens: darkTokens,
  mode: "dark",
  toggleTheme: () => {},
});

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme-mode") as ThemeMode | null;
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme-mode", next);
      return next;
    });
  };

  const tokens = useMemo(() => (mode === "dark" ? darkTokens : lightTokens), [mode]);

  const value = useMemo(() => ({ tokens, mode, toggleTheme }), [tokens, mode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
