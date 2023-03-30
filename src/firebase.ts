import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import storage from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuXY4rfcY_rraGHKIafQEfX3r7A-19GEU",
  authDomain: "fire-note-16e1e.firebaseapp.com",
  projectId: "fire-note-16e1e",
  storageBucket: "fire-note-16e1e.appspot.com",
  messagingSenderId: "691716150704",
  appId: "1:691716150704:web:fd68eaefed7434b2a9b275"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
// const storage = storage();
const provider = new GoogleAuthProvider();

export { db, auth, provider};