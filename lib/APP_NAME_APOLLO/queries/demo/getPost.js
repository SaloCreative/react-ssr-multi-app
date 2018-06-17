import gql from 'graphql-tag';

const GET_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;

export default GET_POST;