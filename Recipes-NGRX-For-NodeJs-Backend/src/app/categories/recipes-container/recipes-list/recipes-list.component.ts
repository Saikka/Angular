import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Recipe } from 'src/app/models/recipe.model';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  allRecipes: Recipe[];
  recipes: Recipe[];
  type: string;
  id: string;
  search = false;
  user;
  message = null;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.select('recipes').pipe(take(1)).subscribe(state => {
      this.allRecipes = state.recipes;
    });
    this.store.select('login').pipe(take(1)).subscribe(state => {
      this.user = state.user;
    })
    this.route.params.subscribe(
      (params: Params) => {
        if (params['type'] != null) {
          this.id = params['id'];
          this.type = params['type'];
            if (this.type === 'category') {
              this.recipes = this.allRecipes.filter(rec => {
                if (rec.category == this.id) return rec;
              })
            } else {
              this.recipes = this.allRecipes.filter(rec => {
                if (rec.country === this.id) return rec;
              })
            }
            if (this.recipes.length == 0) {
              this.message = 'No recipes in this category yet.';
            }
        } else if (params['value'] != null) {
          if (params['value'] === 'NaN') {
            this.search = true;
            this.recipes = [];
          } else {
            this.search = false;
            this.recipes = this.allRecipes.filter( recipe => {
              if (recipe.name.toLowerCase().includes(params['value'].toLowerCase())) {
                  return recipe;
              }
            });
          }
          if (this.recipes.length == 0) {
            this.message = 'No recipes found!';
          }
        } else {
          this.recipes = this.allRecipes;
          if (this.recipes.length == 0) {
            this.message = 'No recipes added yet.';
          }
        }
      }
    );
  }

}
