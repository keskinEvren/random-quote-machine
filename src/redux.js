import { combineReducers } from "redux";
import { act } from "react-dom/test-utils";

const GET_QUOTE = "GET_QUOTE";
const GET_AUTHOR = "GET_AUTHOR";
const RANDOM_NUMBER = "RANDOM_NUMBER";
const RANDOM_COLOR = "RANDOM_COLOR";
const LIKE_QUOTE = "LIKE_QUOTE";
const UNLIKE_QUOTE = "UNLIKE_QUOTE";
const initialState = {
  quote: "",
  author: "",
  random_number: null,
  random_color: null,
  liked_quotes: [],
};

export const randomNumberAction = (number) => ({
  type: RANDOM_NUMBER,
  number,
});

export const quoteAction = (quote) => ({
  type: GET_QUOTE,
  quote,
});

export const authorAction = (author) => ({
  type: GET_AUTHOR,
  author,
});

export const randomColorAction = (c1, c2, c3) => ({
  type: RANDOM_COLOR,
  c1,
  c2,
  c3,
});

export const likedQuotesAction = (payload) => ({
  type: LIKE_QUOTE,
  payload,
});

export const unlikeQuotesAction = (payload) => ({
  type: UNLIKE_QUOTE,
  payload,
});

export const quoteReducer = (state = initialState.quote, action) => {
  switch (action.type) {
    case GET_QUOTE:
      return action.quote;
    default:
      return state;
  }
};

export const authorReducer = (state = initialState.author, action) => {
  switch (action.type) {
    case GET_AUTHOR:
      return action.author;
    default:
      return state;
  }
};

export const randomNumberReducer = (
  state = initialState.random_number,
  action
) => {
  switch (action.type) {
    case RANDOM_NUMBER:
      return action.number;
    default:
      return state;
  }
};

export const randomColorReducer = (
  state = initialState.random_color,
  action
) => {
  switch (action.type) {
    case RANDOM_COLOR:
      return `hsl(${action.c1},${action.c2}%,${action.c3}%)`;
    default:
      return state;
  }
};

export const likeQuotesReducer = (
  state = initialState.liked_quotes,
  action
) => {
  switch (action.type) {
    case LIKE_QUOTE:
      if (state.some((a) => a[2] === action.payload[2])) {
        return state;
      } else {
        return [...state, action.payload];
      }
    case UNLIKE_QUOTE:
      return state.filter((a) => a[2] !== action.payload);
    default:
      return state;
  }
};

export const reducers = combineReducers({
  quote: quoteReducer,
  author: authorReducer,
  random_number: randomNumberReducer,
  random_color: randomColorReducer,
  liked_quotes: likeQuotesReducer,
});
