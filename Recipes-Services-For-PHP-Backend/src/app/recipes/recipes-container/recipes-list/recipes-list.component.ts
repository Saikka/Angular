import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  type: string;
  id: number;
  search = false;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['type'] != null) {
          this.id = +params['id'];
          this.type = params['type'];
          this.recipes = this.recipesService.getRecipesByCategory(this.type, this.id);
        } else {
          if (params['value'] === 'NaN') {
            this.search = true;
            this.recipes = [];
          } else {
            this.search = false;
            this.recipes = this.recipesService.getRecipesBySearch(params['value']);
          }
        }
      }
    );
  }

}
