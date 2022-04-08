export default interface ICategoryState {
  showCategoryForm: boolean;
  showEditCategoryForm: boolean;
  activeCategory: string;
  categories: Array<ICategory>;
}

export interface ICategory {
  index: string| number;
  name: string;
  tax: number;
  categoryId: string;
  description: string;
  menuId: string;
  restaurantId: string;
  published: boolean;
  image:string;
}
