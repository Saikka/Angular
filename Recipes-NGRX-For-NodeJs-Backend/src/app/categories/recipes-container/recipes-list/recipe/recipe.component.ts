import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  @Input() recipe: Recipe;
  image;

  constructor() { }

  ngOnInit() {
    this.image = "http://localhost:8080/" + this.recipe.image;
  }

}
