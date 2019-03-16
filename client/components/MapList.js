import { connectHits } from "react-instantsearch-dom";
import React from "react";

import MapListItem from "./MapListItem";

export default connectHits(({ hits }) => (
  <ol>
    {hits.map((hit) => (
      <li key={hit.objectID}>{hit.title}</li>
    ))}
  </ol>
));
