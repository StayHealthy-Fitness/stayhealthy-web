import React from "react";

export default (props) => {
  return (
    <div
      onMouseEnter={() => props.onMouseEnter(props.hit)}
      onMouseLeave={props.onMouseLeave}
    >
      {props.selectedHit && props.selectedHit.objectID === props.hit.objectID
        ? "Selected: "
        : ""}
      {props.hit.title}
    </div>
  );
};
