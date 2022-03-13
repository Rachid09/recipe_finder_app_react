import React from "react";

import { Search } from "../components/Search";
import { Likes } from "../components/Likes";

export const Header = ({
  getRecipes,
  handleInputChange,
  recipeName,
  handleKeyDown,
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
      <Likes />
    </header>
  );
};
