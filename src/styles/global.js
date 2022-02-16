import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body {
    height: 100%;
  }

  #__next {
    min-height: 100%;
    background-color: #eee;
  }
`;
