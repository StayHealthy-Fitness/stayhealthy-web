import { connectSearchBox } from "react-instantsearch-dom";
import { Input, Icon, Select } from "antd";
import { css } from "@emotion/core";
import React from "react";

const OptGroup = Select.OptGroup;
const Option = Select.Option;

const ActivitySearchInput = (props) => {
  function renderTitle(title) {
    return <span>{title}</span>;
  }

  function renderDropdownMenu(menu) {
    return (
      <div>
        <div onClick={() => props.refine("Hey Man")}>Hey Man</div>
        {menu}
      </div>
    );
  }

  return (
    <Select
      showSearch={true}
      value={props.currentRefinement}
      placeholder={props.placeholder}
      dropdownRender={renderDropdownMenu}
      onChange={(value) => props.refine(value)}
      css={css`
        width: 250px;
        font-size: 14px;
        margin: 0 24px 0 0;
      `}
    >
      <OptGroup key={"bobgroup"} label={renderTitle("Recent Searches")}>
        <Option key={"bob"} value={"Yoga"}>
          {"bob2"}
        </Option>
        <Option key={"bob2"} value={"bob3"}>
          {"bob3"}
        </Option>
      </OptGroup>
    </Select>
  );
};

export default connectSearchBox(ActivitySearchInput);
