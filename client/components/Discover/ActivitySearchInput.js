import { connectSearchBox } from "react-instantsearch-dom";
import { css } from "@emotion/core";
import { Input, Icon } from "antd";
import React from "react";

const ActivitySearchInput = ({ currentRefinement, refine, placeholder }) => (
  <Input
    value={currentRefinement}
    onChange={(event) => refine(event.currentTarget.value)}
    placeholder={placeholder}
    suffix={
      <Icon
        type="search"
        css={css`
          color: #6e6e6e;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        `}
      />
    }
    css={css`
      width: 250px;
      font-size: 16px;
      margin: 0 24px 0 0;
    `}
  />
);

export default connectSearchBox(ActivitySearchInput);
