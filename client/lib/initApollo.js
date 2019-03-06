import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import fetch from "isomorphic-unfetch";

import { isBrowser } from "./isBrowser";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  global.fetch = fetch;
}

const GRAPHQL_ENDPOINT = "http://localhost:3000/graphql";
const CLIENT_NAME = "stayhealthy-web";
const CLIENT_VERSION = "0.1.0";

function create(initialState, { getAccessToken }) {
  // Cache used for local state and query caching
  const cache = new InMemoryCache().restore(initialState || {});

  // GraphQL error handler link
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        // Print all errors out to console
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }

      // Print any network errors
      if (networkError) {
        console.log(`[Network Error]: ${networkError}`);
      }
    }
  );

  // Set authorization headers in context
  const authLink = setContext((_, { headers }) => {
    // const accessToken = getAccessToken();

    return {
      headers: {
        ...headers
        // authorization: token ? `Bearer ${accessToken}` : ''
      }
    };
  });

  // Terminating link to fetch data from server
  // NOTE: Reads request headers from context
  const networkLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: "same-origin"
  });

  // Create the Apollo Client
  return new ApolloClient({
    cache,
    link: ApolloLink.from([errorLink, authLink, networkLink]),
    name: CLIENT_NAME,
    version: CLIENT_VERSION,
    ssrMode: !isBrowser,
    connectToDevTools: isBrowser
  });
}

export default function initApollo(initialState, options) {
  // Don't reuse client on new server requests
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
