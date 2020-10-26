import { Ingredient } from './ingredient.model';
import { Step } from './step.model';

export class Recipe {
  constructor(name: string, image: string, difficulty: number) {
    this.name = name;
    this.image = image;
    this.difficulty = difficulty;
  }

  id: number;
  name: string;
  image: string;
  difficulty: number;
  category_id: number;
  country_id: number;
  ingredients: Ingredient[];
  steps: Step[];
}
