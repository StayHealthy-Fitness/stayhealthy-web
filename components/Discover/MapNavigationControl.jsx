import { NavigationControl } from "react-map-gl";
import { css } from "@emotion/core";
import React from "react";

const MapNavigationControl = (props) => (
  <div
    css={css`
      position: absolute;
      padding: 15px;
      left: 0;
      top: 0;
    `}
  >
    <NavigationControl
      showCompass={false}
      onViewportChange={props.onViewportChange}
    />
  </div>
);

export default MapNavigationControl;
