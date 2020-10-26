import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Category } from 'src/app/models/category.model';
import { Recipe } from 'src/app/models/recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as CategoriesActions from '../store/categories.actions';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  @Input() isEdit: boolean;
  type: string;
  recipes: Recipe[] = [];
  isOpen = false;

  constructor(
    private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.store.select('categories').pipe(take(1)).subscribe(state => {
      this.type = state.type;
    })
  }

  onEdit() {
    this.router.navigate([this.category.type, this.category.id, 'edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.store.dispatch(new CategoriesActions.DeleteCategory(this.category));
    this.router.navigate(['/recipes']);
  }

}
