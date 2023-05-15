import { gql } from '@apollo/client';

export default gql`
  query SongDetail($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
