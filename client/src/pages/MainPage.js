import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getList, clearError } from "../store/actions";
import { RecipeList } from "../components/RecipeList";
import { NavBtnBig } from "../components/NavBtnBig";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { list, error } = useSelector(state => state);

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
        action="&#9998;_&nbsp; Новый рецепт"
      />
      <Header title={`Самых свежих рецептов ${list.length}`} />
      <div className="container">
        <div className="row">
          <h4 className="center-align cyan-text bold-text">Свежие рецепты</h4>
          <RecipeList list={list} />
          <div className="col s12 center-align my">
            <NavBtnBig
              title="Добавить самый-самый свежий рецепт"
              action="/create"
              letter="Добавить рецептик"
            />
          </div>
          {(!list.length && (
            <div className="col s12 center-align">
              <img src="logo-color.png" alt="" className="img-btn" />
            </div>
          )) ||
            null}
        </div>
      </div>
    </>
  );
};
