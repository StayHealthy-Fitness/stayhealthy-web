import { BaseControl } from "react-map-gl";
import { css } from "@emotion/core";
import { Card } from "antd";
import React from "react";

class ControlPanel extends BaseControl {
  _render() {
    return (
      <div ref={this._containerRef}>
        <Card
          title="Filter Results"
          bordered={false}
          css={css`
            positon: absolute;
            height: 600px;
            margin: 15px;
            float: right;
            width: 250px;
            cursor: auto;
            z-index: 1000;
          `}
        >
          {this.props.children}
        </Card>
      </div>
    );
  }
}

export default ControlPanel;
