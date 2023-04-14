import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './components/App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
});

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
