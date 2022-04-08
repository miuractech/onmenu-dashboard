import firebase from "firebase/app";
import "firebase/firestore";

async function addOneDish(
  restaurantId: string,
  menuId: string,
  type:string,
  dishId: string,
  document: any
) {
  const firestore = firebase.firestore();

  await firestore
    .collection("dishes")
    .doc(restaurantId)
    .collection(type)
    .doc(dishId)
    .set(document);
    window.location.reload();
}

export default addOneDish;
