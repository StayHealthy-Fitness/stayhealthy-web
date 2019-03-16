import { Highlight } from "react-instantsearch-dom";
import React from "react";

export default (props) => (
  <div>
    <Highlight attribute="title" hit={props.hit} />
  </div>
);
