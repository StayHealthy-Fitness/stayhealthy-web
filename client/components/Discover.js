import {
  Layout,
  Input,
  Icon,
  Typography,
  Anchor,
  AutoComplete,
  Spin
} from "antd";
import { RefinementList } from "react-instantsearch-dom";
import { FlyToInterpolator } from "react-map-gl";
import React, { Component, createRef } from "react";
import { css } from "@emotion/core";
import axios from "axios";

import { InstantSearch } from "../lib/instantSearch";
import CustomSearchBox from "./CustomSearchBox";
import MapMarkerPopup from "./MapMarkerPopup";
import FeedbackDrawer from "./FeedbackDrawer";
import ControlPanel from "./ControlPanel";
import MapMarker from "./MapMarker";
import MapList from "./MapList";
import Header from "./Header";
import Map from "./Map";

const { Content, Sider } = Layout;
const { Text } = Typography;
const { Link } = Anchor;

const mapData = [
  {
    title: "Vinith's Running Club",
    activity: "Running",
    _geoloc: {
      lat: 44.229482,
      lng: -76.494253
    }
  },
  {
    title: "Jack's Yoga Studio",
    activity: "Yoga",
    _geoloc: {
      lat: 44.23107,
      lng: -76.4806
    }
  },
  {
    title: "Luke's Dragon Boat Squad",
    activity: "Dragon Boat Paddling",
    _geoloc: {
      lat: 44.242427,
      lng: -76.4803
    }
  },
  {
    title: "Haylee's Spin Studio",
    activity: "Spinning",
    _geoloc: {
      lat: 44.234362,
      lng: -76.496516
    }
  },
  {
    title: "Steph's Sailing Class",
    activity: "Sailing",
    _geoloc: {
      lat: 44.222674,
      lng: -76.486814
    }
  },
  {
    title: "Sarah's Yoga Studio",
    activity: "Yoga",
    _geoloc: {
      lat: 44.229046,
      lng: -76.492749
    }
  },
  {
    title: "Mariano's Boxing Class",
    activity: "Boxing",
    _geoloc: {
      lat: 44.231724,
      lng: -76.482643
    }
  },
  {
    title: "Robert's Tennis Academy",
    activity: "Tennis",
    _geoloc: {
      lat: 44.233486,
      lng: -76.49972
    }
  }
];

const activityIconNameMap = {
  ["Yoga"]: "yoga",
  ["Tennis"]: "tennis",
  ["Boxing"]: "boxing",
  ["Running"]: "running",
  ["Sailing"]: "sailing",
  ["Spinning"]: "spinning",
  ["Dragon Boat Paddling"]: "dragon-boat"
};

const DEFAULT_LOCATION = [-79.3849, 43.6529];

class Discover extends Component {
  constructor(props) {
    super(props);

    const [lng, lat] = DEFAULT_LOCATION;

    this.state = {
      mapViewport: {
        zoom: 13,
        latitude: lat,
        longitude: lng
      },

      locationSearchValue: {
        value: "Toronto, Ontario, Canada",
        selected: false
      },
      locationSearchSuggestions: [],
      locationSearchSuggestionsLoading: false,

      currentMapLocation: {
        name: null,
        geometry: null
      },

      feedbackDrawerVisible: false
    };

    this.locationSearchInputRef = createRef();
  }

