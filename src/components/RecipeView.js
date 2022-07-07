import React, { useState, useCallback } from "react";
import { useGlobalContext } from "../context/context";
import { Fraction } from "fractional";
import Message from "./common/Message";
import icons from "../img/icons.svg";

const RecipeView = () => {
  const {
    selectedRecipeState,
    setSelectedRecipeState,
    bookmarksState,
    setBookmarksState,
  } = useGlobalContext();

  const [isBookmarked, setIsBookmarked] = useState(
    bookmarksState.length === 0
      ? false
      : bookmarksState.find((rec) => rec.title === selectedRecipeState.title)
  );

  const handleBookmarkToggle = useCallback(() => {
    setIsBookmarked((prev) => {
      return !prev;
    });
  }, []);

  const handleBookmark = () => {
    handleBookmarkToggle();
    console.log("after toggle", isBookmarked);
    if (isBookmarked) {
      setBookmarksState((prev) => {
        return [...prev, selectedRecipeState];
      });
    }
    console.log(bookmarksState);
  };

  if (selectedRecipeState.title) {
    return (
      <div>
        <figure className="recipe__fig">
          <img
            src={selectedRecipeState?.image}
            alt="Tomato"
            className="recipe__img"
          />
          <h1 className="recipe__title">
            <span>{selectedRecipeState?.title}</span>
          </h1>
        </figure>
        <div className="recipe__details">
          <div className="recipe__info">
            <svg className="recipe__info-icon">
              <use href={icons + "#icon-clock"}></use>
            </svg>
            <span className="recipe__info-data recipe__info-data--minutes">
              {selectedRecipeState?.cookingTime}
            </span>
            <span className="recipe__info-text">minutes</span>
          </div>
          <div className="recipe__info">
            <svg className="recipe__info-icon">
              <use href={icons + "#icon-users"}></use>
            </svg>
            <span className="recipe__info-data recipe__info-data--people">
              {selectedRecipeState?.servings}
            </span>
            <span className="recipe__info-text">servings</span>

            <div className="recipe__info-buttons">
              <button className="btn--tiny btn--update-servings">
                <svg>
                  <use href={icons + "#icon-minus-circle"}></use>
                </svg>
              </button>
              <button className="btn--tiny btn--update-servings">
                <svg>
                  <use href={icons + "#icon-plus-circle"}></use>
                </svg>
              </button>
            </div>
          </div>
          {/* ///////////////////// TODO ADD USER GENERATED */}
          <div className="recipe__user-generated  ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href={icons + "#icon-user"}></use>
            </svg>
          </div>
          <button className="btn--round btn--bookmark" onClick={handleBookmark}>
            <svg className="">
              {/* ///////////////////// TODO ADD BOOKMARK */}

              <use
                href={icons + `#icon-bookmark${isBookmarked ? "-fill" : ""}`}
              ></use>
            </svg>
          </button>
        </div>
        <div className="recipe__ingredients">
          <h2 className="heading--2">Recipe ingredients</h2>
          <ul className="recipe__ingredient-list"></ul>

          {selectedRecipeState?.ingredients
            .map((ing, index) => {
              return (
                <li className="recipe__ingredient" key={index}>
                  <svg className="recipe__icon">
                    <use href={icons + "#icon-check"}></use>
                  </svg>
                  <div className="recipe__quantity">
                    {ing?.quantity
                      ? new Fraction(ing?.quantity).toString()
                      : " "}
                  </div>
                  <div className="recipe__description">
                    <span className="recipe__unit">{ing?.unit}</span>
                    {ing?.description}
                  </div>
                </li>
              );
            })
            .reduce((prev, curr) => [prev, "", curr])}
        </div>
        <div className="recipe__directions">
          <h2 className="heading--2">How to cook it</h2>
          <p className="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span className="recipe__publisher">
              {selectedRecipeState.publisher}
            </span>
            . Please check out directions at their website.
          </p>
          <a
            className="btn--small recipe__btn"
            href={selectedRecipeState.sourceUrl}
            target="_blank"
          >
            <span>Directions</span>
            <svg className="search__icon">
              <use href={icons + "#icon-arrow-right"}></use>
            </svg>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Message message="Please select one of the recipes" />;
      </div>
    );
  }
};

export default RecipeView;
