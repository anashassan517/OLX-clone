import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGSwsYTeyhObirzl8aBnmSfD1MLM36wrg",
  authDomain: "olx-clone-50038.firebaseapp.com",
  projectId: "olx-clone-50038",
  storageBucket: "olx-clone-50038.appspot.com",
  messagingSenderId: "883603681634",
  appId: "1:883603681634:web:531be47475ca2e646d7c3b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, googleProvider, facebookProvider, signInWithPopup, db, storage };
