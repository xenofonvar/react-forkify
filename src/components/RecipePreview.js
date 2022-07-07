import React from "react";
import icons from "../img/icons.svg";
import { useGlobalContext } from "../context/context";
import { getRecipe } from "../api/fetching";
const RecipePreview = (props) => {
  // const { recipesState, setRecipesState } = useGlobalContext();
  const {
    selectedRecipeState,
    setSelectedRecipeState,
    bookmarksState,
    setBookmarksState,
  } = useGlobalContext();

  const loadRecipe = async () => {
    const selectedRecipe = await getRecipe(props.id);
    const { recipe } = selectedRecipe.data;
    // setRecipesState((prev) => ({
    //   ...prev,
    //   recipe: {
    //     id: recipe.id,
    //     title: recipe.title,
    //     publisher: recipe.publisher,
    //     sourceUrl: recipe.source_url,
    //     image: recipe.image_url,
    //     servings: recipe.servings,
    //     cookingTime: recipe.cooking_time,
    //     ingredients: recipe.ingredients,
    //     ...(recipe.key && { key: recipe.key }),
    //   },
    // }));
    setSelectedRecipeState({
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }),
    });
    /////////////////////////////////////////////////////////////////////////////setBookmarks in selectedRecipe
  };

  return (
    <li className="preview" onClick={loadRecipe}>
      <a className="preview__link preview__link--active" href="#23456">
        <figure className="preview__fig">
          <img src={props.image} alt="image" />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{props.title}</h4>
          <p className="preview__publisher">{props.publisher}</p>
          <div
            className={`preview__user-generated ${!props.id ? "" : "hidden"}`}
          >
            <svg>
              <use href={icons + "#icon-user"}></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
};

export default RecipePreview;
