import { connectGeoSearch } from "react-instantsearch-dom";
import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import { Layout } from "antd";

import MapNavigationControl from "./MapNavigationControl";
import MapControlPanel from "./MapControlPanel";
import MapMarker from "./MapMarker";

const { Content } = Layout;

const activityIconNameMap = {
  ["Yoga"]: "yoga",
  ["Tennis"]: "tennis",
  ["Boxing"]: "boxing",
  ["Running"]: "running",
  ["Sailing"]: "sailing",
  ["Spinning"]: "spinning",
  ["Dragon Boat Paddling"]: "dragon-boat"
};

class ActivityMapContent extends Component {
  constructor(props) {
    super(props);

    this.mapMarkers = [];
  }

  componentDidUpdate(prevProps) {
    const { hits } = this.props;

    if (hits !== prevProps.hits) {
      this.mapMarkers = [];

      this.mapMarkers = hits.map(activity => this.activityMapMarker(activity));
    }
  }

  refineSearchFromMapBounds = () => {
    const { refine } = this.props;

    const bounds = this.props.innerRef.current
      ? this.props.innerRef.current.getMap().getBounds()
      : null;

    if (bounds) {
      const { _ne, _sw } = bounds;

      refine({
        northEast: { lat: _ne.lat, lng: _ne.lng },
        southWest: { lat: _sw.lat, lng: _sw.lng }
      });
    }
  };

  onLoad = () => {
    this.refineSearchFromMapBounds();
  };

  onViewportChange = viewport => {
    this.props.onViewportChange(viewport);
  };

  onInteractionStateChange = interactionState => {
    if (!interactionState.isDragging && !interactionState.isTransitioning) {
      this.refineSearchFromMapBounds();
    }

    this.props.onInteractionStateChange(interactionState);
  };

  activityMapMarker = activity => {
    const selected =
      this.props.selectedHit &&
      this.props.selectedHit.objectID === activity.objectID;

    return (
      <MapMarker
        key={`map-marker-${activity.title}`}
        lat={activity._geoloc.lat}
        lng={activity._geoloc.lng}
        iconName={activityIconNameMap[activity.activity]}
        selected={selected}
        onMouseLeave={this.props.onHitMouseLeave}
        onMouseEnter={() => this.props.onHitMouseEnter(activity)}
      />
    );
  };

  render() {
    return (
      <Content>
        <ReactMapGL
          {...this.props.viewport}
          ref={this.props.innerRef}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/bright-v9"
          minZoom={8}
          maxZoom={16}
          dragPan={true}
          scrollZoom={true}
          dragRotate={false}
          touchRotate={false}
          doubleClickZoom={true}
          onLoad={this.onLoad}
          onViewportChange={this.onViewportChange}
          onInteractionStateChange={this.onInteractionStateChange}
          mapboxApiAccessToken={process.env.MAPBOX_PUBLIC_API_KEY}
        >
          <MapNavigationControl onViewportChange={this.onViewportChange} />

          {/* TODO: Add user location pulse. */}

          {this.mapMarkers.map(marker => marker)}

          <MapControlPanel />

          {this.props.children}
        </ReactMapGL>
      </Content>
    );
  }
}

const GeoSearchActivityMapContent = connectGeoSearch(ActivityMapContent);

export default React.forwardRef((props, ref) => (
  <GeoSearchActivityMapContent innerRef={ref} {...props} />
));
