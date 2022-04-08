import firebase from "firebase/app";
import "firebase/firestore";

async function fetchCategories(
  menuId: string,
  restaurantId: string
): Promise<Array<any>> {
  const firestore = firebase.firestore();
  try {
    const query = await firestore
      .collection("restaurants")
      .doc(restaurantId)
      .collection('categories')
      .where('menuId','==',menuId)
      .orderBy('index','asc')
      .get();
    return query.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchCategories;
