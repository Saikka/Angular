import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './recipes/category/category.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesListComponent } from './recipes/recipes-container/recipes-list/recipes-list.component';
import { RecipeComponent } from './recipes/recipes-container/recipes-list/recipe/recipe.component';
import { RecipeDetailsComponent } from './recipes/recipes-container/recipe-details/recipe-details.component';
import { RecipesContainerComponent } from './recipes/recipes-container/recipes-container.component';
import { CategoryEditComponent } from './recipes/category/category-edit/category-edit.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    CategoryComponent,
    HeaderComponent,
    RecipesListComponent,
    RecipeComponent,
    RecipeDetailsComponent,
    RecipesContainerComponent,
    CategoryEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
