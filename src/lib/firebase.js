import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqx3llBMOgp75yvFr-BT-dYjFwiXKcluk",
  authDomain: "p-fffd6.firebaseapp.com",
  projectId: "p-fffd6",
  appId: "1:827151849413:web:1024fba04c44d0e6edddac",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };