import { connectInfiniteHits } from "react-instantsearch-dom";
import React from "react";

import ActivityListItem from "./ActivityListItem";

const ActivityList = props => (
  <div>
    {props.hits.map(hit => (
      <ActivityListItem
        hit={hit}
        key={hit.objectID}
        selectedHit={props.selectedHit}
        onMouseEnter={props.onHitMouseEnter}
        onMouseLeave={props.onHitMouseLeave}
      />
    ))}
  </div>
);

export default connectInfiniteHits(ActivityList);
