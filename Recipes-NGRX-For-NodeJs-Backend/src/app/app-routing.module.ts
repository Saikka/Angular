import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './categories/categories-list.component';
import { CategoriesResolverService } from './categories/categories-resolver.service';
import { RecipesListComponent } from './categories/recipes-container/recipes-list/recipes-list.component';
import { RecipesResolverService } from './categories/recipes-container/recipes-resolver.service';
import { RecipeDetailsComponent } from './categories/recipes-container/recipe-details/recipe-details.component';
import { RecipesContainerComponent } from './categories/recipes-container/recipes-container.component';
import { CategoryEditComponent } from './categories/category/category-edit/category-edit.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { RecipeEditComponent } from './categories/recipes-container/recipes-list/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'auth/:loginorsignup', component: LoginComponent},
    {path: 'recipes', component: RecipesComponent,
        resolve: [CategoriesResolverService, RecipesResolverService],
        children: [
            {path: 'all', component: RecipesContainerComponent,
                children: [
                    {path: '', component: RecipesListComponent},
                    {path: 'recipe/:id', component: RecipeDetailsComponent},
                    {path: 'recipe/:id/edit', component: RecipeEditComponent}
                ]
            },
            {path: 'category/new', component: CategoryEditComponent, canActivate: [LoginGuard]},
            {path: 'search/:value', component: RecipesContainerComponent, children:
                [
                    {path: '', component: RecipesListComponent},
                    {path: ':id', component: RecipeDetailsComponent}
                ]
            },
            {path: 'recipe', component: RecipesContainerComponent,
                children: [
                    {path: 'new', component: RecipeEditComponent},
                ]
            },
            {path: ':type/:id', component: RecipesContainerComponent, 
                children: 
                [
                    {path: '', component: RecipesListComponent},
                    {path: 'edit', component: CategoryEditComponent/*, canActivate: [LoginGuard]*/},
                    {path: 'recipe/:id', component: RecipeDetailsComponent}
                ]
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}