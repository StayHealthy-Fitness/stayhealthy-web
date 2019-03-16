import { Layout, AutoComplete, Input, Icon, Typography, Anchor } from "antd";
import { RefinementList } from "react-instantsearch-dom";
import React, { Component } from "react";
import { css } from "@emotion/core";

import { InstantSearch } from "../lib/instantSearch";
import CustomSearchBox from "./CustomSearchBox";
import MapMarkerPopup from "./MapMarkerPopup";
import FeedbackDrawer from "./FeedbackDrawer";
import ControlPanel from "./ControlPanel";
import MapMarker from "./MapMarker";
import MapList from "./MapList";
import Header from "./Header";
import Map from "./Map";
import { throwServerError } from "apollo-link-http-common";

const { Content, Sider } = Layout;
const { Text } = Typography;
const { Link } = Anchor;

const dataSource1 = ["Burns Bay Road", "Downing Street", "Wall Street"];

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

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackDrawerVisible: false
    };
  }

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
              dataSource={dataSource1}
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
              <Map>
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
