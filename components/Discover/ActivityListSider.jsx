import { connectStateResults } from "react-instantsearch-dom";
import { Layout } from "antd";
import React from "react";

import FeedbackFooter from "./FeedbackFooter";
import ActivityList from "./ActivityList";

const { Sider } = Layout;

const ActivityListSider = (props) => {
  function renderLoadingIndicator() {
    return <div>Loading...</div>;
  }

  function renderActivityList() {
    return (
      <ActivityList
        selectedHit={props.selectedHit}
        onHitMouseEnter={props.onHitMouseEnter}
        onHitMouseLeave={props.onHitMouseLeave}
      />
    );
  }

  function renderNoResults() {
    return <div>No results to show...</div>;
  }

  const searchResultsToShow =
    props.searchResults && props.searchResults.nbHits !== 0;

  return (
    <Sider width={450} theme="light" collapsed={false} collapsedWidth={0}>
      {/* eslint-disable indent */}
      {props.isSearchStalled
        ? renderLoadingIndicator()
        : searchResultsToShow
        ? renderActivityList()
        : renderNoResults()}
      {/* eslint-enable indent */}
      <FeedbackFooter />
    </Sider>
  );
};

export default connectStateResults(ActivityListSider);
