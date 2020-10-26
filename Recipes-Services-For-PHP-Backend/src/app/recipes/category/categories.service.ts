import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({providedIn: 'root'})
export class CategoriesService {
    categories: Category[] = [];
    type: string = 'category';
    categoryChanged = new Subject<Category[]>();

    getCategories() {
        return this.categories;
    }

    setCategories(categories: Category[]){
        this.categories = categories;
        this.categoryChanged.next(this.categories);
    }

    getCategory(id: number, type: String) {
        const categories = this.categories.filter(category => {
            if (category.type === type) {
              return category;
            }
          });
        return categories[id];
    }
}