  async componentDidMount() {
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
          },
          currentMapLocation: {
            name: res.data.features[0].place_name,
            geometry: res.data.features[0].geometry
          }
        });

        this.setMapViewport({
          latitude,
          longitude
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentMapLocation.name !== this.state.currentMapLocation.name
    ) {
      this.locationSearchInputRef.current.blur();
    }
  }

  updateLocationSearchSuggestions = async (value) => {
    if (value) {
      try {
        this.setState({
          locationSearchSuggestions: [],
          locationSearchSuggestionsLoading: true
        });

        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${
            process.env.MAPBOX_PUBLIC_API_KEY
          }&cachebuster=1552757677813&autocomplete=true&country=ca&types=place&limit=5&language=en`
        );
        console.log(res);

        this.setState({
          locationSearchSuggestionsLoading: false,
          locationSearchSuggestions: res.data.features.map((feature) => ({
            text: feature.place_name,
            value: JSON.stringify({
              name: feature.place_name,
              geometry: feature.geometry
            })
          }))
        });
      } catch (e) {
        console.log(e.repsonse);
      }
    }
  };

  handleLocationSearchChange = (value) => {
    try {
      const parsedValue = JSON.parse(value);

      this.setState({
        locationSearchValue: {
          ...this.state.locationSearchValue,
          selected: true,
          value: parsedValue.name
        },
        locationSearchSuggestions: [],
        locationSearchSuggestionsLoading: false
      });
    } catch (e) {
      this.setState({
        locationSearchValue: {
          ...this.state.locationSearchValue,
          value
        },
        locationSearchSuggestions: [],
        locationSearchSuggestionsLoading: false
      });
    }
  };

  handleLocationSearchSelect = (value) => {
    const parsedValue = JSON.parse(value);

    this.setState({
      currentMapLocation: parsedValue
    });

    const [lng, lat] = parsedValue.geometry.coordinates;

    this.flyToMapViewport(lat, lng);
  };

  handleLocationSearchBlur = () => {
    if (!this.state.locationSearchValue.selected) {
      this.setState({
        locationSearchValue: {
          value: this.state.currentMapLocation.name,
          selected: false
        }
      });
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

  flyToMapViewport = (latitude, longitude) => {
    this.setMapViewport({
      latitude,
      longitude,
      transitionDuration: 3500,
      transitionInterpolator: new FlyToInterpolator()
    });
  };

  renderActivityMarker = (activity, index) => {
    return (
      <MapMarker
        key={`map-marker-${index}`}
        lat={activity._geoloc.lat}
        lng={activity._geoloc.lng}
        iconName={activityIconNameMap[activity.activity]}
      />
    );
  };

  render() {
    return (
      <InstantSearch
        indexName="sh_test_index"
        appId={process.env.ALGOLIA_APP_ID}
        apiKey={process.env.ALGOLIA_API_KEY}
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
            <CustomSearchBox placeholder="Find studios, gyms, events, ..." />
            <AutoComplete
              dataSource={this.state.locationSearchSuggestions}
              value={this.state.locationSearchValue.value}
              onChange={this.handleLocationSearchChange}
              onSearch={this.updateLocationSearchSuggestions}
              onFocus={() =>
                this.setState({
                  locationSearchValue: {
                    value: null,
                    selected: false
                  }
                })
              }
              ref={this.locationSearchInputRef}
              onSelect={this.handleLocationSearchSelect}
              onBlur={this.handleLocationSearchBlur}
              notFoundContent={
                this.locationSearchSuggestionsLoading ? (
                  <Spin size="small" />
                ) : null
              }
              dropdownMatchSelectWidth={false}
              placeholder="Search location"
              css={css`
                width: 250px;
              `}
            >
              <Input
                suffix={
                  <Icon
                    type="compass"
                    css={css`
                      color: #6e6e6e;
                      font-size: 16px;
                      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                    `}
                  />
                }
              />
            </AutoComplete>
          </Header>
          <Layout hasSider={true}>
            <Sider
              width={450}
              theme="light"
              collapsed={false}
              collapsedWidth={0}
            >
              <MapList />
              <div
                css={css`
                  bottom: 0;
                  width: 100%;
                  height: 60px;
                  position: absolute;
                  border-top: 1px solid #ebedf0;
                `}
              >
                <Text type="secondary">
                  Something not quite right? Know a place we could add?
                  <Anchor
                    onClick={() =>
                      this.setState({ feedbackDrawerVisible: true })
                    }
                  >
                    <Link title="Give feedback." />
                  </Anchor>
                </Text>
              </div>
              <FeedbackDrawer
                visible={this.state.feedbackDrawerVisible}
                onClose={() => this.setState({ feedbackDrawerVisible: false })}
              />
            </Sider>
            <Content>
              <Map
                viewport={this.state.mapViewport}
                setViewport={this.setMapViewport}
              >
                <ControlPanel>
                  <RefinementList attribute="activity" />
                </ControlPanel>

                {mapData.map(this.renderActivityMarker)}

                {/* { this.renderPopup() } */}
              </Map>
            </Content>
          </Layout>
        </Layout>
      </InstantSearch>
    );
  }
}

export default Discover;
