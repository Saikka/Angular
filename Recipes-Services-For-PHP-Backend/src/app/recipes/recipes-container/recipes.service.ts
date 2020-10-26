import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';

@Injectable({providedIn: 'root'})
export class RecipesService {
    private recipes: Recipe[] = [];
    recipesChanged = new Subject<Recipe[]>();

    getRecipes() {
        return this.recipes;
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(recipes);
    }

    getRecipesByCategory(type: string, id: number) {
        return this.recipes.filter((recipe) => {
            if (type === 'category') {
                if (recipe.category_id == id) {
                    return recipe;
                }
            } else {
                if (recipe.country_id == id) {
                    return recipe;
                }
            }
        })
    }

    getRecipe(id: number) {
        return this.recipes.find(recipe =>  
            recipe.id_recipe == id
        );
    }

    getRecipesBySearch(search: string) {
        return this.recipes.filter( recipe => {
            if (recipe.name.toLowerCase().includes(search.toLowerCase())) {
                return recipe;
            }
        });
    }

}