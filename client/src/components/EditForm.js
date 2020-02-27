import React, { useEffect } from "react";

export const EditForm = ({
  title,
  text,
  parts,
  changeText,
  changeFile,
  submit,
  image,
  inputRef
}) => {
  useEffect(() => {
    window.M.textareaAutoResize(document.querySelector("#parts"));
    window.M.textareaAutoResize(document.querySelector("#text"));
    window.scrollTo(0, 0);
  }, []);

  return (
    <form onSubmit={submit} encType="multipart/form-data">
      <div className="row">
        <div className="col s12 m6">
          <div className="input-field">
            <input
              id="title"
              type="text"
              name="title"
              onChange={changeText}
              value={title}
              maxLength="30"
            />
            <label htmlFor="title">Название *</label>
          </div>
          <div className="input-field">
            <textarea
              id="parts"
              className="materialize-textarea"
              name="parts"
              onChange={changeText}
              value={parts}
            ></textarea>
            <label htmlFor="parts">Ингридиенты *</label>
          </div>
        </div>
        <div className="col s10 m5 offset-s1 offset-m1">
          <label htmlFor="image">
            <div className="img-block hoverable">
              <img src={image} alt="" />
            </div>
            <span className="btn white-text img-btn">
              Выбрать свою картинку
            </span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            name="image"
            onChange={changeFile}
            className="hide"
            ref={inputRef}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <textarea
            id="text"
            className="materialize-textarea"
            name="text"
            onChange={changeText}
            value={text}
          ></textarea>
          <label htmlFor="text">Описание *</label>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <button
            className="btn waves-effect waves-light grey darken-1 white-text"
            type="submit"
          >
            Сохранить
          </button>
          <p className="cyan-text bold-text">
            * Текстовые поля обязательны для заполнения
          </p>
        </div>
      </div>
    </form>
  );
};
