import { useEffect, useState } from "react";
import World from "./Components/World";
import data from "./data.json";
import Home from "./Components/Home";
import { ThemeProvider, createTheme, withTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000"
      },
      secondary: {
        main: "#BB86FC"
      },
      background: {
        main: "#1E1E1E"
      },
    },
    text: {
      onPrimary: "#B0B0B0",
      onBackground: "#E2E2E2",
      onSecondary: "#000"
    }
  });
  return(
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  )
}

export default App;
