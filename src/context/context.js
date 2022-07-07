import React, { useContext, useReducer, useState } from "react";
// import { reducer } from "../reducer/reducer.js";
import { RES_PER_PAGE } from "../utils/config.js";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [selectedRecipeState, setSelectedRecipeState] = useState({});
  const [searchDataState, setSearchDataState] = useState({
    query: "",
    results: [],
    page: 0,
    resultsPerPage: RES_PER_PAGE,
  });
  const [bookmarksState, setBookmarksState] = useState([]);
  // const [recipesState, setRecipesState] = useState({
  //   recipe: {},
  //   search: {
  //     query: "",
  //     results: [],
  //     page: 1,
  //     resultsPerPage: RES_PER_PAGE,
  //   },
  //   bookmarks: [],
  // });

  return (
    <AppContext.Provider
      value={{
        selectedRecipeState,
        setSelectedRecipeState,
        searchDataState,
        setSearchDataState,
        bookmarksState,
        setBookmarksState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
