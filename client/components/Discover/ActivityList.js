import { connectInfiniteHits } from "react-instantsearch-dom";
import React from "react";

import ActivityListItem from "./ActivityListItem";

const ActivityList = (props) => (
  <div>
    {props.hits.map((hit) => (
      <ActivityListItem
        key={hit.objectID}
        hit={hit}
        selectedHit={props.selectedHit}
        onMouseEnter={props.onHitMouseEnter}
        onMouseLeave={props.onHitMouseLeave}
      />
    ))}
  </div>
);

export default connectInfiniteHits(ActivityList);
