import React from "react";
import { Link } from "react-router-dom";

export const HistoryCard = ({ history, action }) => (
  <div className="row">
    <div className="col s12 ">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">
            История рецепта имеет {history.length} изменений
          </span>
        </div>
        {history.length ? (
          <div className="card-action">
            <Link to={action} className="btn yellow lighten-1 black-text">
              Просмотреть архив
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  </div>
);
