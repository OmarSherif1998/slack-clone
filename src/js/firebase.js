import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCykhxWflcfHQk9RdemTdb-nivdI8Bx-qI",
  authDomain: "slack-clone-d42e5.firebaseapp.com",
  projectId: "slack-clone-d42e5",
  storageBucket: "slack-clone-d42e5.appspot.com",
  messagingSenderId: "154984612823",
  appId: "1:154984612823:web:e56f30cd800d69c4158192"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
