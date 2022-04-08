import firebase from "firebase/app";
import "firebase/firestore";

async function fetchMenus(
  restaurantId: string,
  menuType: string
): Promise<Array<any>> {
  const firestore = firebase.firestore();
  try {
    const query = await firestore
      .collection("restaurants")
      .doc(restaurantId)
      .collection('menus')
      .where('type','==',menuType)
      .get();
    return query.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Something Went Wrong");
    return [];
  }
}

export default fetchMenus;
