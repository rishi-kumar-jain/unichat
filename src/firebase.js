import firebase from "firebase/app";
import "firebase/auth";


export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBm2OB1J9JwaZdONYcaqscemUVCj48JB44",
  authDomain: "uni-chat-d163d.firebaseapp.com",
  databaseURL: "https://uni-chat-d163d-default-rtdb.firebaseio.com",
  projectId: "uni-chat-d163d",
  storageBucket: "uni-chat-d163d.appspot.com",
  messagingSenderId: "923968702592",
  appId: "1:923968702592:web:c7390713d6da05bd7e3e65"
}).auth()


