import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global';
import { StylesProvider } from '@mui/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Ticket to git Branch</title>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
      </Head>
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline/>

        <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <Component {...pageProps} />
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}
