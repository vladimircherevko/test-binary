import React from "react";

export const RecipeListItem = ({ image, title, clickHandle }) => {
  return (
    <div className="col s12 m6 l4">
      <div className="card hoverable" onClick={clickHandle}>
        <div className="card-image img-card">
          <img src={image} alt="" />
        </div>
        <div className="card-content">
          <span className="truncate deep-orange-text text-darken-4 bold-text">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};
