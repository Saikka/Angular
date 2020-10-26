import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
  switchMap,
  map,
  withLatestFrom,
  catchError,
  tap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { Recipe } from 'src/app/models/recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../../store/app.reducer';
import { Router } from '@angular/router';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'http://localhost/recipes/get-recipes.php'
      );
    }),
    map((recipes) => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect()
  addRecipe = this.actions$.pipe(
    ofType(RecipesActions.ADD_RECIPE),
    map((actionData: RecipesActions.AddRecipe) => actionData),
    withLatestFrom(this.store.select('login')),
    switchMap(([actionData, state]) => {
      const token = state.user ? state.user.token : null;
      return this.http
        .post<Recipe>(
          'http://localhost/recipes/add-recipe.php',
          actionData.payload,
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          }
        )
        .pipe(
          map((recipe) => {
            console.log(recipe);
            return new RecipesActions.AddRecipeSuccess(recipe);
          }),
          catchError((error) => {
            console.log(error);
            return of(new RecipesActions.EditingRecipeFail(error.error));
          })
        );
    })
  );

  @Effect()
  editRecipe = this.actions$.pipe(
    ofType(RecipesActions.EDIT_RECIPE),
    map((actionData: RecipesActions.EditRecipe) => actionData),
    withLatestFrom(this.store.select('login')),
    switchMap(([actionData, state]) => {
      const token = state.user ? state.user.token : null;
      return this.http
        .put<Recipe>(
          'http://localhost/recipes/edit-recipe.php',
          actionData.payload,
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          }
        )
        .pipe(
          map((recipe) => {
            console.log(recipe);
            return new RecipesActions.EditRecipeSuccess(recipe);
          }),
          catchError((error) => {
            return of(new RecipesActions.EditingRecipeFail(error.error));
          })
        );
    })
  );

  @Effect()
  deleteRecipe = this.actions$.pipe(
    ofType(RecipesActions.DELETE_RECIPE),
    map((actionData: RecipesActions.DeleteRecipe) => actionData),
    withLatestFrom(this.store.select('login')),
    switchMap(([actionData, state]) => {
      const token = state.user ? state.user.token : null;
      const params = new HttpParams().set('id', actionData.payload.toString());
      return this.http
        .delete('http://localhost/recipes/delete-recipe.php', {
          params: params,
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(
          map((id: number) => {
            return new RecipesActions.DeleteRecipeSuccess(id);
          }),
          catchError((error) => {
            return of(new RecipesActions.EditingRecipeFail(error.error));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  redirectAddAndEdit = this.actions$.pipe(
    ofType(
      RecipesActions.ADD_RECIPE_SUCCESS,
      RecipesActions.EDIT_RECIPE_SUCCESS
    ),
    tap(
      (
        data: RecipesActions.AddRecipeSuccess | RecipesActions.EditRecipeSuccess
      ) => {
        this.router.navigate(['./recipes/all/recipe/', data.payload.id]);
      }
    )
  );

  @Effect({ dispatch: false })
  redirectDelete = this.actions$.pipe(
    ofType(RecipesActions.DELETE_RECIPE_SUCCESS),
    tap(() => {
      this.router.navigate(['/recipes/all']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
