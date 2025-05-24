import { createTheme } from "@mui/material";

export const kinoTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#a72224" },
    background: { paper: "#2d2d2d", default: "#2d2d2d" },
    text: { primary: "#f6f6f6" },
  },
  typography: { fontFamily: "Poppins, sans-serif" },
});
