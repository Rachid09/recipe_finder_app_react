import React from "react";

export const Search = ({ getRecipes, recipeName, handleInputChange,handleKeyDown }) => {
 
  return (
    <div className="search">
      <input
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        value={recipeName}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
        onKeyDown={(e)=>{handleKeyDown(e)}}
      />
      <button
        className="btn search__btn"
        onClick={() => getRecipes(recipeName)}
      >
        <svg className="search__icon">
          <use href="/assets/img/icons.svg#icon-magnifying-glass"></use>
        </svg>
        <span>Search</span>
      </button>
    </div>
  );
};
