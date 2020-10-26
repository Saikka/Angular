import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from 'src/app/models/recipe.model';
import * as fromApp from '../../../store/app.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  allRecipes: Recipe[];
  recipes: Recipe[];
  type: string;
  id: number;
  search = false;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.select('recipes').subscribe(state => {
      this.allRecipes = state.recipes;
    })
    this.route.params.subscribe(
      (params: Params) => {
        if (params['type'] != null) {
          this.id = +params['id'];
          this.type = params['type'];
            if (this.type === 'category') {
              this.recipes = this.allRecipes.filter(rec => {
                if (rec.category_id === this.id) return rec;
              })
            } else {
              this.recipes = this.allRecipes.filter(rec => {
                if (rec.country_id === this.id) return rec;
              })
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
        } else {
          this.recipes = this.allRecipes;
        }
      }
    );
  }

}
