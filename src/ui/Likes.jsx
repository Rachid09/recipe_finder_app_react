import React from "react";
import LikesItem from "../components/LikeItem";

export const Likes = ({ likes }) => {
  return (
    <div className="likes">
      <div className="likes__field">
        <svg className="likes__icon">
          <use href="/assets/img/icons.svg#icon-heart"></use>
        </svg>
      </div>
      <div className="likes__panel">
        <ul className="likes__list">
          {likes.length
            ? likes.map((item, index) => {
                return <LikesItem key={index} item={item} />;
              })
            : ""}
        </ul>
      </div>
    </div>
  );
};
