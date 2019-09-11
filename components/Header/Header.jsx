import { css } from "@emotion/core";
import { Layout } from "antd";
import React from "react";

const { Header: AntHeader } = Layout;

// eslint-disable-next-line react/display-name
export default (props) => (
  <AntHeader
    css={css`
      background-color: #ffffff;
      box-shadow: 0 2px 8px #f0f1f2;
      z-index: 100;
    `}
  >
    <img
      css={css`
        float: left;
        width: 189px;
        height: 40px;
        margin: 12px 24px 12px 0;
      `}
      src="/static/stayhealthy-logo.svg"
    />

    {props.children}
  </AntHeader>
);
