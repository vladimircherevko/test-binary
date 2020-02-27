import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getList, clearError } from "../store/actions";
import { RecipeList } from "../components/RecipeList";
import { NavBtnBig } from "../components/NavBtnBig";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";

export const MainPage = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.list);
  const error = useSelector(state => state.error);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  useEffect(() => {
    if (window.M && error) {
      window.M.toast({ html: error, displayLength: 10000, classes: "rounded" });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <Navbar
        title="Главная страница"
        link="/create"
        action="Добавить новый рецепт"
      />
      <Header title={`Самых свежих рецептов ${list.length}`} />
      <div className="container">
        <div className="row">
          <h4 className="center-align cyan-text bold-text">Свежие рецепты</h4>
          <RecipeList list={list} />
          <div className="center-align">
            <NavBtnBig
              title="Добавить самый-самый свежий рецепт"
              action="/create"
              letter="Добавить рецептик"
            />
          </div>
        </div>
      </div>
    </>
  );
};
