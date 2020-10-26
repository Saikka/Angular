import { Injectable } from "@angular/core";
import { Category } from '../../models/category.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DBService } from '../../shared/db.service';
import { CategoriesService } from './categories.service';

@Injectable({providedIn: 'root'})
export class CategoriesResolverService implements Resolve<Category[]> {
    constructor(private dbService: DBService, private categoriesService: CategoriesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const categories = this.categoriesService.getCategories();

        if (categories.length === 0) {
            return this.dbService.fetchCategories();
        }
        else {
            return categories;
        }
    }
}