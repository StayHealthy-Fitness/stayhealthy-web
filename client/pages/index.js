import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import { Menu, Layout } from "antd";
import { css } from "@emotion/core";

const { Header, Content } = Layout;

const { MAPBOX_PUBLIC_API_KEY } = process.env;

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: "100%",
        height: "1000px",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 10
      }
    };
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
  }

  render() {
    return (
      <Layout>
        <Header style={{ backgroundColor: "#FFFFFF" }}>
          <img
            css={css`
              width: 146px;
              height: 31px;
              float: left;
              margin: 16px 24px 16px 0;
            `}
            src="/static/stayhealthy-logo.png"
          />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "62px", borderBottom: 0 }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <ReactMapGL
            {...this.state.viewport}
            mapStyle="mapbox://styles/mapbox/basic-v9"
            onViewportChange={(viewport) => this.setState({ viewport })}
            mapboxApiAccessToken={MAPBOX_PUBLIC_API_KEY}
          />
        </Content>
      </Layout>
    );
  }
}

export default Index;
