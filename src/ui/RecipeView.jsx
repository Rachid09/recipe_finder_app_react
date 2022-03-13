import React from "react";
import { Ingredient } from "../components/Ingredient";

export const RecipeView = ({ currentRecipe, isLoadingRecipe }) => {
  return (
    <div className="recipe">
      {isLoadingRecipe ? (
        <div className="loader">
          <svg>
            <use href="/assets/img/icons.svg#icon-cw"></use>
          </svg>
        </div>
      ) : currentRecipe ? (
        <>
          <figure className="recipe__fig">
            <img
              src={currentRecipe.img}
              alt={currentRecipe.title}
              className="recipe__img"
            />
            <h1 className="recipe__title">
              <span>{currentRecipe.title}</span>
            </h1>
          </figure>

          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="/assets/img/icons.svg#icon-stopwatch"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">
                {currentRecipe.time}
              </span>
              <span className="recipe__info-text"> minutes</span>
            </div>
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="/assets/img/icons.svg#icon-man"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--people">
                {currentRecipe.servings}
              </span>
              <span className="recipe__info-text"> servings</span>

              <div className="recipe__info-buttons">
                <button className="btn-tiny btn-decrease">
                  <svg>
                    <use href="/assets/img/icons.svg#icon-circle-with-minus"></use>
                  </svg>
                </button>
                <button className="btn-tiny btn-increase">
                  <svg>
                    <use href="/assets/img/icons.svg#icon-circle-with-plus"></use>
                  </svg>
                </button>
              </div>
            </div>
            <button className="recipe__love">
              <svg className="header__likes">
                <use href="/assets/img/icons.svg#icon-heart-outlined"></use>
              </svg>
            </button>
          </div>

          <div className="recipe__ingredients">
            <ul className="recipe__ingredient-list">
              {currentRecipe.ingredients.map((el, index) => (
                <Ingredient key={index} ingredient={el} />
              ))}
            </ul>

            <button className="btn-small recipe__btn recipe__btn--add">
              <svg className="search__icon">
                <use href="/assets/img/icons.svg#icon-shopping-cart"></use>
              </svg>
              <span>Add to shopping list</span>
            </button>
          </div>

          <div className="recipe__directions">
            <h2 className="heading-2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__by">{currentRecipe.author}</span>. Please
              check out directions at their website.
            </p>
            <a
              className="btn-small recipe__btn"
              href={currentRecipe.url}
              rel="noreferrer"
              target="_blank"
            >
              <span>Directions</span>
              <svg className="search__icon">
                <use href="/assets/img/icons.svg#icon-triangle-right"></use>
              </svg>
            </a>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
