import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo-WQKAX6Hkz-fnxbd_sLgc-Ka4vcQgAg",
  authDomain: "agriconnect-ed8da.firebaseapp.com",
  projectId: "agriconnect-ed8da",
  storageBucket: "agriconnect-ed8da.firebasestorage.app",
  messagingSenderId: "112109774161",
  appId: "1:112109774161:web:4218752a48700ff4f2df70"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };
