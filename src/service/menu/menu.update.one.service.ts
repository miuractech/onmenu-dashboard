import firebase from "firebase/app";
import "firebase/firestore";

async function updateOneMenu(
  restaurantId: string,
  menuType: string,
  menuId: string,
  document: any
) {
  const firestore = firebase.firestore();

  try {
    await firestore
      .collection("restaurants")
      .doc(restaurantId)
      .collection('menus')
      .doc(menuId)
      .update(document);
  } catch (error) {
    console.error(error);
  }
}

export default updateOneMenu;
