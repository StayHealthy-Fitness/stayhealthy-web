import WebMercatorViewport from "viewport-mercator-project";
import { FlyToInterpolator } from "react-map-gl";
import React, { Component } from "react";
import { css } from "@emotion/core";
import { Layout } from "antd";
import axios from "axios";

import CitySearchInput from "../CitySearchInput/CitySearchInput";
import { InstantSearch } from "../../lib/instantSearch";
import ActivitySearchInput from "./ActivitySearchInput";
import ActivityMapContent from "./ActivityMapContent";
import ActivityListSider from "./ActivityListSider";
import Header from "../Header/Header";

const DEFAULT_LOCATION = [-79.3849, 43.6529];

class Discover extends Component {
  constructor(props) {
    super(props);

    const [lng, lat] = DEFAULT_LOCATION;

    this.state = {
      mapViewport: {
        zoom: 13,
        latitude: lat,
        longitude: lng,
        bearing: 0,
        pitch: 0
      }
    };

    this.activityMapRef = React.createRef();
  }

  async componentDidMount() {
    setTimeout(() => {
      const { boundingBox } = this.props.searchState;

      if (boundingBox) {
        const { northEast, southWest } = boundingBox;

        const viewport = new WebMercatorViewport({
          ...this.state.mapViewport
        });

        const ne = {
          lng: parseFloat(northEast.lng),
          lat: parseFloat(northEast.lat)
        };

        const sw = {
          lng: parseFloat(southWest.lng),
          lat: parseFloat(southWest.lat)
        };

        const { longitude, latitude, zoom } = viewport.fitBounds([
          [ne.lng, ne.lat],
          [sw.lng, sw.lat]
        ]);

        this.setMapViewport({
          longitude,
          latitude,
          zoom
        });
      } else {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            const res = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
                process.env.MAPBOX_PUBLIC_API_KEY
              }&cachebuster=1552757677813&country=ca&types=place&limit=5&language=en`
            );

            this.setState({
              locationSearchValue: {
                value: res.data.features[0].place_name
              }
            });

            this.setMapViewport({
              latitude,
              longitude
            });
          },
          (err) => {
            // TODO: Make sure user permission states are gracefully.
            console.log("Make sure to do error handling here!");
          }
        );
      }
    }, 100);
  }

  setMapViewport = (viewport) => {
    this.setState({
      mapViewport: {
        ...this.state.mapViewport,
        ...viewport
      }
    });
  };

  flyToMapViewport = (latitude, longitude) => {
    this.setMapViewport({
      latitude,
      longitude,
      transitionDuration: 3500,
      transitionInterpolator: new FlyToInterpolator()
    });
  };

  render() {
    return (
      <InstantSearch
        indexName="sh_test_index"
        searchState={this.props.searchState}
        resultsState={this.props.resultsState}
        appId={process.env.ALGOLIA_APP_ID}
        apiKey={process.env.ALGOLIA_API_KEY}
        onSearchStateChange={this.props.onSearchStateChange}
      >
        <Layout
          css={css`
            height: 100%;
          `}
        >
          <Header>
            <ActivitySearchInput placeholder="Find studios, gyms, events, ..." />
            <CitySearchInput placeholder="Search location" />
          </Header>

          <Layout hasSider={true}>
            <ActivityListSider />
            <ActivityMapContent
              ref={this.activityMapRef}
              viewport={this.state.mapViewport}
              setMapViewport={this.setMapViewport}
            />
          </Layout>
        </Layout>
      </InstantSearch>
    );
  }
}

export default Discover;
