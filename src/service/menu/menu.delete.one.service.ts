import firebase from "firebase/app";
import "firebase/firestore";

export default async function deleteOneMenu(
  restaurantId: string,
  type: string,
  menuId: string
) {
  const firestore = firebase.firestore();
  await firestore
    .collection("restaurants")
    .doc(restaurantId)
    .collection(type)
    .doc(menuId)
    .update({published:'deleted'});
}
