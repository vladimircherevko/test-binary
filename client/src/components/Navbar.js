import React from "react";
import { useHistory } from "react-router-dom";

export const Navbar = ({ title, link, action }) => {
  const history = useHistory();

  return (
    <div className="navbar-fixed" onClick={() => history.push(link)}>
      <div className=" blue-grey darken-1 white-text fixed">{title}</div>
      <nav className=" blue-grey darken-2  hoverable fixnav">
        <div className="container">
          <div className="nav-wrapper">
            <div className="brand-logo">
              <img src="/cook-logo-white.png" className="logo-img" alt="" />
              <span className="hide-on-med-and-down logo-text">
                Книга рецептов
              </span>
            </div>
            <div className="right">
              <span>{action}</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
