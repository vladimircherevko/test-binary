import React from "react";
import { useHistory } from "react-router-dom";

export const RecipeList = ({ list }) => {
  const history = useHistory();

  return (
    <div className="row">
      {list.map(item => (
        <div className="col s12 m6 l4" key={item._id}>
          <div
            className="card hoverable"
            onClick={() => history.push(`/recipe/${item._id}`)}
          >
            <div className="card-image">
              <img src={item.image} alt="" />
            </div>
            <div className="card-content">
              <span className="truncate deep-orange-text text-darken-4 bold-text">
                {item.title}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
