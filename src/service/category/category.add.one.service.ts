import firebase from "firebase/app";
import "firebase/firestore";

async function addCategory(
  payload: any,
  restaurantId: string,
  menuId: string,
  categoryId: string
) {
  const firestore = firebase.firestore();
  const document = {
    name: payload.categoryName,
    description: payload.description,
    tax: payload.tax,
    restaurantId: restaurantId,
    menuId: menuId,
    categoryId: categoryId,
    image:payload.image,
    index:payload.index,
    published:false
  };
  
  try {
    await firestore
    .collection("restaurants")
    .doc(restaurantId)
    .collection('categories')
    .doc(categoryId)
    .set(document);
    window.location.reload()
  } catch (error) {
    console.log(error);
  }
  
}

export default addCategory;
