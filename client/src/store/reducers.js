import {
  GET_LIST,
  CHANGE_LIST,
  CHANGE_RECIPE,
  SET_ERROR,
  CLEAR_ERROR
} from "./types";

const sorter = arr => arr.sort((a, b) => new Date(b.date) - new Date(a.date));

export const listReducer = (state = [], action) => {
  switch (action.type) {
    case GET_LIST:
      return [...sorter(action.payload)];
    case CHANGE_RECIPE:
      return sorter(
        state.map(item =>
          item._id === action.payload._id ? action.payload : item
        )
      );
    case CHANGE_LIST:
      return [action.payload, ...state];
    default:
      return state;
  }
};

export const errorReducer = (state = "", action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    case CLEAR_ERROR:
      return "";
    default:
      return state;
  }
};
