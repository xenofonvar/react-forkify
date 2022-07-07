import React from "react";
import icons from "../img/icons.svg";
import { useGlobalContext } from "../context/context";
import RecipePreview from "./RecipePreview";

const AddBookmark = () => {
  const { bookmarksState, setBookmarksState } = useGlobalContext();
  const displayBookmarks = bookmarksState.map((recipe) => {
    return (
      <RecipePreview
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image_url}
        publisher={recipe.publisher}
      />
    );
  });

  if (bookmarksState.length === 0) {
    return (
      <div className="message">
        <div>
          <svg>
            <use href={icons + "#icon-smile"}></use>
          </svg>
        </div>
        <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
      </div>
    );
  } else {
    return { displayBookmarks };
  }
};

export default AddBookmark;
