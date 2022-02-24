import React from "react";
import CssBaseline  from '@mui/material/CssBaseline';
import {  ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import GlobalStyles from './styles/Global';
import IndexPage from "./pages"

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
