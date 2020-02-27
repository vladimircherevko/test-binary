import React from "react";

export const Header = ({ title }) => {
  return (
    <div className="row  grey lighten-4 py">
      <div className="col s12 cyan lighten-2">
        <h4 className="white-text center-align">{title}</h4>
      </div>
    </div>
  );
};
