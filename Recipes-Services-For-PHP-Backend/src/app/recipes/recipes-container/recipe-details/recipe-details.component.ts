import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { DBService } from 'src/app/shared/db.service';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  id: number;
  recipe: Recipe;
  ingredients: Ingredient[];
  subs: Subscription;
  multiplyer: number = 1;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private dbService: DBService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.id);
      }
    );
    this.subs = this.dbService.fetchRecipeIngredients(this.id).subscribe(
      ingredients => {
        this.ingredients = ingredients;
      }
    )
  }

  multiplyerChange(sign: string) {
    if (sign === '-' && this.multiplyer > 0.5) {
      this.multiplyer = this.multiplyer - 0.5;
    } else {
      if (this.multiplyer < 10) {
        this.multiplyer = this.multiplyer + 0.5;
      }
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
