import { ApolloProvider } from "react-apollo";
import App from "next/app";
import React from "react";

import withApolloClient from "../lib/withApolloClient";

class StayHealthy extends App {
  static displayName = "StayHealthy";

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApolloClient(StayHealthy);
