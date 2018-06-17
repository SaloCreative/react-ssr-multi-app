import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';

// SETUP APOLLO CLIENT
const apollo = new ApolloClient({
  // link: concat(authMiddleware, httpLink),
  link: ApolloLink.from([
    new BatchHttpLink({
      uri: 'http://localhost:3030/graphql',
      batchInterval: 50,
      fetch
    })
  ]),
  cache: new InMemoryCache().restore(window.__SALO_CREATIVE_STATE__)
});

export default apollo;