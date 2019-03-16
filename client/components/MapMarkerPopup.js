import { BaseControl } from "react-map-gl";
import React, { Component } from "react";

class MapMarkerPopup extends BaseControl {
  _render() {
    const { className, longitude, latitude, altitude } = this.props;

    const [x, y, z] = this._context.viewport.project([
      longitude,
      latitude,
      altitude
    ]);

    const positionType = this._getPosition(x, y);
    const containerStyle = this._getContainerStyle(x, y, z, positionType);

    return createElement(
      "div",
      {
        className: `mapboxgl-popup mapboxgl-popup-anchor-${positionType} ${className}`,
        style: containerStyle,
        ref: this._containerRef
      },
      [this._renderTip(positionType), this._renderContent()]
    );
  }
}
