import firebase from "firebase/app";
import "firebase/firestore";

async function addNewMenu(
  restaurantId: string,
  menuType: string,
  menuId: string,
  payload: any
) {
  const firestore = firebase.firestore();
  try {
    await firestore
      .collection("restaurants")
      .doc(restaurantId)
      .collection('menus')
      .doc(menuId)
      .set(payload);
      // .set({...payload,timing:JSON.stringify(payload.timing)});
      window.location.reload()
  } catch (error) {
    console.error(error);
  }
}

export default addNewMenu;
