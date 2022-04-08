import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store.root";
import _ from "lodash";
import React from "react";
import updateOneCategory from "../../../service/category/category.update.one.service";
import { editCategory, pubUnpubCategory } from "../../../store/category/slice";

export default function useCategoryEdit(){
  const [successMessage, setSuccessMessage] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);  
  const selectedCategoryDetails = _.find(
    state.category.categories,
    (e) => e.categoryId === state.category.activeCategory
  );
 
  
  async function onSubmit(data:any) {
    const payload={...data};
    
    const document = {
      name:payload.categoryName,
      description:payload.description,
      tax:payload.tax,
      image:payload.image,
      index:payload.index,
    };
    
    await updateOneCategory(
      document,
      state.restaurant.restaurantId,
      state.menu.activeMenu,
      state.category.activeCategory
      );
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
    dispatch(editCategory({ id: state.category.activeCategory, editedCategory: document }));
  }
  async function unpublishOrPublishCategory() {
    if (selectedCategoryDetails !== undefined) {
      const doc = {
        published: !selectedCategoryDetails.published,
      };
      await updateOneCategory(
        doc,
        selectedCategoryDetails.restaurantId,
        selectedCategoryDetails.menuId,
        selectedCategoryDetails.categoryId,
      );
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
      dispatch(
        pubUnpubCategory({
          id: selectedCategoryDetails.menuId,
          published: !selectedCategoryDetails.published,
        })
      );
    }
  }

  return { onSubmit,selectedCategoryDetails,successMessage,unpublishOrPublishCategory};
}