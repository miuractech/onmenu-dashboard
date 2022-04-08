import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import addNewMenu from "../../../service/menu/menu.add.one.service";
import uploadImageToFirebaseStorage from "../../../service/utils/upload.image";
import { addMenu } from "../../../store/menu/slice";
import { RootState } from "../../../store/store.root";

export default function useAddMenu() {
  const [successMessage, setSuccessMessage] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const [imageUrl, setImageUrl] = React.useState("");

  async function onSubmit(data: any) {
    const payload = { ...data, image: imageUrl };
    const menuId = uuidv4();
    const document = {
      name: payload.menuName,
      type: state.menu.activeMenuType,
      menuId: menuId,
      restaurantId: state.restaurant.restaurantId,
      published: 'created',
      timing: {
        Monday: payload.Monday,
        Tuesday: payload.Tuesday,
        Wednesday: payload.Wednesday,
        Thursday: payload.Thursday,
        Friday: payload.Friday,
        Saturday: payload.Saturday,
        Sunday: payload.Sunday,
      },
      description: payload.description,
      index:payload.index,
    };
    await addNewMenu(
      state.restaurant.restaurantId,
      state.menu.activeMenuType,
      menuId,
      document
    );
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
    dispatch(addMenu(document));
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const res = await uploadImageToFirebaseStorage("menus-images", file);
      setImageUrl(res);
    }
  }

  return { handleChange, onSubmit };
}
