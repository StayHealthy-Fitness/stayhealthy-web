import React from "react";
import { css } from "@emotion/core";
import { Typography } from "antd";

const { Title, Text } = Typography;

const ComingSoon = () => {
  return (
    <div
      css={css`
        position: absolute;
        margin: auto;
        top: 150px;
        right: 0;
        left: 0;
        width: 500px;
        height: 300px;
        text-align: center;
      `}
    >
      <img
        css={css`
          float: center;
          width: 300px;
          height: 150px;
        `}
        src="/static/stayhealthy-logo.svg"
      />
      <Title level={4}>A healthier you is coming soon.</Title>
      <Text
        type="primary"
        css={css`
          font-size: 16px;
        `}
      >
        We&apos;re busy working towards a goal of making fitness more
        discoverable.
      </Text>
    </div>
  );
};

export default ComingSoon;
