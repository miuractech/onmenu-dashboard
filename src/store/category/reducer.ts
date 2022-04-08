import _ from "lodash";
import IAction from "../../types/action.type";
import ICategoryState from "./type";

const CategoryReducer = {
  setShowCategoryForm: (state: ICategoryState, action: IAction) => {
    state.showCategoryForm = action.payload;
  },
  setShowCategoryEditForm: (state: ICategoryState, action: IAction) => {
    state.showEditCategoryForm = action.payload;
  },
  setActiveCategory: (state: ICategoryState, action: IAction) => {
    state.activeCategory = action.payload;
  },
  setCategories: (state: ICategoryState, action: IAction) => {
    state.categories = action.payload;
  },
  editCategory: (state: ICategoryState, { type, payload }: IAction) => {
    const index = _.findIndex(
      state.categories,
      (categories) => categories.categoryId === payload.id
    );
    state.categories[index] = payload.editedCategory;
  },
  pubUnpubCategory: (state: ICategoryState, { type, payload }: IAction) => {
    const index = _.findIndex(
      state.categories,
      (categories) => categories.menuId === payload.id
    );
    state.categories[index].published = payload.published;
  },
};

export default CategoryReducer;
