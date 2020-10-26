import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DBService } from 'src/app/shared/db.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from '../categories.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  category: Category = new Category( '', 'Category');
  name: String;
  type: String;
  editMode = false;
  index: number;
  id;

  constructor(private dbService: DBService, private categoriesService: CategoriesService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.type = params['type'];
          this.index = +params['id'];
          this.category = this.categoriesService.getCategory(this.index, this.type);
          this.name = this.category.name;
        }
      }
    )
  }

  onSubmitForm(form: NgForm) {
    const value = form.value;
    this.editMode ? this.dbService.updateCategory(new Category(value.name, value.type), this.name) : this.dbService.saveCategory(new Category(value.name, value.type));
    setTimeout(() => { 
      this.dbService.fetchCategories().pipe(take(1)).subscribe(
        categories => {
          this.categoriesService.categoryChanged.next(categories);
        }
      );
     }, 1000);
     this.router.navigate(['/recipes']);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

}
