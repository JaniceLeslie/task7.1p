import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export const signUpEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInGoogle = () => signInWithPopup(auth, googleProvider);

export const logOut = () => signOut(auth);
