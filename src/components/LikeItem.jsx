import React from "react";
const LikesItem = ({ item }) => {
  console.log("item", item);
  const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
      title.split(" ").reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newTitle.push(cur);
        }
        return acc + cur.length;
      }, 0);

      // return the result
      return `${newTitle.join(" ")} ...`;
    }
    return title;
  };
  return (
    <li>
      <div class="likes__link">
        <figure class="likes__fig">
          <img src={item.img} alt={item.title} />
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">{limitRecipeTitle(item.title)}</h4>
          <p class="items__author">{item.author}</p>
        </div>
      </div>
    </li>
  );
};

export default LikesItem;
