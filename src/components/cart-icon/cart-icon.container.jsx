import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

// this is the mutation we have defined in resolvers.json
const TOGGLE_CART_HIDDEN = gql`
  mutation toggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// every time we fire a mutation, the mutation will update the value defined on index.js (client.writeData); and
// when this value updates all the containers will be refreshed (containers listening that value)
const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => (
  <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

export default flowRight(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer); 