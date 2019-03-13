import ReactMapGL, { NavigationControl } from "react-map-gl";
import React, { Component } from "react";
import { css } from "@emotion/core";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 14
      }
    };

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const { viewport } = this.state;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        this.setState({
          viewport: {
            ...viewport,
            latitude,
            longitude
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );

    console.log(this.mapRef.getMap().getBounds());
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        minZoom={8}
        maxZoom={16}
        width="100%"
        height="100%"
        dragRotate={false}
        touchRotate={false}
        ref={(map) => (this.mapRef = map)}
        mapStyle="mapbox://styles/mapbox/bright-v9"
        mapboxApiAccessToken={process.env.MAPBOX_PUBLIC_API_KEY}
        onViewportChange={(viewport) => this.setState({ viewport })}
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
            onViewportChange={(viewport) => this.setState({ viewport })}
          />
        </div>

        {this.props.children}
      </ReactMapGL>
    );
  }
}

export default Map;
