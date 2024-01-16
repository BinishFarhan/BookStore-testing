import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, deleteUser, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push, set , onValue} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSr314L11m99t26CYzEpTkzOwOfVUTOGQ",
  authDomain: "xyzabc-3862d.firebaseapp.com",
  projectId: "xyzabc-3862d",
  storageBucket: "xyzabc-3862d.appspot.com",
  messagingSenderId: "366776082884",
  appId: "1:366776082884:web:ef61e6ae60893631ec0491",
  databaseURL: "https://xyzabc-3862d-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)

export {
  getAuth,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser,
  signOut,
  database,
  ref,
  push,
  set,
  onValue
}