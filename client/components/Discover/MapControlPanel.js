import { RefinementList, connectStateResults } from "react-instantsearch-dom";
import { BaseControl } from "react-map-gl";
import { css } from "@emotion/core";
import { Card } from "antd";
import React from "react";

class MapControlPanel extends BaseControl {
  _render() {
    console.log(this.props.searchingForFacetValues);

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
          {this.props.searchingForFacetValues ? (
            <div>Loading...</div>
          ) : (
            <RefinementList attribute="activity" />
          )}

          {this.props.children}
        </Card>
      </div>
    );
  }
}

export default connectStateResults(MapControlPanel);
