import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

async function registerUser(email: string, password: string,setError:any,clearErrors:any) {
  const firestore = firebase.firestore();
  const auth = firebase.auth();

  try {
  const query = await firestore
    .collection("roles")
    .where("email", "==", email)
    // .where("registered", "==", false)
    // .where("role", "==", "admin")
    .get();

  if (query.docs.length === 1) {
    const docId = query.docs[0].id;

      await auth.createUserWithEmailAndPassword(email, password);
      await firestore.collection("roles").doc(docId).update({
        registered: true,
      });
    }
  }
  catch (error) {
    setError('password',{
      type: 'manual', 
      // @ts-ignore: Unreachable code error
      message: error.message
    })
   console.error(error);
 }
}

export default registerUser;
