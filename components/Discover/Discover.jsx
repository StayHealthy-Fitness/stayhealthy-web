import WebMercatorViewport from "viewport-mercator-project";
import { LinearInterpolator } from "react-map-gl";
import algoliasearch from "algoliasearch";
import React, { Component } from "react";
import { css } from "@emotion/core";
import { Layout } from "antd";
import axios from "axios";

import isGeolocationSupported from "../../lib/isGeolocationSupported";
import CitySearchInput from "../CitySearchInput/CitySearchInput";
import { InstantSearch } from "../../lib/instantSearch";
import ActivitySearchInput from "./ActivitySearchInput";
import ActivityMapContent from "./ActivityMapContent";
import ActivityListSider from "./ActivityListSider";
import Header from "../Header/Header";

const DEFAULT_LOCATION = {
  geometry: {
    lat: 43.6529,
    lng: -79.3849
  },
  name: "Toronto, Ontario, Canada"
};

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

class Discover extends Component {
  constructor(props) {
    super(props);

    const { geometry, name } = DEFAULT_LOCATION;

    this.state = {
      mapViewport: {
        zoom: 13,
        pitch: 0,
        bearing: 0,
        latitude: geometry.lat,
        longitude: geometry.lng
      },

      previousLocationSearchValue: name,

      locationSearchValue: name,
      locationSearchSuggestions: [],
      locationSearchValueSelected: false,
      locationSearchSuggestionsLoading: false,

      selectedActivity: null
    };

    this.activityMapRef = React.createRef();
    this.locationSearchInputRef = React.createRef();
  }

  async componentDidMount() {
    setTimeout(async () => {
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

        await this.updateSearchLocationValueFromCoordinates(
          latitude,
          longitude
        );

        this.setMapViewport({
          longitude,
          latitude,
          zoom
        });
      } else {
        if (isGeolocationSupported) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              await this.updateSearchLocationValueFromCoordinates(
                latitude,
                longitude
              );

              this.transistionToMapViewport(latitude, longitude);
            },
            () => {
              // TODO: Make sure user permission states are gracefully.
              console.log("Make sure to do error handling here!");
            }
          );
        }
      }
    }, 100);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.previousLocationSearchValue !==
        this.state.previousLocationSearchValue ||
      this.state.locationSearchValueSelected
    ) {
      this.locationSearchInputRef.current.blur();
    }
  }

  getLocationsFromCoordinates = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_PUBLIC_API_KEY}&cachebuster=1552757677813&country=ca&types=place&limit=5&language=en`
      );

      const { features } = res.data;

      return Promise.resolve(features);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

  getLocationsFromText = async (query) => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MAPBOX_PUBLIC_API_KEY}&cachebuster=1552757677813&autocomplete=true&country=ca&types=place&limit=5&language=en`
      );

      const { features } = res.data;

      return Promise.resolve(features);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

  updateSearchLocationValueFromCoordinates = async (latitude, longitude) => {
    const features = await this.getLocationsFromCoordinates(
      latitude,
      longitude
    );

    if (features.length > 0) {
      const userLocation = features[0].place_name;

      this.setState({
        locationSearchValue: userLocation,
        previousLocationSearchValue: userLocation
      });
    }
  };

  onMapInteractionStateChange = async (interactionState) => {
    if (!interactionState.isDragging && !interactionState.isTransitioning) {
      const { latitude, longitude } = this.state.mapViewport;

      await this.updateSearchLocationValueFromCoordinates(latitude, longitude);
    }
  };

  setMapViewport = (viewport) => {
    this.setState({
      mapViewport: {
        ...this.state.mapViewport,
        ...viewport
      }
    });
  };

  transistionToMapViewport = (lat, lng) => {
    this.setMapViewport({
      latitude: lat,
      longitude: lng,
      transitionDuration: 100,
      transitionInterpolator: new LinearInterpolator()
    });
  };

  locationSearchOnSearch = async (value) => {
    if (value) {
      try {
        this.setState({
          locationSearchSuggestions: [],
          locationSearchSuggestionsLoading: true
        });

        const features = await this.getLocationsFromText(value);

        this.setState({
          locationSearchSuggestionsLoading: false,
          locationSearchSuggestions: features.map((feature) => ({
            text: feature.place_name,
            value: JSON.stringify({
              name: feature.place_name,
              geometry: feature.geometry
            })
          }))
        });
      } catch (e) {
        // TODO: Handle response gracefully here.
        console.log(e.repsonse);
      }
    }
  };

  locationSearchOnChange = (value) => {
    try {
      const parsedValue = JSON.parse(value);

      this.setState({
        locationSearchValueSelected: true,
        locationSearchValue: parsedValue.name
      });
    } catch (e) {
      this.setState({
        locationSearchValue: value
      });
    }
  };

  locationSearchOnSelect = (value) => {
    const parsedValue = JSON.parse(value);

    this.setState({
      previousLocationSearchValue: parsedValue.name
    });

    const [lng, lat] = parsedValue.geometry.coordinates;

    this.transistionToMapViewport(lat, lng);
  };

  locationSearchOnFocus = () => {
    this.setState({
      locationSearchValue: null,
      locationSearchSuggestions: [],
      locationSearchValueSelected: false
    });
  };

  locationSearchOnBlur = () => {
    if (!this.state.locationSearchValueSelected) {
      this.setState({
        locationSearchValueSelected: false,
        locationSearchValue: this.state.previousLocationSearchValue
      });
    }
  };

  onHitMouseEnter = (activity) => {
    this.setState({
      selectedActivity: activity
    });
  };

  onHitMouseLeave = () => {
    this.setState({
      selectedActivity: null
    });
  };

  render() {
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.ALGOLIA_MAP_SEARCH_INDEX}
        searchState={this.props.searchState}
        resultsState={this.props.resultsState}
        onSearchStateChange={this.props.onSearchStateChange}
      >
        <Layout
          css={css`
            height: 100%;
          `}
        >
          <Header>
            <ActivitySearchInput placeholder="Find studios, gyms, events, ..." />
            <CitySearchInput
              ref={this.locationSearchInputRef}
              value={this.state.locationSearchValue}
              dataSource={this.state.locationSearchSuggestions}
              loading={this.state.locationSearchSuggestionsLoading}
              onBlur={this.locationSearchOnBlur}
              onFocus={this.locationSearchOnFocus}
              onChange={this.locationSearchOnChange}
              onSelect={this.locationSearchOnSelect}
              onSearch={this.locationSearchOnSearch}
              placeholder="Search location"
            />
          </Header>

          <Layout hasSider={true}>
            <ActivityListSider
              selectedHit={this.state.selectedActivity}
              onHitMouseEnter={this.onHitMouseEnter}
              onHitMouseLeave={this.onHitMouseLeave}
            />
            <ActivityMapContent
              ref={this.activityMapRef}
              viewport={this.state.mapViewport}
              selectedHit={this.state.selectedActivity}
              onHitMouseEnter={this.onHitMouseEnter}
              onHitMouseLeave={this.onHitMouseLeave}
              onViewportChange={this.setMapViewport}
              onInteractionStateChange={this.onMapInteractionStateChange}
            />
          </Layout>
        </Layout>
      </InstantSearch>
    );
  }
}

export default Discover;
