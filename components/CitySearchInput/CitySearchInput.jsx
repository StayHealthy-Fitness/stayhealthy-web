import { AutoComplete, Input, Icon, Spin } from "antd";
import { css } from "@emotion/core";
import React from "react";

const ActivitySearchInput = (props) => {
  return (
    <AutoComplete
      value={props.value}
      ref={props.innerRef}
      dataSource={props.dataSource}
      placeholder={props.placeholder}
      dropdownMatchSelectWidth={false}
      notFoundContent={
        props.loading ? (
          <div
            css={css`
              text-align: center;
              padding: 5px;
            `}
          >
            <Spin size="small" />
          </div>
        ) : null
      }
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onSelect={props.onSelect}
      onChange={props.onChange}
      onSearch={props.onSearch}
      css={css`
        width: 250px;
      `}
    >
      <Input
        suffix={
          <Icon
            type="environment"
            css={css`
              color: #6e6e6e;
              font-size: 16px;
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            `}
          />
        }
      />
    </AutoComplete>
  );
};

// eslint-disable-next-line react/display-name
export default React.forwardRef((props, ref) => (
  <ActivitySearchInput innerRef={ref} {...props} />
));
