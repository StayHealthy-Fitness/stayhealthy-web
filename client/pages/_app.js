import { ApolloProvider } from "react-apollo";
import App, { Container } from "next/app";
import React from "react";

import withApolloClient from "../lib/withApolloClient";

class StayHealthy extends App {
  static displayName = "StayHealthy";

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(StayHealthy);
