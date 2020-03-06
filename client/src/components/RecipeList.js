import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { RecipeListItem } from "./RecipeListItem";

export const RecipeList = ({ list }) => {
  const [defaultImg, setDefaultImg] = useState("logo-color.png");
  const history = useHistory();

  useEffect(() => {
    setDefaultImg(null);
  }, []);

  return (
    <div className="row">
      {list.map(item => (
        <RecipeListItem
          key={item._id}
          clickHandle={() => history.push(`/recipe/${item._id}`)}
          image={defaultImg || item.image}
          title={item.title}
        />
      ))}
    </div>
  );
};
