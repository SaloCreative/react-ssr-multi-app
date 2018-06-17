import gql from 'graphql-tag';

const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
    }
  }
`;

export default GET_USERS;