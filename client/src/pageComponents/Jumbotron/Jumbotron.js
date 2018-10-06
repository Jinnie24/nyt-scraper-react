import React from "react";
import './Jumbotron.css';

const Jumbotron = ({ children }) => (
  <div
    style={{ textAlign: "center" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
