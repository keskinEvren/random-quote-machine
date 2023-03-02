import React, { useEffect } from "react";
import quotes from "../quotes.json";
import { useSelector, useDispatch } from "react-redux";
import {
  authorAction,
  quoteAction,
  randomNumberAction,
  randomColorAction,
  liked_quotes,
  likeQuotesReducer,
  likedQuotesAction,
  unlikeQuotesAction,
} from "../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSyncAlt,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
var body = document.getElementsByTagName("body")[0];
var id_text;
var id_author;
var id_quote_box;
var id_like_button;
var clickCount = 0;
console.log(id_text);
export default function RandomQuote() {
  const quote = useSelector((state) => state.quote);
  const author = useSelector((state) => state.author);
  const randomNumber = useSelector((state) => state.random_number);
  const randomColor = useSelector((state) => state.random_color);
  const liked_quotes = useSelector((state) => state.liked_quotes);
  const dispatch = useDispatch();
  var number = Math.floor(Math.random() * quotes.length);
  body.style.backgroundColor = randomColor;
  var color = [
    Math.floor(Math.random() * 360),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ];

  useEffect(() => {
    id_text = document.getElementById("text");
    id_author = document.getElementById("author");
    id_quote_box = document.getElementById("quote-box");
    id_like_button = document.getElementById("like-button");
    id_like_button.classList.add("empty-class");
    dispatch(randomNumberAction(Math.floor(Math.random() * quotes.length)));
    dispatch(randomColorAction(color[0], color[1], color[2]));
    if (color[2] >= 50) {
      id_quote_box.style.backgroundColor = "black";
      id_like_button.style.color = "white";
    }
  }, []);

  dispatch(
    quoteAction(
      quotes[
        typeof randomNumber === "number"
          ? randomNumber
          : Math.floor(Math.random() * quotes.length)
      ][0]
    )
  );
  dispatch(
    authorAction(
      quotes[
        typeof randomNumber === "number"
          ? randomNumber
          : Math.floor(Math.random() * quotes.length)
      ][1]
    )
  );
  function isLiked() {
    if (liked_quotes.some((a) => a[2] === randomNumber)) {
      return "red";
    } else {
      return "grey";
    }
  }
  const getRandomQuote = () => {
    var newNumber = Math.floor(Math.random() * quotes.length);
    dispatch(randomColorAction(color[0], color[1], color[2]));
    if (color[2] >= 50) {
      id_quote_box.style.backgroundColor = "black";
      id_like_button.style.color = "white";
    } else {
      id_quote_box.style.backgroundColor = "white";
      id_like_button.style.color = "black";
    }
    id_text.style.opacity = 0;
    id_author.style.opacity = 0;
    setTimeout(() => {
      id_text.style.opacity = 1;
      id_author.style.opacity = 1;
    }, 500);
    if (newNumber !== randomNumber) {
      setTimeout(() => {
        dispatch(randomNumberAction(newNumber));
      }, 500);
    } else {
      getRandomQuote();
    }
  };
  return (
    <div>
      <div id="quote-box">
        <div id="text" style={{ color: randomColor }}>
          <FontAwesomeIcon icon={faQuoteLeft} style={{ marginRight: 10 }} />
          {quote}
        </div>
        <div id="author" style={{ color: randomColor }}>
          {author}{" "}
        </div>
        <div id="quote-buttons">
          <button
            id="like-button"
            onClick={(e) => {
              if (liked_quotes.some((a) => a[2] === randomNumber)) {
                dispatch(unlikeQuotesAction(randomNumber));
              } else {
                dispatch(
                  likedQuotesAction([
                    quotes[randomNumber][0],
                    quotes[randomNumber][1],
                    randomNumber,
                  ])
                );
              }
            }}
          >
            <FontAwesomeIcon
              id="liked"
              style={{ fontSize: "30" }}
              icon={faHeart}
              color={isLiked()}
            />
          </button>
          <button id="new-quote" onClick={() => getRandomQuote()}>
            <FontAwesomeIcon
              id="new-quote-icon"
              icon={faSyncAlt}
              color={randomColor === null ? "black" : randomColor}
            />
          </button>
          <div id="social-buttons">
            <a
              href={`https://twitter.com/intent/tweet/?text=${quote}${
                "&hashtags=" + author.replace(" ", "")
              }`}
              id="tweet-quote"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ fontSize: 40, color: randomColor, transition: "1s" }}
              />
            </a>
          </div>
        </div>
      </div>
      <div id="liked-quotes"></div>
    </div>
  );
}
