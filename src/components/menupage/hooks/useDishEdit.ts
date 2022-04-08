import React from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteOneDish from "../../../service/dish/dish.delete.one.service";

import updateOneDish from "../../../service/dish/dish.update.one.service";
import { setDeleteDish, setPublishDish } from "../../../store/dish/slice";
import { RootState } from "../../../store/store.root";

export default function useDishEdit(dishId: string) {
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [deleteMessage, setDeleteMessage] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const findDish = state.dish.dishes.find((dish) => dish.dish_id === dishId);

  async function pubOrUnpubDish() {
    if (findDish !== undefined) {
      await updateOneDish(
        findDish.restaurant_id,
        findDish.type,
        findDish.dish_id,
        {
          published: !findDish.published,
        }
      );
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
      dispatch(
        setPublishDish({
          dishId: findDish.dish_id,
          published: !findDish.published,
        })
      );
    }
  }

  async function deleteDish() {
    if (findDish !== undefined) {
      await deleteOneDish(
        findDish.restaurant_id,
        findDish.type,
        findDish.dish_id
      );
    }
    setDeleteMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      dispatch(setDeleteDish({ dishId: findDish?.dish_id }));
    }, 1000);
  }

  return { pubOrUnpubDish, deleteDish, successMessage, deleteMessage };
}
