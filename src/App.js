import "./sass/main.scss";
import React from "react";
import { AppProvider } from "./context/context";
import MainPage from "./pages/MainPage";

function App() {
  // const [recipesState, setRecipesState] = useState({
  //   recipes: {},
  //   search: {
  //     query: "",
  //     results: [],
  //     page: 1,
  //     resultsPerPage: RES_PER_PAGE,
  //   },
  //   bookmarks: [],
  // });

  return (
    <div className="App">
      <AppProvider>
        <MainPage />
      </AppProvider>
    </div>
  );
}

export default App;
