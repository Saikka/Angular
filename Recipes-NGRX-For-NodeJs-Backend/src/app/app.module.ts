import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RecipesComponent } from './categories/categories-list.component';
import { CategoryComponent } from './categories/category/category.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesListComponent } from './categories/recipes-container/recipes-list/recipes-list.component';
import { RecipeComponent } from './categories/recipes-container/recipes-list/recipe/recipe.component';
import { RecipeDetailsComponent } from './categories/recipes-container/recipe-details/recipe-details.component';
import { RecipesContainerComponent } from './categories/recipes-container/recipes-container.component';
import { CategoryEditComponent } from './categories/category/category-edit/category-edit.component';
import { LoginComponent } from './login/login.component';
import { LoginEffects } from './login/store/login.effects';
import { CategoriesEffects } from './categories/store/categories.effects';
import { RecipesEffects } from './categories/recipes-container/store/recipes.effects';
import * as fromApp from './store/app.reducer';
import { RecipeEditComponent } from './categories/recipes-container/recipes-list/recipe-edit/recipe-edit.component';

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
    LoginComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([LoginEffects, CategoriesEffects, RecipesEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
