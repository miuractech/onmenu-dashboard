import firebase from "firebase/app";
import "firebase/firestore";

export default async function updateOneDish(
  restaurantId: string,
  menuId: string,
  dishId: string,
  payload: any
) {
  const firestore = firebase.firestore();
  try{
    await firestore
      .collection("dishes")
      .doc(restaurantId)
      .collection(menuId)
      .doc(dishId)
      .update(payload);
      window.location.reload();
    }
    catch (err) {
      console.log(err);
      
    }
} 
