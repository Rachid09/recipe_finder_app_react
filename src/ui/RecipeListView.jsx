import React from "react";
import PaginateButton from "../components/PaginateButton";
// import { Link } from "react-router-dom";

export const RecipeListView = ({
  recipes,
  isLoading,
  getRecipeHandler,
  currentPage,
  getPageRecipes,
  changePageHandler,
  currentRecipe,
}) => {
  const pages = Math.ceil(recipes.length / 5);
  // console.log(recipes);
  return (
    <div className="results">
      {isLoading ? (
        <div className="loader">
          <svg>
            <use href="/assets/img/icons.svg#icon-cw"></use>
          </svg>
        </div>
      ) : (
        <>
          <ul className="results__list">
            {recipes.length
              ? getPageRecipes(recipes, currentPage, 5).map((recipe, index) => {
                  return (
                    <li
                      key={index}
                      className={`results__link${
                        currentRecipe.id === recipe.recipe_id
                          ? " results__link--active"
                          : ""
                      }`}
                      onClick={() => {
                        getRecipeHandler(recipe.recipe_id);
                      }}
                    >
                      <figure className="results__fig">
                        <img src={recipe.image_url} alt="Test" />
                      </figure>
                      <div className="results__data">
                        <h4 className="results__name">{recipe.title}</h4>
                        <p className="results__author">{recipe.publisher}</p>
                      </div>
                    </li>
                  );
                })
              : ""}
          </ul>
          <div className="results__pages">
            {recipes.length ? (
              currentPage === 1 && pages > 1 ? (
                <PaginateButton
                  changePageHandler={changePageHandler}
                  type="next"
                  currentPage={currentPage}
                />
              ) : currentPage < pages ? (
                <>
                  <PaginateButton
                    changePageHandler={changePageHandler}
                    type="next"
                    currentPage={currentPage}
                  />
                  <PaginateButton
                    type="prev"
                    currentPage={currentPage}
                    changePageHandler={changePageHandler}
                  />
                </>
              ) : (
                <PaginateButton
                  changePageHandler={changePageHandler}
                  type="prev"
                  currentPage={currentPage}
                />
              )
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
};
