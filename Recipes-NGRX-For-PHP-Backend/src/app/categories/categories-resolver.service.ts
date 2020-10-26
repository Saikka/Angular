import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/categories.actions';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesResolverService implements Resolve<Category[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('categories').pipe(
      take(1),
      map((state) => {
        return state.categories;
      }),
      switchMap((categories) => {
        if (categories.length === 0) {
          this.store.dispatch(new RecipesActions.FetchCategories());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_CATEGORIES),
            take(1)
          );
        } else {
          return of(categories);
        }
      })
    );
  }
}
