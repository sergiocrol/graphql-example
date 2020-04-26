import React from 'react';
import { Route } from 'react-router-dom';

// We use curly braces when we do a non default export. In this case we export collections-overview.container as default
// so if we want to use a different name of the exported one we can use this "default as" syntax
import { default as CollectionsOverview } from '../../components/collections-overview/collections-overview.container';
import { default as CollectionPage } from '../collection/collection.container';

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
