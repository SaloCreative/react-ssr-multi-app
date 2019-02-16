import { ENV } from '../helpers';

export const GraphQLUrl = (local = false) => {
  if (local && ENV === 'development') {
    return 'http://localhost:7000/graphql';
  }
  return 'http://localhost:7000/graphql'; // Replace with prod url
};