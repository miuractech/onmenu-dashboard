import firebase from "firebase/app";
import "firebase/analytics";

import { IFirebaseConfig } from "../../types/firebase.config.type";

function initializeFirebaseApp(firebaseConfig: IFirebaseConfig): void {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

export default initializeFirebaseApp;
