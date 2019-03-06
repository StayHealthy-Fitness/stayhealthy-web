import { graphql } from "react-apollo";
import { css } from "@emotion/core";
import gql from "graphql-tag";
import Link from "next/link";
import React from "react";

const HELLO_QUERY = gql`
  query {
    hello
  }
`;

function About(props) {
  return (
    <div>
      {props.hello}
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
}

export default graphql(HELLO_QUERY, {
  props: ({ data }) => ({
    hello: data.hello
  })
})(About);
