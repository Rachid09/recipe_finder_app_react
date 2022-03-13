import React from "react";
import ShoppingListItem from "../components/ShoppingListItem";

export const RecipeShoppingList = ({
  shoppingList,
  showShoppingList,
  deleteItem,
}) => {
  console.log("inside recipe shopping ingredients : ", shoppingList);
  console.log("showShoppingList ", showShoppingList);
  return (
    <div className="shopping">
      <h2 className="heading-2">My Shopping List</h2>

      <ul
        className={`shopping__list ${
          shoppingList.length && showShoppingList ? " scroll" : ""
        }`}
      >
        {shoppingList.length && showShoppingList
          ? shoppingList.map((el, index) => {
              return (
                <ShoppingListItem
                  item={el}
                  key={index}
                  deleteItem={deleteItem}
                />
              );
            })
          : ""}
      </ul>

      <div className="copyright">
        &copy; by Rachid ahsoune. Powered by
        <a
          href="http://food2fork.com"
          target="_blank"
          className="link"
          rel="noreferrer"
        >
          Food2Fork.com
        </a>
        .
      </div>
    </div>
  );
};
