import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { DBService } from 'src/app/shared/db.service';
import { Category } from 'src/app/models/category.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  @Input() index: number;
  @Input() isEdit: boolean;
  type: string;
  recipes: Recipe[] = [];
  isOpen = false;
  constructor(private categoriesService: CategoriesService, private dbService: DBService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.type = this.categoriesService.type;
  }

  onEdit() {
    this.router.navigate([this.category.type, this.index, 'edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.dbService.deleteCategory(this.category);
    setTimeout(() => { 
      this.dbService.fetchCategories().pipe(take(1)).subscribe(
        categories => {
          this.categoriesService.categoryChanged.next(categories);
        }
      );
     }, 1000);
     this.router.navigate(['/recipes']);
  }

}
