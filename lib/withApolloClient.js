import { getDataFromTree } from "react-apollo";
import React, { Component } from "react";
import Head from "next/head";

import { isBrowser } from "./isBrowser";
import initApollo from "./initApollo";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ACCESS_TOKEN_KEY = "stayhealthy-access-token";

export default (App) => {
  // eslint-disable-next-line @typescript-eslint/class-name-casing
  return class withApolloClient extends Component {
    static displayName = `withApolloClient(${App.displayName})`;

    static async getInitialProps(ctx) {
      /* eslint-disable */
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx;
      /* eslint-enable */

      const apollo = initApollo({}, {});

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        return {};
      }

      if (!isBrowser) {
        try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          console.error("Error while running `getDataFromTree`", error);
        }

        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    constructor(props) {
      super(props);

      this.apolloClient = initApollo(props.apolloState, {});
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
