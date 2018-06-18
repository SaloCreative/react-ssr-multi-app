import { createContext } from 'react';

const { Provider, Consumer } = createContext({
  user: {},
  jwt: {},
  login: () => {},
  logout: () => {}
});

export { Provider, Consumer };