import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

export const FETCH_CATEGORIES = '[Recipes] Fetch Categories';
export const SET_CATEGORIES = '[Recipes] Set Categories';
export const ADD_CATEGORY = '[Recipes] Add Category';
export const ADD_CATEGORY_SUCCESS = '[Recipes] Add Category Success';
export const EDIT_CATEGORY = '[Recipes] Edit Category';
export const EDIT_CATEGORY_SUCCESS = '[Categories] Edit Category Success';
export const DELETE_CATEGORY = '[Recipes] Delete Category';
export const DELETE_CATEGORY_SUCCESS = '[Categories] Delete Category Success';
export const EDITING_CATEGORY_FAIL = '[Categories] Editing Category Fail';
export const CLEAR_ERROR = '[Categories] Clear Error';

export const CHANGE_TYPE = '[Recipes] Change Type';

export class FetchCategories implements Action {
    readonly type = FETCH_CATEGORIES;
}

export class SetCategories implements Action {
    readonly type = SET_CATEGORIES;

    constructor(public payload: Category[]) {}
}

export class AddCategory implements Action {
    readonly type = ADD_CATEGORY;

    constructor(public payload: {name: string, type: string}) {}
}

export class AddCategorySuccess implements Action {
    readonly type = ADD_CATEGORY_SUCCESS;

    constructor(public payload: Category) {}
}

export class EditCategory implements Action {
    readonly type = EDIT_CATEGORY;

    constructor(public payload: Category) {}
}

export class EditCategorySuccess implements Action {
    readonly type = EDIT_CATEGORY_SUCCESS;

    constructor(public payload: Category) {}
}

export class DeleteCategory implements Action {
    readonly type = DELETE_CATEGORY;

    constructor(public payload: {id: number, type: string}) {}
}

export class DeleteCategorySuccess implements Action {
    readonly type = DELETE_CATEGORY_SUCCESS;

    constructor(public payload: {id: number, type: string}) {}
}

export class ChangeType implements Action {
    readonly type = CHANGE_TYPE;

    constructor(public payload: string) {}
}

export class EditingCategoryFail implements Action {
    readonly type = EDITING_CATEGORY_FAIL;

    constructor(public payload: string) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type CategoriesActions =
| FetchCategories
| SetCategories
| ChangeType
| AddCategory
| AddCategorySuccess
| EditCategory
| EditCategorySuccess
| DeleteCategory
| DeleteCategorySuccess
| EditingCategoryFail
| ClearError;