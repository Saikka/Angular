import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, map, withLatestFrom, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { Recipe } from 'src/app/models/recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../../store/app.reducer';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Step } from 'src/app/models/step.model';

export interface ResData {
    recipes?: Recipe[];
    recipe?: Recipe;
    id?: string;
    message: string
}

const createFormData = (
    name: string,
    image: File,
    difficulty: number,
    category: string,
    country: string,
    ingredients: Ingredient[],
    steps: Step[]
) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('difficulty', difficulty.toString());
    formData.append('category', category);
    formData.append('country', country);
    if (ingredients) {
        formData.append('ingredients', JSON.stringify(ingredients));
    }
    if (steps) {
        formData.append('steps', JSON.stringify(steps));
    }
    return formData;
};

@Injectable()
export class RecipesEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        withLatestFrom(this.store.select('login')),
        switchMap(([actionData, state]) => {
            if (state.user) {
                return this.http.get('http://localhost:8080/recipes/recipes/' + state.user._id)
            } else {
                return this.http.get('http://localhost:8080/recipes/recipes')
            }       
        }),
        map((resData: ResData) => {
            return new RecipesActions.SetRecipes(resData.recipes);
        })
    );

    @Effect()
    addRecipe = this.actions$.pipe(
        ofType(RecipesActions.ADD_RECIPE),
        map((actionData: RecipesActions.AddRecipe) => actionData),
        withLatestFrom(this.store.select('login')),
        switchMap(([actionData, state]) => {
            const formData = createFormData(actionData.payload.name, actionData.payload.image,
                actionData.payload.difficulty, actionData.payload.category, actionData.payload.country,
                actionData.payload.ingredients, actionData.payload.steps);
            return this.http.post('http://localhost:8080/recipes/recipe', formData, 
            {
               headers: new HttpHeaders({
                   'Authorization': 'Bearer ' + state.user.token
                })
            })
            .pipe(
                map((resData: ResData) => {
                    return new RecipesActions.AddRecipeSuccess(resData.recipe);
                }),
                catchError(error => {
                    return of(new RecipesActions.EditingRecipeFail(error.error.message));
                })
            )
        }),
    );

    @Effect()
    editRecipe = this.actions$.pipe(
        ofType(RecipesActions.EDIT_RECIPE),
        map((actionData: RecipesActions.EditRecipe) => actionData),
        withLatestFrom(this.store.select('login')),
        switchMap(([actionData, state]) => {
            const formData = createFormData(actionData.payload.name, actionData.payload.image,
                actionData.payload.difficulty, actionData.payload.category, actionData.payload.country,
                actionData.payload.ingredients, actionData.payload.steps);
            return this.http.put('http://localhost:8080/recipes/recipe/' + actionData.payload._id, formData, 
            {
               headers: new HttpHeaders({
                   'Authorization': 'Bearer ' + state.user.token
                })
            })
            .pipe(
                map((resData: ResData) => {
                    return new RecipesActions.EditRecipeSuccess(resData.recipe);
                }),
                catchError(error => {
                    return of(new RecipesActions.EditingRecipeFail(error.error.message));
                })
            )
        }),
    );

    @Effect()
    deleteRecipe = this.actions$.pipe(
        ofType(RecipesActions.DELETE_RECIPE),
        map((actionData: RecipesActions.DeleteRecipe) => actionData),
        withLatestFrom(this.store.select('login')),
        switchMap(([actionData, state]) => {
            return this.http.delete('http://localhost:8080/recipes/recipe/' + actionData.payload,
            {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + state.user.token
                 })
             })
             .pipe(
                map((resData: ResData) => {
                    return new RecipesActions.DeleteRecipeSuccess(resData.id);
                }),
                catchError(error => {
                    return of(new RecipesActions.EditingRecipeFail(error.error.message));
                })
             )
        }),
    );

    @Effect({dispatch: false})
    redirectAddAndEdit = this.actions$.pipe(
        ofType(RecipesActions.ADD_RECIPE_SUCCESS, RecipesActions.EDIT_RECIPE_SUCCESS),
        tap((data: RecipesActions.AddRecipeSuccess | RecipesActions.EditRecipeSuccess) => {
            this.router.navigate(['./recipes/all/recipe/', data.payload._id]);
        })
    );

    @Effect({dispatch: false})
    redirectDelete = this.actions$.pipe(
        ofType(RecipesActions.DELETE_RECIPE_SUCCESS),
        tap(() => {
            this.router.navigate(['/recipes/all']);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, 
        private store: Store<fromApp.AppState>, private router: Router) {}
}