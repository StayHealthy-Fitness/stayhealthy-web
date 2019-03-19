import React, { useState } from "react";
import { Layout } from "antd";

import FeedbackFooter from "./FeedbackFooter";
import ActivityList from "./ActivityList";

const { Sider } = Layout;

const ActivityListSider = () => (
  <Sider width={450} theme="light" collapsed={false} collapsedWidth={0}>
    <ActivityList />
    <FeedbackFooter />
  </Sider>
);

export default ActivityListSider;
