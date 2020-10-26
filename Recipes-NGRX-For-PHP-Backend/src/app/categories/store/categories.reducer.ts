import * as CategoriesActions from './categories.actions';
import { Category } from 'src/app/models/category.model';

export interface State {
  categories: Category[];
  type: string;
  error: string;
}

const initialState: State = {
  categories: [],
  type: 'category',
  error: null,
};

export function categoriesReducer(
  state = initialState,
  action: CategoriesActions.CategoriesActions
) {
  switch (action.type) {
    case CategoriesActions.SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
        error: null,
      };
    case CategoriesActions.CHANGE_TYPE:
      return {
        ...state,
        type: action.payload,
        error: null,
      };
    case CategoriesActions.ADD_CATEGORY:
    case CategoriesActions.EDIT_CATEGORY:
    case CategoriesActions.DELETE_CATEGORY:
      return {
        ...state,
        error: null,
      };
    case CategoriesActions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        error: null,
      };
    case CategoriesActions.EDIT_CATEGORY_SUCCESS:
      var id = -1;
      const editedCategory = {
        ...state.categories.find((cat, index) => {
          if (
            cat.type === action.payload.type &&
            cat.id === action.payload.id
          ) {
            id = index;
            return cat;
          }
        }),
        ...action.payload,
      };
      const editedCategories = [...state.categories];
      editedCategories[id] = editedCategory;
      return {
        ...state,
        categories: editedCategories,
        error: null,
      };
    case CategoriesActions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter((cat) => {
          if (cat.type == action.payload.type) {
            return cat.id !== action.payload.id;
          } else {
            return cat;
          }
        }),
        error: null,
      };
    case CategoriesActions.EDITING_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CategoriesActions.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
