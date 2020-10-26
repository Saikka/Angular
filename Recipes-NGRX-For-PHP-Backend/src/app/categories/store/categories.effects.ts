import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
  switchMap,
  map,
  withLatestFrom,
  tap,
  catchError,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import * as CategoriesActions from './categories.actions';
import { Category } from 'src/app/models/category.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class CategoriesEffects {
  @Effect()
  fetchCategories = this.actions$.pipe(
    ofType(CategoriesActions.FETCH_CATEGORIES),
    switchMap(() => {
      return this.http.get<Category[]>(
        'http://localhost/recipes/get-categories.php'
      );
    }),
    map((categories) => {
      return new CategoriesActions.SetCategories(categories);
    })
  );

  @Effect()
  addCategory = this.actions$.pipe(
    ofType(CategoriesActions.ADD_CATEGORY),
    map((actionData: CategoriesActions.AddCategory) => actionData),
    withLatestFrom(this.store.select('login')),
    switchMap(([actionData, state]) => {
      const token = state.user ? state.user.token : null;
      return this.http
        .put<Category>(
          'http://localhost/recipes/add-category.php',
          actionData.payload,
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          }
        )
        .pipe(
          map((category) => {
            return new CategoriesActions.AddCategorySuccess(category);
          }),
          catchError((error) => {
            return of(new CategoriesActions.EditingCategoryFail(error.error));
          })
        );
    })
  );

  @Effect()
  editCategory = this.actions$.pipe(
    ofType(CategoriesActions.EDIT_CATEGORY),
    map((actionData: CategoriesActions.EditCategory) => actionData),
    withLatestFrom(this.store.select('login')),
    switchMap(([actionData, state]) => {
      const token = state.user ? state.user.token : null;
      return this.http
        .put<Category>(
          'http://localhost/recipes/edit-category.php',
          actionData.payload,
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          }
        )
        .pipe(
          map((category) => {
            return new CategoriesActions.EditCategorySuccess(category);
          }),
          catchError((error) => {
            return of(new CategoriesActions.EditingCategoryFail(error.error));
          })
        );
    })
  );

  @Effect()
  deleteCategory = this.actions$.pipe(
    ofType(CategoriesActions.DELETE_CATEGORY),
    map((actionData: CategoriesActions.DeleteCategory) => actionData),
    withLatestFrom(this.store.select('login')),
    switchMap(([actionData, state]) => {
      const token = state.user ? state.user.token : null;
      let params = new HttpParams();
      params = params.append('id', actionData.payload.id.toString());
      params = params.append('type', actionData.payload.type);
      return this.http
        .delete<Category>('http://localhost/recipes/delete-category.php', {
          params: params,
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(
          map((category) => {
            return new CategoriesActions.DeleteCategorySuccess({
              id: category.id,
              type: category.type,
            });
          }),
          catchError((error) => {
            return of(new CategoriesActions.EditingCategoryFail(error.error));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  redirect = this.actions$.pipe(
    ofType(
      CategoriesActions.ADD_CATEGORY_SUCCESS,
      CategoriesActions.EDIT_CATEGORY_SUCCESS,
      CategoriesActions.DELETE_CATEGORY_SUCCESS
    ),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}
}
