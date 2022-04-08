import firebase from "firebase/app";
import "firebase/firestore";

export default async function getResPartner(email: string) {
  const firestore = firebase.firestore();
  try{
    const query = await firestore
      .collection("roles")
      .where("email", "==", email)
      .get();
      return query.docs.map(doc => doc.data());
    // if (query.docs.length === 1) {
    // } else return {};
  }
  catch (err) {
    console.log(err);
    return []
    
  }
}
