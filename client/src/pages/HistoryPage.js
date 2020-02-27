import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RecipeCard } from "../components/RecipeCard";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";

export const HistoryPage = () => {
  const id = useParams().id;
  const { history } = useSelector(state =>
    state.list.find(item => item._id === id)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar
        title="Архив"
        link={`/recipe/${id}`}
        action="&#10148;&nbsp;&nbsp;К рецепту"
      />
      <Header title="Уже остывшие рецепты" />
      <div className="container">
        {[...history]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(item => (
            <RecipeCard
              key={item._id}
              title={item.title}
              text={item.text}
              date={item.date}
              parts={item.parts}
              image={item.image}
              action={null}
            />
          ))}
      </div>
    </>
  );
};
