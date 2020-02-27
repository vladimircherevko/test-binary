import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { changeRecipe, setError, clearError } from "../store/actions";
import { EditForm } from "../components/EditForm";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";

export const EditPage = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef();
  const error = useSelector(state => state.error);

  const cb = useCallback(() => {
    history.push(`/recipe/${id}`);
  }, [history, id]);

  const { title, text, parts, date, image } = useSelector(state =>
    state.list.find(item => item._id === id)
  );
  const [form, setForm] = useState({ title, text, parts, image });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

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

  const createHandle = event => {
    event.preventDefault();

    if (!form.title.trim()) dispatch(setError("Не заполнено название рецепта"));
    else if (!form.text.trim())
      dispatch(setError("Не заполнено описание рецепта"));
    else if (!form.parts.trim())
      dispatch(setError("Не заполнены ингридиенты рецепта"));
    else if (
      form.title !== title ||
      form.text !== text ||
      form.parts !== parts ||
      form.image !== image
    )
      dispatch(changeRecipe(new FormData(event.target), cb));
    else dispatch(setError("В рецепте нет изменений"));
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

  return (
    <>
      <Navbar
        title="Изменение рецепта"
        link={`/recipe/${id}`}
        action="Вернуться к рецепту"
      />
      <Header
        title={`Дата последнего изменения ${new Date(
          date
        ).toLocaleDateString()}`}
      />
      <div className="container">
        <EditForm
          image={form.image}
          parts={form.parts}
          title={form.title}
          text={form.text}
          changeText={changeTextHandle}
          submit={createHandle}
          changeFile={changeFileHandle}
          inputRef={inputRef}
        />
      </div>
    </>
  );
};
