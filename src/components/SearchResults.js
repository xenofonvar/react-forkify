import React, { useEffect, useState } from "react";
import { searchData } from "../api/fetching";
import RecipePreview from "./RecipePreview";
import Spinner from "./common/Spinner";
import ReactPaginate from "react-paginate";
import { useGlobalContext } from "../context/context";
import Message from "./common/Message.js";

const SearchResults = () => {
  // const { recipesState, setRecipesState } = useGlobalContext();
  const { searchDataState, setSearchDataState } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showResults = async () => {
      setLoading(true);

      const { data } = await searchData(searchDataState.query);

      // setRecipesState((prev) => ({
      //   ...prev,
      //   search: {
      //     ...prev.search,
      //     results: data.recipes,
      //   },
      // }));
      setSearchDataState((prev) => ({
        ...prev,
        results: data.recipes,
      }));

      setLoading(false);
    };
    showResults();
  }, [searchDataState.query]);

  const recipesPerPage = searchDataState.resultsPerPage;
  const pagesVisited = searchDataState.page * recipesPerPage;
  const numPages = Math.ceil(searchDataState.results.length / recipesPerPage);

  const displayRecipes = [...searchDataState.results]
    .slice(pagesVisited, pagesVisited + recipesPerPage)
    .map((recipe) => {
      return (
        <RecipePreview
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          publisher={recipe.publisher}
        />
      );
    });

  const changePage = ({ selected }) => {
    // setRecipesState((prev) => ({
    //   ...prev,
    //   search: {
    //     ...prev.search,
    //     page: selected,
    //   },
    // }));
    setSearchDataState((prev) => ({
      ...prev,
      page: selected,
    }));
  };
  return (
    <div className="search-results">
      <ul className="results">
        {loading ? <Spinner /> : [displayRecipes]}
        {displayRecipes.length === 0 && (
          <Message message={"Please Search for a recipe"} />
        )}
      </ul>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={numPages}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"btn--inline pagination__btn--prev"}
        nextLinkClassName={"btn--inline pagination__btn--next"}
      />
    </div>
  );
};

export default SearchResults;
