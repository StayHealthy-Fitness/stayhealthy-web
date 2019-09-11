import { Marker } from "react-map-gl";
import { css } from "@emotion/core";
import { Card } from "antd";
import React from "react";

// eslint-disable-next-line react/display-name
export default (props) => (
  <Marker latitude={props.lat} longitude={props.lng}>
    <Card
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      style={{
        width: 40,
        height: 40
      }}
      bodyStyle={{
        padding: 0,
        backgroundColor: props.selected ? "#000" : "#FFF",
        textAlign: "center",
        marginTop: 5
      }}
    >
      <img
        src={`/static/${props.iconName}.svg`}
        css={css`
          width: 30px;
        `}
      />
    </Card>
  </Marker>
);
