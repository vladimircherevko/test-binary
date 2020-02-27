import React, { useState, useCallback, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addRecipe, setError, clearError } from "../store/actions";
import { EditForm } from "../components/EditForm";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";

export const CreatePage = () => {
  const [form, setForm] = useState({
    title: "",
    text: "",
    image: "uploads/default.png",
    parts: ""
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef();
  const error = useSelector(state => state.error);

  const cb = useCallback(() => {
    history.push("/");
  }, [history]);

  useEffect(() => {
    if (window.M && error) {
      window.M.toast({ html: error, displayLength: 10000, classes: "rounded" });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const changeTextHandle = event => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.name === "title"
          ? event.target.value.toUpperCase()
          : event.target.value
    });
  };

  const changeFileHandle = () => {
    const input = inputRef.current;
    const reader = new FileReader();

    reader.onload = function() {
      const dataURL = reader.result;
      setForm({ ...form, image: dataURL });
    };
    reader.onloadend = function() {
      if (reader.error) dispatch(setError(reader.error.message));
    };
    if (input.files[0]) reader.readAsDataURL(input.files[0]);
  };

  const submitHandle = event => {
    event.preventDefault();

    if (!form.title.trim()) dispatch(setError("Не заполнено название рецепта"));
    else if (!form.text.trim())
      dispatch(setError("Не заполнено описание рецепта"));
    else if (!form.parts.trim())
      dispatch(setError("Не заполнены ингридиенты рецепта"));
    else dispatch(addRecipe(new FormData(event.target), cb));
  };

  return (
    <>
      <Navbar
        title="Создание рецепта"
        link="/"
        action="Вернуться к списку рецептов"
      />
      <Header title="Самый свежий рецептик" />
      <div className="container">
        <EditForm
          image={form.image}
          parts={form.parts}
          title={form.title}
          text={form.text}
          changeText={changeTextHandle}
          submit={submitHandle}
          changeFile={changeFileHandle}
          inputRef={inputRef}
        />
      </div>
    </>
  );
};
