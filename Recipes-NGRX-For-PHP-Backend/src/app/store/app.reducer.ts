import { ActionReducerMap } from '@ngrx/store';

import * as fromLogin from '../login/store/login.reducer';
import * as fromCategories from '../categories/store/categories.reducer';
import * as fromRecipes from '../categories/recipes-container/store/recipes.reducer';

export interface AppState {
    login: fromLogin.State;
    categories: fromCategories.State;
    recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    login: fromLogin.loginReducer,
    categories: fromCategories.categoriesReducer,
    recipes: fromRecipes.recipesReducer
}