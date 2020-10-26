import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as RecipesActions from '../../store/recipes.actions';
import { Category } from 'src/app/models/category.model';
import { Recipe } from 'src/app/models/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editMode: boolean = false;
  recipe: Recipe;
  error: string = null;
  difficulty = ['*', '**', '***', '****', '*****'];
  categories: Category[] = [];
  countries: Category[] = [];
  tab = 'main';
  storeSub: Subscription;
  fileToUpload: File = null;
  image = '';

  get ingredientsControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  get stepsControls() {
    return (this.form.get('steps') as FormArray).controls;
  }

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.store.select('categories').pipe(take(1)).subscribe(state =>{
        this.countries = state.categories.filter(cat => cat.type === 'country');
        this.categories = state.categories.filter(cat => cat.type === 'category');
    });
    this.storeSub = this.store.select('recipes').subscribe(state => {
      this.error = state.error;
    })
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.store.select('recipes').pipe(take(1)).subscribe(state => {
            this.recipe = state.recipes.find(r => r._id === params['id']);
            this.image = "http://localhost:8080/" + this.recipe.image;
          })
        }
        this.initForm(); 
    });
  }

  onTabChange(value: string) {
    this.tab = value;
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required),
        'units': new FormControl(null, Validators.required)
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  onAddStep() {
    (<FormArray>this.form.get('steps')).push(
      new FormGroup({
        'description': new FormControl(null, Validators.required)
      })
    )
  }

  onDeleteStep(index: number) {
    (<FormArray>this.form.get('steps')).removeAt(index);
  }

  onSubmit() {
    let newRecipe = new Recipe(
      this.form.controls['name'].value,
      this.fileToUpload,
      this.form.controls['difficulty'].value,
    );
    if (this.form.controls['category'].value !== "0") {
      newRecipe.category = this.form.controls['category'].value;
    } else {
      newRecipe.category = null;
    }
    if (this.form.controls['country'].value !== "0") {
      newRecipe.country = this.form.controls['country'].value;
    } else {
      newRecipe.country = null;
    }
    newRecipe.ingredients = this.form.controls['ingredients'].value;
    newRecipe.steps = this.form.controls['steps'].value;
    if (this.editMode) {
      newRecipe._id = this.recipe._id;
      this.store.dispatch(new RecipesActions.EditRecipe(newRecipe));
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let name = '';
    let image = null;
    let difficulty = 1;
    let category = "0";
    let country = "0";
    let ingredients = new FormArray([]);
    let steps = new FormArray([]);
    if (this.editMode) {
      name = this.recipe.name;
      difficulty = +this.recipe.difficulty;
      this.recipe.category === null ? category = "0" : category = this.recipe.category;
      this.recipe.country === null ? country = "0" : country = this.recipe.country;
      if (this.recipe.ingredients) {
        for (let ingredient of this.recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, Validators.required),
              'units' : new FormControl(ingredient.units, Validators.required),
            })
          );
        }
      }
      if (this.recipe.steps) {
        for (let step of this.recipe.steps) {
          steps.push(
            new FormGroup({
              'description': new FormControl(step.description, Validators.required)
            })
          );
        }
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'image': new FormControl(image),
      'difficulty': new FormControl(difficulty),
      'category': new FormControl(category),
      'country': new FormControl(country),
      'ingredients': ingredients,
      'steps': steps
    });
    if (!this.editMode) {
      this.form.get('image').setValidators(Validators.required);
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new RecipesActions.ClearError());
    this.storeSub.unsubscribe();
  }

}
