import React, { useCallback, useState } from "react";
import logo from "../../img/logo.png";
import icons from "../../img/icons.svg";
import { useGlobalContext } from "../../context/context";
import AddRecipe from "../AddRecipe";
import AddBookmark from "../AddBookmark";

const Header = () => {
  // const { recipesState, setRecipesState } = useGlobalContext();
  const { searchDataState, setSearchDataState } = useGlobalContext();
  const [query, setQuery] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleNewRecipeWindowToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const handleQuery = (e) => {
    // e.preventDefault();
    let q = e.target.value.toLowerCase();
    setQuery(q);
  };
  // console.log(recipesState);

  // const handleToggleWindow = () => {
  //   setIsOpen(true);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setRecipesState((prev) => ({
    //   ...prev,
    //   search: {
    //     ...prev.search,
    //     query: query,
    //   },
    // }));
    setSearchDataState((prev) => ({
      ...prev,
      query: query,
    }));
    setQuery(" ");
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search__field"
          placeholder="Search over 1,000,000 recipes..."
          onChange={handleQuery}
          value={query}
        />
        <button className="btn search__btn">
          <svg className="search__icon">
            <use href={icons + "#icon-search"}></use>
          </svg>
          <span>Search</span>
        </button>
      </form>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button
              className="nav__btn nav__btn--add-recipe"
              onClick={handleNewRecipeWindowToggle}
            >
              <svg className="nav__icon">
                <use href={icons + "#icon-edit"}></use>
              </svg>
              <span>Add recipe</span>
              {/* ////////////////////////////////////////////////////////////////////// add Recipe */}
            </button>
            <AddRecipe isOpen={isOpen} onToggle={handleNewRecipeWindowToggle} />
          </li>
          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <svg className="nav__icon">
                <use href={icons + "#icon-bookmark"}></use>
              </svg>
              <span>Bookmarks</span>
            </button>
            <div className="bookmarks">
              <ul className="bookmarks__list">
                <AddBookmark />
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
