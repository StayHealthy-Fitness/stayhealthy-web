import { Anchor, Typography } from "antd";
import React, { useState } from "react";
import { css } from "@emotion/core";

import FeedbackDrawer from "./FeedbackDrawer";

const { Text } = Typography;
const { Link } = Anchor;

const FeedbackFooter = () => {
  const [feedbackDrawerVisible, setFeedbackDrawerVisible] = useState(false);

  return (
    <>
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
          <Anchor onClick={() => setFeedbackDrawerVisible(true)}>
            <Link title="Give feedback." />
          </Anchor>
        </Text>
      </div>
      <FeedbackDrawer
        visible={feedbackDrawerVisible}
        onClose={() => setFeedbackDrawerVisible(false)}
      />
    </>
  );
};

export default FeedbackFooter;
