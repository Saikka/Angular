import { Recipe } from 'src/app/models/recipe.model';
import * as RecipesActions from './recipes.actions';

export interface State {
    recipes: Recipe[];
    error: string;
}

const initialState: State = {
    recipes: [],
    error: null 
}

export function recipesReducer(state = initialState, action: RecipesActions.RecipesActions) {
    switch(action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload],
                error: null
            }
        case RecipesActions.ADD_RECIPE_SUCCESS:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                error: null
            }
        case RecipesActions.EDIT_RECIPE_SUCCESS:
            var id = -1;
            const newRecipe = {
                ...state.recipes.find((recipe, index) => {
                    if (recipe._id === action.payload._id) {
                        id = index;
                        return recipe;
                    }
                }),
                ...action.payload
            };
            const newRecipes = [...state.recipes];
            newRecipes[id] = newRecipe;
            return {
                ...state,
                recipes: newRecipes,
                error: null
            }
        case RecipesActions.DELETE_RECIPE_SUCCESS:
            return {
                ...state,
                recipes: state.recipes.filter(rec => {
                    if (rec._id !== action.payload) {
                        return rec;
                    }
                }),
                error: null
            }
        case RecipesActions.EDITING_RECIPE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case RecipesActions.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}