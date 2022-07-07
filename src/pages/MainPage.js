import React from "react";
import Header from "../components/common/Header.js";
import RecipeView from "../components/RecipeView";
import SearchResults from "../components/SearchResults.js";

const MainPage = () => {
  return (
    <div className="container">
      <Header />
      <SearchResults />
      <RecipeView />
    </div>
  );
};

export default MainPage;
