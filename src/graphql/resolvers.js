import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount } from './cart.utils';

// Here we need to define the type's schemas. We extend from schemas of our server (May be or not there)
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

// First we have to read from our cache the initial value (cartHidden value)
// Like when we make a query to our server, we need to provide a constant with the query we want to make
// but in this case we attach the @client, so graphql can now that we're searching ir our local cache, not in our backend
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

// _root refers to the collection with which is related. For example, in our graphQL server schema, type Item is related with 
// type Collection through the property "collection: Collection". So for item, the _root would refer to the collection
// args are the parameters we pass into the mutations or queries
// the cache is destructured from _context which has the cache and the client itself
export const resolvers = {
  Mutation: {
    // Here we get the data we have defined in index.js (client.writeData), which the first time will be the given 
    // initial value (cartHidden: true)
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
      });

      // writeQuery is the opposite of readQueary. In this case we want to modify the value (it is like a setState)
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) }
      })

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
      });

      return newCartItems;
    }
  }
}