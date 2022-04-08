import { useDispatch } from "react-redux";

import addOneDish from "../../../service/dish/dish.add.one.service";
import serializeVariant from "../../../service/utils/serialize.variant";
import { setAddDish } from "../../../store/dish/slice";

export default function useAddDish() {
  const dispatch = useDispatch();

  async function addDish(
    restaurantId: string,
    menuId: string,
    categoryId: string,
    type:string,
    dishId: string,
    payload: any,
    editMode:boolean,
  ) {
    const food_variants = Object.keys(payload.food_variants).map(key =>({
      food_preference:key,
      price:payload.food_variants[key]
    }))
    const document = {
      restaurant_id: restaurantId,
      menu_id: menuId,
      category_id: categoryId,
      dish_id: dishId,
      dish_name: payload.dish_name,
      description: payload.description,
      images: payload.images,
      specialty_tags: payload.specialty_tags,
      pictorial_description: payload.pictorialDescription,
      food_variants: food_variants,
      type,
      options:payload.options,
      addons:payload.addons,
      quantity:payload.quantity,
      search_tags:payload.search_tags,
      recommendation:payload.recommendation,
      packingCharge:payload.packingCharge?parseFloat(payload.packingCharge):0,
      // price: payload.price,
      // bestseller: true,
      published: true,
      index:payload.index,
    };

    await addOneDish(
      restaurantId, 
      menuId, 
      type,
      dishId, 
      document
      );
      if(!editMode){
        dispatch(setAddDish(document));
      }
  }
  return { addDish };
}
