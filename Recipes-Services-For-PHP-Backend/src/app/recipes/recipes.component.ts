import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { CategoriesService } from './category/categories.service';
import { Category } from 'src/app/models/category.model';
import { DBService } from '../shared/db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  subsCategory: Subscription;
  userSubs: Subscription;
  categories: Category[];
  type: string = 'By category';
  searchValue: string;
  isEdit = false;
  isLogin = false;

  constructor(private categoriesService: CategoriesService, 
    private dbService: DBService, 
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dbService.fetchCategories().pipe(take(1)).subscribe();
    this.dbService.fetchRecipes().pipe(take(1)).subscribe();
    this.subsCategory = this.categoriesService.categoryChanged.subscribe(
      categories => {
        this.categories = this.getCategoriesByType(categories, this.categoriesService.type);
      }
    );
    this.userSubs = this.loginService.user.subscribe(user => {
      this.isLogin = !!user;
    })
  }

  onChangeType(type: string) {
    console.log(this.isLogin);
    this.categoriesService.type = type;
    this.type = 'By ' + type;
    this.categories = this.getCategoriesByType(this.categoriesService.getCategories(), type);
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
