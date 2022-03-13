import React from "react";

import { Search } from "../components/Search";
import { Likes } from "./Likes";

export const Header = ({
  getRecipes,
  handleInputChange,
  recipeName,
  handleKeyDown,
  likes,
}) => {
  return (
    <header className="header">
      <img src="/assets/img/logo.png" alt="Logo" className="header__logo" />
      <Search
        getRecipes={getRecipes}
        recipeName={recipeName}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />
      <Likes likes={likes} />
    </header>
  );
};
