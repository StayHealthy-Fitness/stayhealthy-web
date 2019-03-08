import React, { Component } from "react";
import redirect from "../lib/redirect";

export default (C, options) => {
  return class withAuth extends Component {
    static async getInitialProps(ctx) {
      // perform auth here

      if (true) {
        redirect(ctx, "/login");
      }

      return {};
    }

    render() {
      return <C {...this.props} />;
    }
  };
};
