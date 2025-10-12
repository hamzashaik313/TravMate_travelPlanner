// src/theme.js
import { createTheme } from "@mui/material/styles";
import { purple, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6C5CE7",
    },
    secondary: {
      main: "#00B894",
    },
    background: {
      default: "#F7F9FF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.1 },
    h2: { fontSize: "1.5rem", fontWeight: 700 },
    body1: { fontSize: "1rem" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          padding: "10px 18px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(16,24,40,0.08)",
        },
      },
    },
  },
});

export default theme;
