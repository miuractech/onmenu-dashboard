import firebase from "firebase/app";
import "firebase/firestore";

async function fetchRestaurantInfoService(
  restaurantId: string
): Promise<Object> {
  const firestore = firebase.firestore();
  let restaurantInfo:any = {};
  let menus:any = []
  let categories:any = []
  try {
    const query = await firestore
      .collection("restaurants")
      .doc(restaurantId)
      .get();

    if (query.exists) {
      restaurantInfo = query.data();
      const menusnap = await firestore
      .collection("restaurants")
      .doc(restaurantId)
      .collection('menus')
      .get();
      
      if(!menusnap.empty){
        menusnap.forEach(doc=>{
          menus.push(doc.data())
        })
      }
      const categorySnap = await firestore
      .collection("restaurants")
      .doc(restaurantId)
      .collection('categories')
      .get();
      
      if(!categorySnap.empty){
        categorySnap.forEach(doc=>{
          categories.push(doc.data())
        })
      }
      return {...restaurantInfo,menus,categories};
    }
    else return {...restaurantInfo,menus,categories};
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default fetchRestaurantInfoService;
