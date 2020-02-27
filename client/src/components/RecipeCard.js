import React from "react";
import { Link } from "react-router-dom";

export const RecipeCard = ({ title, text, date, parts, image, action }) => (
  <>
    <h4 className="header center-align cyan-text bold-text">{title}</h4>
    <div className="card horizontal">
      <div className="row">
        <div className="card-image col s5">
          <div className="px py">
            <img src={image} alt="" />
          </div>
        </div>

        <div className="card-stacked col s6 offset-m1">
          <div className="card-content">
            <h5 className="deep-orange-text text-darken-4 bold-text">
              Ингридиенты:
            </h5>
            <pre>{parts}</pre>
          </div>
        </div>
        <div className="card-content col s12">
          <h5 className="deep-orange-text text-darken-4 bold-text">
            Описание:
          </h5>
          <p>{text}</p>
          <br />
          <h6>
            Дата сохранения рецепта:
            <strong> {new Date(date).toLocaleString()}</strong>
          </h6>
        </div>
        {action && (
          <div className="card-action col s12">
            <Link to={action} className="btn grey darken-1 white-text">
              Изменить
            </Link>
          </div>
        )}
      </div>
    </div>
  </>
);
