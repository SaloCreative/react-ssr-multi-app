import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const JWT = null; // TODO: Replace when have an actual token to pass
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: JWT ? `Bearer ${ JWT }` : ''
    }
  };
});

/**
 * Apollo Terminating link
 * The split will skip Batching if an
 * operation's context contains hasUpload: true.
 */

const OPTS = (GraphQLUrl) => {
  return {
    uri: GraphQLUrl,
    batchInterval: 50,
    fetch
  };
};

// SETUP APOLLO CLIENT
const apollo = (GraphQLUrl) => new ApolloClient({
  link: authLink.concat(ApolloLink.split(
    operation => operation.getContext().hasUpload,
    createUploadLink(OPTS(GraphQLUrl)),
    new BatchHttpLink(OPTS(GraphQLUrl))
  )),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__) // eslint-disable-line no-underscore-dangle
});

export default apollo;