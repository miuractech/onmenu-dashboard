import firebase from "firebase/app";
import "firebase/auth";
import { setAuthPageToggle } from "../../store/user/slice";

export default async function login(email: string, password: string, setError: any) {
  const auth = firebase.auth();
  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.replace("/");
  } catch (error) {
    // dispatch(setAuthPageToggle(true))
    setError('login',{
      type: 'password', 
      // @ts-ignore: Unreachable code error
      message: error.message
    })
    console.error(error);
    
  }
}
