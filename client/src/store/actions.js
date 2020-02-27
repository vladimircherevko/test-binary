import {
  GET_LIST,
  CHANGE_LIST,
  CHANGE_RECIPE,
  SET_ERROR,
  CLEAR_ERROR
} from "./types";
import { request } from "./request";

export const getList = () => async dispatch => {
  try {
    const data = await request("/api/list");
    if (Array.isArray(data)) {
      dispatch({
        type: GET_LIST,
        payload: data
      });
    } else {
      throw (new Error().message =
        data.message ||
        "Неопределенный ответ сервера при запросе списка рецептов");
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const addRecipe = (info, cb) => async dispatch => {
  try {
    const data = await request("/api/create", "POST", info, {
      "Content-Type": "multipart/form-data"
    });

    if (data._id) {
      dispatch({
        type: CHANGE_LIST,
        payload: data
      });
      cb();
    } else {
      throw (new Error().message =
        data.message || "Неопределенный ответ сервера при добавлении рецепта");
    }
  } catch (err) {
    if (err.error) console.log(err.error);
    dispatch(setError(err.message));
  }
};

export const changeRecipe = (info, cb) => async dispatch => {
  try {
    const data = await request("/api/change", "POST", info, {
      "Content-Type": "multipart/form-data"
    });
    if (data._id) {
      dispatch({
        type: CHANGE_RECIPE,
        payload: data
      });
      cb();
    } else {
      throw (new Error().message =
        data.message || "Неопределенный ответ сервера при изменении рецепта");
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const setError = warning => ({
  type: SET_ERROR,
  payload: "" + warning || "Неопределенная ошибка"
});
