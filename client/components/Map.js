import ReactMapGL, { NavigationControl } from "react-map-gl";
import React, { Component } from "react";
import { css } from "@emotion/core";

class Map extends Component {
  render() {
    return (
      <ReactMapGL
        {...this.props.viewport}
        minZoom={8}
        maxZoom={16}
        width="100%"
        height="100%"
        dragRotate={false}
        touchRotate={false}
        mapStyle="mapbox://styles/mapbox/bright-v9"
        mapboxApiAccessToken={process.env.MAPBOX_PUBLIC_API_KEY}
        onViewportChange={this.props.setViewport}
      >
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
            onViewportChange={this.props.setViewport}
          />
        </div>

        {this.props.children}
      </ReactMapGL>
    );
  }
}

export default Map;
