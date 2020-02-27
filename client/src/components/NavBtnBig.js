import React from "react";
import { Link } from "react-router-dom";

export const NavBtnBig = ({ action, letter, title }) => (
  <Link
    className="waves-effect waves-light btn-large"
    to={action}
    title={title}
  >
    {letter}
  </Link>
);
