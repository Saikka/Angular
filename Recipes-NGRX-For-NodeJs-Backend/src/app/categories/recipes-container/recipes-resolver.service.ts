import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { of } from "rxjs";

import { Recipe } from 'src/app/models/recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from './store/recipes.actions';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(
            take(1),
            map(state => {
                return state.recipes;
            }),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(new RecipesActions.FetchRecipes());
                    return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
                } else {
                    return of(recipes);
                }
            })
        )
    }
}