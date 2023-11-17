import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default Button = ({ name, orange, wide, clickHandler }) => {
  const handleClick = () => {
    clickHandler(name);
  };

  const className = [
    "component-button",
    orange ? "orange" : "",
    wide ? "wide" : ""
  ]
    .join(" ")
    .trim();

  return (
    <div className={className}>
      <button onClick={handleClick}>{name}</button>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  orange: PropTypes.bool,
  wide: PropTypes.bool,
  clickHandler: PropTypes.func
};
