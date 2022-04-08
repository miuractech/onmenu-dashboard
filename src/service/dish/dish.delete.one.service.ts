import firebase from "firebase/app";
import "firebase/firestore";

export default async function deleteOneDish(
  restaurantId: string,
  type: string,
  dishId: string
) {
  const firestore = firebase.firestore();
  await firestore
    .collection("dishes")
    .doc(restaurantId)
    .collection(type)
    .doc(dishId)
    .update({published:'deleted'});
}
