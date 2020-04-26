import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers';

// create a conexcion betwen our backend server endpoint (/graphql) and the client
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

// Apollo allows us to cache in memory the result of the requests in order to no repeat them if we already have the content
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

// The data here is like the redux store. An object where the first time the app init, we pass thos values we want to save globally
client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
