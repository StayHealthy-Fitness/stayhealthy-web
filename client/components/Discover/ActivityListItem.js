import React from "react";

export default (props) => {
  const itemSelected =
    props.selectedHit && props.selectedHit.objectID === props.hit.objectID;

  return (
    <div
      onMouseEnter={() => props.onMouseEnter(props.hit)}
      onMouseLeave={props.onMouseLeave}
    >
      {itemSelected ? "Selected: " : ""}
      {props.hit.title}
    </div>
  );
};
