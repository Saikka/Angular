import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Category } from 'src/app/models/category.model';
import * as fromApp from '../store/app.reducer';
import * as CategoriesActions from './store/categories.actions';
import * as RecipesActions from './recipes-container/store/recipes.actions';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  subsCategory: Subscription;
  userSubs: Subscription;
  allCategories: Category[];
  categories: Category[];
  type: string = 'By category';
  searchValue: string;
  isEdit = false;
  isLogin = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new CategoriesActions.FetchCategories());
    this.store.dispatch(new RecipesActions.FetchRecipes());
    this.subsCategory = this.store.select('categories').subscribe(state => {
      this.allCategories = state.categories;
      this.categories = this.getCategoriesByType(state.categories, state.type);
    });
    this.userSubs = this.store.select('login').subscribe(state => {
      this.isLogin = !!state.user;
    });
  }

  onChangeType(type: string) {
    console.log(this.isLogin);
    this.store.dispatch(new CategoriesActions.ChangeType(type));
    this.type = 'By ' + type;
    this.categories = this.getCategoriesByType(this.allCategories, type);
    this.router.navigate(['/recipes']);
  }

  onSearch() {
    var value = '';
    this.searchValue == null ? value = 'NaN' : value = this.searchValue;
    this.router.navigate(['search', value], {relativeTo: this.route});
  }

  onAddCategory() {
    this.router.navigate(['category/new'], {relativeTo: this.route});
  }

  onEditCategories() {
    this.isEdit = !this.isEdit;
  }

  private getCategoriesByType(categories: Category[], type: string) {
    return categories.filter(category => {
      if (category.type === type) {
        return category;
      }
    })
  }

  ngOnDestroy() {
    this.subsCategory.unsubscribe();
    this.userSubs.unsubscribe();
  }

}
