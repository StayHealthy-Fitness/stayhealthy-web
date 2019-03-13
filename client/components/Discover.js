import { Hits, Highlight, RefinementList } from "react-instantsearch-dom";
import { Layout, AutoComplete, Input, Icon } from "antd";
import React, { Component } from "react";
import { css } from "@emotion/core";

import { InstantSearch } from "../lib/instantSearch";
import CustomSearchBox from "./CustomSearchBox";
import ControlPanel from "./ControlPanel";
import Header from "./Header";
import Map from "./Map";

const { Content, Sider } = Layout;

const dataSource1 = ["Burns Bay Road", "Downing Street", "Wall Street"];

const HitComponent = ({ hit }) => (
  <div>
    <Highlight attribute="title" hit={hit} />
  </div>
);

class Discover extends Component {
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
              <Hits hitComponent={HitComponent} />
            </Sider>
            <Content>
              <Map>
                <ControlPanel>
                  <RefinementList attribute="activity" />
                </ControlPanel>
              </Map>
            </Content>
          </Layout>
        </Layout>
      </InstantSearch>
    );
  }
}

export default Discover;
