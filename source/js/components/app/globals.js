import { createGlobalStyle } from 'styled-components';
import { get } from 'lodash';

/**
 * GLOBAL STYLING RULES
 *
 * This should be included after the normalise component.
 * If using a theme provider this should be included within
 * it and written to honour any theme passed through
*/

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 10px;
  }

  body {
    color: #5a5a5b;
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  button {
    outline: none !important;
  }
`;

export default GlobalStyles;