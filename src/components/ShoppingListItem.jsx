const ShoppingListItem = ({ item, deleteItem }) => {
  console.log("inside shopping item", item);
  return (
    <li className="shopping__item">
      <div className="shopping__count">
        <input
          type="number"
          defaultValue={item.count}
          step={item.count}
          className="shopping__count-value"
          //   onChange={() => handleCountItem()}
        />
        <p>{item.unit}</p>
      </div>
      <p className="shopping__description">{item.ingredient}</p>
      <button
        className="shopping__delete btn-tiny"
        onClick={() => deleteItem()}
      >
        <svg>
          <use href="/assets/img/icons.svg#icon-circle-with-cross"></use>
        </svg>
      </button>
    </li>
  );
};

export default ShoppingListItem;
