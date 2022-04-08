import firebase from "firebase/app";
import "firebase/auth";


async function logout() {
  
  
  const auth = firebase.auth();
  await auth.signOut();
  window.location.replace("/");
}

export default logout;
