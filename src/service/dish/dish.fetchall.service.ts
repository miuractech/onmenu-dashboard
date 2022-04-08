import firebase from "firebase/app";
import "firebase/firestore";

async function fetchDishes(
  restaurantId: string,
  categoryId: string,
  type:string,
  menuId: string,
): Promise<Array<any>> {
  const firestore = firebase.firestore();
  try {
    const query = await firestore
      .collection("dishes")
      .doc(restaurantId)
      .collection(type)
      // .where("categoryId", "==", categoryId)
      .where("category_id", "==", categoryId)
      .get();
    return query.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchDishes;
