import { connectHits } from "react-instantsearch-dom";
import React from "react";

import ActivityListItem from "./ActivityListItem";

const ActivityList = (props) => (
  <ol>
    {props.hits.map((hit) => (
      <ActivityListItem key={hit.objectID} hit={hit} />
    ))}
  </ol>
);

export default connectHits(ActivityList);
