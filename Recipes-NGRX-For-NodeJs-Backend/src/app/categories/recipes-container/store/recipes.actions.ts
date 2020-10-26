import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';
import { DeleteCategorySuccess } from '../../store/categories.actions';

export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const SET_RECIPES = '[Recipes] Set Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const ADD_RECIPE_SUCCESS = '[Recipes] Add Recipe Success';
export const EDIT_RECIPE = '[Recipe] Edit Recipe';
export const EDIT_RECIPE_SUCCESS = '[Recipe] Edit Recipe Success';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const DELETE_RECIPE_SUCCESS = '[Recipe] Delete Recipe Success';
export const EDITING_RECIPE_FAIL = '[Recipe] Editing Recipe Fail';
export const CLEAR_ERROR = '[Recipe] Clear Error';

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) {}
}

export class AddRecipeSuccess implements Action {
    readonly type = ADD_RECIPE_SUCCESS;

    constructor(public payload: Recipe) {}
}

export class EditRecipe implements Action {
    readonly type = EDIT_RECIPE;

    constructor(public payload: Recipe) {}
}

export class EditRecipeSuccess implements Action {
    readonly type = EDIT_RECIPE_SUCCESS;

    constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: string) {}
}

export class DeleteRecipeSuccess implements Action {
    readonly type = DELETE_RECIPE_SUCCESS;

    constructor(public payload: string) {}
}

export class EditingRecipeFail implements Action {
    readonly type = EDITING_RECIPE_FAIL;

    constructor(public payload: string) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type RecipesActions =
| FetchRecipes
| SetRecipes
| AddRecipe
| AddRecipeSuccess
| EditRecipe
| EditRecipeSuccess
| DeleteRecipe
| DeleteRecipeSuccess
| EditingRecipeFail
| ClearError;