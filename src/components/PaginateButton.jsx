import React from "react";

const PaginateButton = ({ type, currentPage, changePageHandler }) => {
  return (
    <button
      onClick={() => {
        changePageHandler(type === "prev" ? currentPage - 1 : currentPage + 1);
      }}
      className={`btn-inline results__btn--${type}`}
    >
      <span>Page {type === "prev" ? currentPage - 1 : currentPage + 1} </span>
      <svg className="search__icon">
        <use
          href={`/assets/img/icons.svg#icon-triangle-${
            type === "prev" ? "left" : "right"
          }`}
        ></use>
      </svg>
    </button>
  );
};

export default PaginateButton;
