import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RecipeCard } from "../components/RecipeCard";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { HistoryCard } from "../components/HistoryCard";

export const RecipePage = () => {
  const id = useParams().id;

  const { title, text, date, history, parts, image } = useSelector(state =>
    state.list.find(item => item._id === id)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar
        title="Страница рецепта"
        link="/"
        action="Вернуться к списку рецептов"
      />
      <Header title="Еще горячий рецептик!" />
      <div className="container">
        <RecipeCard
          title={title}
          text={text}
          date={date}
          parts={parts}
          image={image}
          action={`/edit/${id}`}
        />
        <HistoryCard history={history} action={`/history/${id}/#`} />
      </div>
    </>
  );
};
