import React, { Component } from "react";
import { Header } from "../ui/Header";
import { RecipeListView } from "../ui/RecipeListView";
import { RecipeView } from "../ui/RecipeView";
import { RecipeShoppingList } from "../ui/RecipeShoppingList";
import axios from "axios";
import { key } from "../constants/defaultValues";
import uniqid from "uniqid";
// import { Route, Routes, Router } from "react-router-dom";
// // const { createMemoryHistory } = require("history");

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipeName: "",
      isLoading: false,
      showShoppingList: false,
      currentRecipe: {
        id: "",
        title: "",
        author: "",
        img: "",
        url: "",
        time: "",
        servings: "",
        ingredients: [],
      },
      isLoadingRecipe: false,
      currentPage: 1,
      shoppingList: [],
    };
  }

  getRecipes = async (recipeQuery) => {
    this.setState({ isLoading: true });
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/search?key=${key}&q=${recipeQuery}`
      );
      const result = res.data.recipes;
      this.setState({ ...this.state, recipes: result, isLoading: false });
    } catch (error) {
      alert(error);
    }
  };

  parseIngredients = (ingredients) => {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];
    const units = [...unitsShort, "kg", "g"];

    const newIngredients = ingredients.map((el) => {
      // 1) Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // 3) Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
        // Ex. 4 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" "),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit, but 1st element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        // There is NO unit and NO number in 1st position
        objIng = {
          count: 1,
          unit: "",
          ingredient,
        };
      }

      return objIng;
    });
    return newIngredients;
  };
  calcTime = (ingredients) => {
    const numberingredients = ingredients.length;
    const periods = Math.ceil(numberingredients / 3);
    const mealTime = 15 * periods;

    return mealTime;
  };

  decreaseServingsIngredients = () => {
    const {
      currentRecipe: { ingredients },
    } = this.state;
    const {
      currentRecipe: { servings },
    } = this.state;

    const newIngredients = ingredients.map((objIng) => {
      objIng.count = parseFloat(
        objIng.count * (servings - 1 / servings)
      ).toFixed(2);
      return objIng;
    });

    console.log("new ingredients : ", newIngredients);

    this.setState((previousState) => ({
      // ...currentRecipe,
      currentRecipe: {
        ...previousState.currentRecipe,
        servings: previousState.currentRecipe.servings - 1,
        ingredients: newIngredients,
      },
      // servings: previousState.currentRecipe.servings + 1,
    }));
  };

  increaseServingsIngredients = () => {
    const {
      currentRecipe: { ingredients },
    } = this.state;
    const {
      currentRecipe: { servings },
    } = this.state;

    const newIngredients = ingredients.map((objIng) => {
      objIng.count = objIng.count * (servings + 1 / servings);
      return objIng;
    });
    console.log("new ingredients : ", newIngredients);

    this.setState((previousState) => ({
      // ...currentRecipe,
      currentRecipe: {
        ...previousState.currentRecipe,
        servings: previousState.currentRecipe.servings + 1,
        ingredients: newIngredients,
      },
      // servings: previousState.currentRecipe.servings + 1,
    }));
  };

  getRecipe = async (id) => {
    this.setState({ isLoadingRecipe: true });
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?key=${key}&rId=${id}`
      );
      const ingredients = await this.parseIngredients(
        res.data.recipe.ingredients
      );

      const mealTime = this.calcTime(ingredients);

      const currentRecipe = {
        id: res.data.recipe.recipe_id,
        title: res.data.recipe.title,
        author: res.data.recipe.publisher,
        img: res.data.recipe.image_url,
        url: res.data.recipe.source_url,
        time: mealTime,
        servings: 4,
        ingredients: ingredients,
      };
      //   this.parseIngredients();

      this.setState({ ...this.state, currentRecipe, isLoadingRecipe: false });
      console.log("currenRecipe : ", currentRecipe);
    } catch (error) {
      console.log(error);
      alert("Something went wrong :(");
    }
  };

  handleInputChange = (recipeName) => {
    this.setState({ ...this.state, recipeName });
  };
  handleKeyDown = (e) => {
    const { recipeName } = this.state;
    if (e.keyCode === 13) {
      this.getRecipes(recipeName);
    }
  };

  deleteItem = (id) => {
    const { shoppingList } = this.state;
    const index = shoppingList.findIndex((el) => el.id === id);
    // [2,4,8] splice(1, 2) -> returns [4, 8], original array is [2]
    // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]
    shoppingList.splice(index, 1);
    this.setState({ shoppingList });
  };

  getPageRecipes = (recipes, currentPage, resultsPerPage) => {
    // console.log('inside function');
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;

    return recipes.slice(start, end);
  };
  changePageHandler = (Page) => {
    //  const {currentPage} = this.state
    this.setState({ ...this.state, currentPage: Page });
  };
  addToShoppingList = () => {
    console.log("inside add to shopping list");
    const {
      currentRecipe: { ingredients },
      shoppingList,
    } = this.state;

    const newItemList = ingredients.map((el) => {
      return {
        id: uniqid(),
        count: el.count,
        unit: el.unit,
        ingredient: el.ingredient,
      };
    });

    shoppingList.push(...newItemList);
    this.setState({ shoppingList, showShoppingList: true });
  };

  render() {
    const {
      recipes,
      recipeName,
      isLoading,
      currentRecipe,
      isLoadingRecipe,
      currentPage,
      showShoppingList,
      shoppingList,
    } = this.state;

    // console.log(currenRecipesData);
    return (
      <>
        <div className="container">
          <Header
            getRecipes={this.getRecipes}
            handleInputChange={this.handleInputChange}
            // recipes={recipes}
            recipeName={recipeName}
            handleKeyDown={this.handleKeyDown}
          />
          <RecipeListView
            recipes={recipes}
            isLoading={isLoading}
            getRecipeHandler={this.getRecipe}
            getPageRecipes={this.getPageRecipes}
            currentPage={currentPage}
            changePageHandler={this.changePageHandler}
            currentRecipe={currentRecipe}
          />

          <RecipeView
            currentRecipe={currentRecipe}
            isLoadingRecipe={isLoadingRecipe}
            decreaseServingsIngredients={this.decreaseServingsIngredients}
            increaseServingsIngredients={this.increaseServingsIngredients}
            addToShoppingList={this.addToShoppingList}
          />
          {/* <Router location={history.location} navigator={history}>
            <Routes>
             <Route component=} path ='/#' />
           </Routes>
         </Router> */}
          <RecipeShoppingList
            shoppingList={shoppingList}
            showShoppingList={showShoppingList}
            deleteItem={this.deleteItem}
          />
        </div>
      </>
    );
  }
}
