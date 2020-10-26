import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';
import { CategoriesResolverService } from './recipes/category/categories-resolver.service';
import { RecipesListComponent } from './recipes/recipes-container/recipes-list/recipes-list.component';
import { RecipesResolverService } from './recipes/recipes-container/recipes-resolver.service';
import { RecipeDetailsComponent } from './recipes/recipes-container/recipe-details/recipe-details.component';
import { RecipesContainerComponent } from './recipes/recipes-container/recipes-container.component';
import { CategoryEditComponent } from './recipes/category/category-edit/category-edit.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'recipes', component: RecipesComponent,
        resolve: [CategoriesResolverService, RecipesResolverService],
        children: [
            {path: 'category/new', component: CategoryEditComponent, canActivate: [LoginGuard]},
            {path: 'search/:value', component: RecipesContainerComponent, children:
                [
                    {path: '', component: RecipesListComponent},
                    {path: ':id', component: RecipeDetailsComponent}
                ]
            },
            {path: ':type/:id', component: RecipesContainerComponent, 
                children: 
                [
                    {path: '', component: RecipesListComponent},
                    {path: 'edit', component: CategoryEditComponent, canActivate: [LoginGuard]},
                    {path: ':id', component: RecipeDetailsComponent}
                ]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}