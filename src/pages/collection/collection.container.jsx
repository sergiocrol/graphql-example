import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

// everytime we need to pass a variable dinamically, we should use this syntax
const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPageContainer = ({ match }) => (
  <Query query={GET_COLLECTION_BY_TITLE} variables={{ title: match.params.collectionId }}>
    {
      ({ loading, data }) => {
        if (loading) return <Spinner />
        const { getCollectionsByTitle } = data;
        return <CollectionPage collection={getCollectionsByTitle} />
      }
    }
  </Query>
);

export default CollectionPageContainer;