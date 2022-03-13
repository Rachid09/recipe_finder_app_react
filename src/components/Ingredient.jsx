import React from "react";
import { Fraction } from "fractional";

export const Ingredient = ({ ingredient }) => {
  const formatCount = (count) => {
    if (count) {
      // count = 2.5 --> 5/2 --> 2 1/2
      // count = 0.5 --> 1/2
      const newCount = Math.round(count * 10000) / 10000;
      const [int, dec] = newCount
        .toString()
        .split(".")
        .map((el) => parseInt(el, 10));

      if (!dec) return newCount;

      if (int === 0) {
        const fr = new Fraction(newCount);
        return `${fr.numerator}/${fr.denominator}`;
      } else {
        const fr = new Fraction(newCount - int);
        return `${int} ${fr.numerator}/${fr.denominator}`;
      }
    }
    return "?";
  };
  return (
    <li className="recipe__item">
      <svg className="recipe__icon">
        <use href="/assets/img/icons.svg#icon-check"></use>
      </svg>
      <div className="recipe__count">{formatCount(ingredient.count)}</div>
      <div className="recipe__ingredient">
        <span className="recipe__unit">{ingredient.unit}</span>
        {ingredient.ingredient}
      </div>
    </li>
  );
};
