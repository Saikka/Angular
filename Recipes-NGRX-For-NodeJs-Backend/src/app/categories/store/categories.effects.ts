import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, map, withLatestFrom, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as CategoriesActions from './categories.actions';
import { Category } from 'src/app/models/category.model';
import * as fromApp from '../../store/app.reducer';
import { Router } from '@angular/router';

export interface ResData {
    categories?: Category[];
    category?: Category;
    id?: string;
    message: string
}

@Injectable()
export class CategoriesEffects {

    @Effect()
    fetchCategories = this.actions$.pipe(
        ofType(CategoriesActions.FETCH_CATEGORIES),
        withLatestFrom(this.store.select('login')),
        switchMap(([actionData, state]) => {
            if (state.user) {
                return this.http.get('http://localhost:8080/categories/categories/' + state.user._id)
            } else {
                return this.http.get('http://localhost:8080/categories/categories/')
            } 
        }),
        map((resData: ResData) => {
            return new CategoriesActions.SetCategories(resData.categories);
        })
    );

    @Effect()
    addCategory = this.actions$.pipe(
        ofType(CategoriesActions.ADD_CATEGORY),
        map((actionData: CategoriesActions.AddCategory) => actionData),
        withLatestFrom(this.store.select('login')),
        switchMap(([actionData, state]) => {
            console.log('boo');
            return this.http.post('http://localhost:8080/categories/category', JSON.stringify(actionData.payload), 
             {
                headers: new HttpHeaders({
                    'Content-Type':'application/json', 
                    'Authorization': 'Bearer ' + state.user.token
                })
             }
            )
            .pipe(
                map((resData: ResData) => {
                    return new CategoriesActions.AddCategorySuccess(resData.category);
                }),
                catchError(error => {
                    return of(new CategoriesActions.EditingCategoryFail(error.error.message));
                })
            )
        })
    );

    @Effect()
    editCategory = this.actions$.pipe(
        ofType(CategoriesActions.EDIT_CATEGORY),
        map((actionData: CategoriesActions.EditCategory) => actionData),
        withLatestFrom(this.store.select('login')),
        switchMap(([actionData, state]) => {
            return this.http.put('http://localhost:8080/categories/category/' + actionData.payload._id,  JSON.stringify(actionData.payload), 
            {
               headers: new HttpHeaders({
                   'Content-Type':'application/json',
                   'Authorization': 'Bearer ' + state.user.token
                })
            })
            .pipe(
                map((resData: ResData) => {
                    return new CategoriesActions.EditCategorySuccess(resData.category);
                }),
                catchError(error => {
                    return of(new CategoriesActions.EditingCategoryFail(error.error.message));
                })
            )
        })
    );

    @Effect()
    deleteCategory = this.actions$.pipe(
        ofType(CategoriesActions.DELETE_CATEGORY),
        map((actionData: CategoriesActions.EditCategory) => actionData),
        withLatestFrom(this.store.select('login')),
        switchMap(([actionData, state]) => {
            return this.http.delete('http://localhost:8080/categories/category/' + actionData.payload,
            {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + state.user.token
                 })
            })
            .pipe(
                map((resData: ResData) => {
                    return new CategoriesActions.DeleteCategorySuccess(resData.id);
                }),
                catchError(error => {
                    return of(new CategoriesActions.EditingCategoryFail(error.error.message));
                })
            )
        })
    );

    @Effect({dispatch: false})
    redirect = this.actions$.pipe(
        ofType(CategoriesActions.ADD_CATEGORY_SUCCESS, CategoriesActions.EDIT_CATEGORY_SUCCESS,
            CategoriesActions.DELETE_CATEGORY_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient,
         private store: Store<fromApp.AppState>, private router: Router) {}
}