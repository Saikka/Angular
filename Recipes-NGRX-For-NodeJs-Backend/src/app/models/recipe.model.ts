import { Ingredient } from './ingredient.model';
import { Step } from './step.model';

export class Recipe {
    constructor(name: string, image: File, difficulty: number) {
        this.name = name;
        this.image = image;
        this.difficulty = difficulty;
    }

    _id: string;
    name: string;
    image: File;
    difficulty: number;
    category: string;
    country: string;
    edit?: boolean;
    ingredients: Ingredient[];
    steps: Step[];
}