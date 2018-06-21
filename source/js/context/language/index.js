import { createContext } from 'react';

const { Provider, Consumer } = createContext({
  language: 'en'
});

export { Provider, Consumer };