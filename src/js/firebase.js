import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAn0sm-INF40AdMDI1gdDxl9RMYEBu-RjY',
  authDomain: 'slack-clone-bc6c2.firebaseapp.com',
  projectId: 'slack-clone-bc6c2',
  storageBucket: 'slack-clone-bc6c2.appspot.com',
  messagingSenderId: '976255946391',
  appId: '1:976255946391:web:e742bcbfe20807cd6be3d2',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
