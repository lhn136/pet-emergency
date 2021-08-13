// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

const currentKey = process.env.YELP_API_TOKEN;
const client = new ApolloClient({
  uri: 'https://api.yelp.com/v3/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${currentKey}`,
    'Accept-Language': 'en-US',
  },
});

export default client;
