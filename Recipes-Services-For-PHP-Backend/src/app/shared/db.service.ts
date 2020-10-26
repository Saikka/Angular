import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, take } from 'rxjs/operators';
import { CategoriesService } from '../recipes/category/categories.service';
import { Category } from '../models/category.model';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../recipes/recipes-container/recipes.service';
import { Ingredient } from '../models/ingredient.model';

@Injectable({providedIn: 'root'})
export class DBService {
    constructor(private http: HttpClient, private categoriesService: CategoriesService, private repicesService: RecipesService) {}

    fetchCategories() {
        return this.http.get<Category[]>('http://localhost/recipes/get.php',
            {
                params: new HttpParams().set('q', 'SELECT name, type FROM category UNION SELECT name, type FROM country;')
            }
            ).pipe(
                tap(categories => {
                    this.categoriesService.setCategories(categories);
                })
            )
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('http://localhost/recipes/get.php',
            {
                params: new HttpParams().set('q', 'SELECT * FROM recipe')
            }
        ).pipe(
            tap((recipes: Recipe[]) => {
                this.repicesService.setRecipes(recipes);
            })
        )
    }

    fetchRecipeIngredients(id: number) {
        return this.http.get<Ingredient[]>('http://localhost/recipes/get.php',
            {
                params: new HttpParams().set('q', 'SELECT name, amount, units FROM ingredient INNER JOIN recipe_has_ingredient ON ingredient.id_ingredient = recipe_has_ingredient.id_ingredient WHERE recipe_has_ingredient.id_recipe = ' + id)
            }
        );
    }

    saveCategory(category: Category) {
        this.http.get('http://localhost/recipes/modify.php',
                {
                    params: new HttpParams().set('q', "INSERT INTO " + category.type + " (name, type) VALUES ('" + category.name + "', '" + category.type + "')")
                }
            ).subscribe(
                response => {
                    console.log(response);
                }
            );
    }

    updateCategory(category: Category, name: String) {
        this.http.get('http://localhost/recipes/modify.php',
                {
                    params: new HttpParams().set('q', "UPDATE " + category.type + " SET name= '" + category.name + "', type = '" + category.type + "' where name = '" + name + "'")
                }
            ).subscribe(
                response => {
                    console.log(response);
                }
            );
    }

    deleteCategory(category: Category) {
        this.http.get('http://localhost/recipes/modify.php',
                {
                    params: new HttpParams().set('q', "DELETE FROM " + category.type + " WHERE name = '" + category.name + "'")
                }
            ).subscribe(
                response => {
                    console.log(response);
                }
            );
    }

}