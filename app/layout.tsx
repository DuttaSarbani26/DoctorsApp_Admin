"use client";

import "./globals.css";
import Providers from "@/redux/providers/providers";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <ThemeContextProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
              </LocalizationProvider>
            </ThemeProvider>
          </ThemeContextProvider>
        </Providers>
      </body>
    </html>
  );
}
