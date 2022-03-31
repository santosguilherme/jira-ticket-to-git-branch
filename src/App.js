import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import IndexPage from "./pages";
import GlobalStyles from "./styles/Global";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <IndexPage />
    </ThemeProvider>
  );
}

export default App;
