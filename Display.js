import React from "react";
import PropTypes from "prop-types";
import "./Display.css";

export default Display = ({ value }) => (
  <div className="component-display">
    <div>{value}</div>
  </div>
);

Display.propTypes = {
  value: PropTypes.string
};
