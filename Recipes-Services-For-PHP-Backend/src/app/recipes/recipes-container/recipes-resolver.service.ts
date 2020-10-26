import { Injectable } from "@angular/core";
import { DBService } from 'src/app/shared/db.service';
import { RecipesService } from './recipes.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dbService: DBService, private recipesService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();

        if (recipes.length === 0) {
            return this.dbService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}