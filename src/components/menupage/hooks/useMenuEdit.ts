import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import updateOneMenu from "../../../service/menu/menu.update.one.service";
import uploadImageToFirebaseStorage from "../../../service/utils/upload.image";
import { editMenu, pubUnpubMenu } from "../../../store/menu/slice";
import { RootState } from "../../../store/store.root";

export default function useMenuEdit() {
  const [successMessage, setSuccessMessage] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const [imageUrl, setImageUrl] = React.useState("");
  
  const selectedMenuDetails = _.find(
    state.menu.menus,
    (e) => e.menuId === state.menu.activeMenu
  );

  const Monday = selectedMenuDetails?.timing.Monday;
  const Tuesday = selectedMenuDetails?.timing.Tuesday;
  const Wednesday = selectedMenuDetails?.timing.Wednesday;
  const Thursday = selectedMenuDetails?.timing.Thurday;
  const Friday = selectedMenuDetails?.timing.Friday;
  const Saturday = selectedMenuDetails?.timing.Saturday;
  const Sunday = selectedMenuDetails?.timing.Sunday;

  async function onSubmit(payload: any) {
    // const payload = {
    //   ...data,
    //   // image: imageUrl.length > 0 ? imageUrl : selectedMenuDetails?.image,
    // };
    const document = {
      name: payload.menuName,
      type: state.menu.activeMenuType,
      menuId: state.menu.activeMenu,
      restaurantId: state.restaurant.restaurantId,
      published: payload.published?payload.published:false,
      index:payload.index,
      // image: payload.image,
      timing: {
        Monday: payload.timing.Monday,
        Tuesday: payload.timing.Tuesday,
        Wednesday: payload.timing.Wednesday,
        Thursday: payload.timing.Thursday,
        Friday: payload.timing.Friday,
        Saturday: payload.timing.Saturday,
        Sunday: payload.timing.Sunday,
      },
      description: payload.description,
    };
    // console.log('document',document);
    try {
      await updateOneMenu(
        state.restaurant.restaurantId,
        state.menu.activeMenuType,
        state.menu.activeMenu,
        document
      );
    } catch (error) {
      // console.log(error);
      
    }
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
    dispatch(editMenu({ id: state.menu.activeMenu, editedMenu: document }));
    window.location.reload()
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const res = await uploadImageToFirebaseStorage("menus-images", file);
      setImageUrl(res);
    }
  }

  async function unpublishOrPublishMenu() {
    if (selectedMenuDetails !== undefined) {
      const doc = {
        published: (!selectedMenuDetails.published || selectedMenuDetails.published ==='created')?true:false,
      };
      await updateOneMenu(
        selectedMenuDetails.restaurantId,
        selectedMenuDetails.type,
        selectedMenuDetails.menuId,
        doc
      );
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
      dispatch(
        pubUnpubMenu({
          id: selectedMenuDetails.menuId,
          published: !selectedMenuDetails.published,
        })
      );
      window.location.reload()
    }
  }
  async function deleteMenu() {
    if (selectedMenuDetails !== undefined) {
      const doc = {
        published: 'deleted',
      };
      await updateOneMenu(
        selectedMenuDetails.restaurantId,
        selectedMenuDetails.type,
        selectedMenuDetails.menuId,
        doc
      );
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
      dispatch(
        pubUnpubMenu({
          id: selectedMenuDetails.menuId,
          published: 'deleted',
        })
      );
      window.location.reload()
    }
  }

  return {
    onSubmit,
    handleChange,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
    selectedMenuDetails,
    unpublishOrPublishMenu,
    successMessage,
    deleteMenu
  };
}
