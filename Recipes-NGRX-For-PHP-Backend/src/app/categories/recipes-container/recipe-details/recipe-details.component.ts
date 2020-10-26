import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import * as fromApp from '../../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  id: number;
  recipe: Recipe;
  image;
  subs: Subscription;
  multiplyer: number = 1;
  isEdit: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.store
      .select('login')
      .pipe(take(1))
      .subscribe((state) => {
        if (state.user) {
          this.isEdit = true;
        }
      });
    this.subs = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.store
        .select('recipes')
        .pipe(take(1))
        .subscribe((state) => {
          state.recipes.find((recipe) => {
            if (recipe.id == this.id) {
              this.recipe = recipe;
              this.image = recipe.image;
            }
          });
        });
    });
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

  onEdit() {
    this.router.navigate(['/recipes/all/recipe/', this.recipe.id, 'edit']);
  }

  onDelete() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipe.id));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
