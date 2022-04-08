import firebase from "firebase/app";
import "firebase/firestore";

async function updateOneCategory(
  document: any,
  restaurantId: string,
  menuId: string,
  categoryId: string
) {
  const firestore = firebase.firestore();

  try {
    await firestore
      .collection("restaurants")
      .doc(restaurantId)
      .collection('categories')
      .doc(categoryId)
      .update(document);
    window.location.reload()
  } catch (error) {
    console.error(error);
  }
}

export default updateOneCategory;
