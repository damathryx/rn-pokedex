import Relay from 'react-relay';

const ViewerQuery = {
    viewer: () => Relay.QL`
    query {
      query
    }
  `,
};

export default ViewerQuery;