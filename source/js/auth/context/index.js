import { createContext } from 'react';

const { Provider, Consumer } = createContext({
  user: {},
  jwt: {},
  login: () => {},
  logout: () => {},
  loggedIn: () => false
});

export { Provider, Consumer };