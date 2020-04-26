import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionsOverwiew from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title,
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

// this functional component returns back a Query component which will wrap our CollectionOverview (we pass the query as prop)
const CollectionsOverwiewContainer = () => (
  // the Query component gives us back a function which contains an object with a bunch of props like: loading, error and data
  // if loading is true we render our spinner 
  <Query query={GET_COLLECTIONS}>
    {
      ({ loading, data }) => {
        if (loading) return <Spinner />;
        // when the loading is done we return our actual component and we pass the data received from the query as a prop
        // the "data" is the property we always receive when we make a request, and inside we'll have the collection itself
        return <CollectionsOverwiew collections={data.collections} />;
      }
    }
  </Query>
);

export default CollectionsOverwiewContainer;