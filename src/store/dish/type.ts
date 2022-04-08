export default interface IDishState {
  showDishForm: boolean;
  dishes: Array<IDish>;
}

export interface IDish {
  index: number | string;
  specialty_tags: string;
  type: string;
  dish_name: string;
  description: string;
  restaurant_id: string;
  menu_id: string;
  category_id: string;
  bestSeller: boolean;
  dish_id: string;
  published: boolean;
  food_variants: Array<any>;
  pictorial_description: Array<string>;
  price: number;
  images: Array<string>;
}
