import { Marker } from "react-map-gl";
import { css } from "@emotion/core";
import { Card } from "antd";
import React from "react";

export default (props) => (
  <Marker latitude={props.lat} longitude={props.lng}>
    <Card
      style={{
        width: 40,
        height: 40
      }}
      bodyStyle={{
        padding: 0,
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
