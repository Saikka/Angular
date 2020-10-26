import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Category } from 'src/app/models/category.model';
import * as fromApp from '../../../store/app.reducer';
import * as CategoriesActions from '../../store/categories.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  category: Category = new Category( '', 'category');
  type: string;
  editMode = false;
  index: string;
  error: string = null;
  storeSub: Subscription;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('categories').subscribe(state => {
      this.error = state.error;
    })
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.type = params['type'];
          this.index = params['id'];
          this.store.select('categories').pipe(take(1)).subscribe(state => {
            this.category = state.categories.find(category => {
              if (category.type === this.type && category._id === this.index) {
                return category;
              }
            });
          })
        }
    })
}

  onSubmitForm(form: NgForm) {
    const value = form.value;
    let newCategory = new Category(value.name, this.category.type);
    if (this.editMode) {
      newCategory._id = this.category._id;
      this.store.dispatch(new CategoriesActions.EditCategory(newCategory));
    } else {
      newCategory.type = value.type;
      this.store.dispatch(new CategoriesActions.AddCategory(newCategory));
    }
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.store.dispatch(new CategoriesActions.ClearError());
    this.storeSub.unsubscribe();
  }

}
