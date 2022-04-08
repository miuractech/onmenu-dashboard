import addCategory from '../../../service/category/category.add.one.service';
import { v4 as uuidv4 } from "uuid";
import {  useSelector } from "react-redux";
// types imports
import { RootState } from "../../../store/store.root";

export default function useAddCategory(){
  const state = useSelector((state: RootState) => state);  
  
  async function onSubmit(data:any) {
    
    addCategory(
      data,
      state.restaurant.restaurantId,
      state.menu.activeMenu,
      uuidv4()
      );
    
  }
  return { onSubmit };
}

