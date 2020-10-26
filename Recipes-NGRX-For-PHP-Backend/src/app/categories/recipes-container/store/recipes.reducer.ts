import { Recipe } from 'src/app/models/recipe.model';
import * as RecipesActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
  error: string;
}

const initialState: State = {
  recipes: [],
  error: null,
};

export function recipesReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipesActions.ADD_RECIPE:
    case RecipesActions.EDIT_RECIPE:
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        error: null,
      };
    case RecipesActions.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipesActions.EDIT_RECIPE_SUCCESS:
      var id = -1;
      const newRecipe = {
        ...state.recipes.find((recipe, index) => {
          if (recipe.id === action.payload.id) {
            id = index;
            return recipe;
          }
        }),
        ...action.payload,
      };
      const newRecipes = [...state.recipes];
      newRecipes[id] = newRecipe;
      return {
        ...state,
        recipes: newRecipes,
      };
    case RecipesActions.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes.filter((rec) => {
          if (rec.id !== action.payload) {
            return rec;
          }
        }),
      };
    case RecipesActions.EDITING_RECIPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case RecipesActions.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
