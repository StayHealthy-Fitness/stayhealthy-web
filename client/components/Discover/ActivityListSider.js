import React, { useState } from "react";
import { Layout } from "antd";

import FeedbackFooter from "./FeedbackFooter";
import ActivityList from "./ActivityList";

const { Sider } = Layout;

const ActivityListSider = (props) => (
  <Sider width={450} theme="light" collapsed={false} collapsedWidth={0}>
    <ActivityList
      selectedHit={props.selectedHit}
      onHitMouseEnter={props.onHitMouseEnter}
      onHitMouseLeave={props.onHitMouseLeave}
    />
    <FeedbackFooter />
  </Sider>
);

export default ActivityListSider;
