// npm package direct imports
import React from "react";
import ReactDOM from "react-dom";

// styles imports
import "./index.css";

// components imports
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// firebase credentials
import firebaseConfig from "./constants/firebase.config";
import initializeFirebaseApp from "./service/utils/firebase.initialization";

// firebase initialization
initializeFirebaseApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
