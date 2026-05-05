import { getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const auth = getAuth();


// 🔹 REGISTRO (crear usuario + guardar en Firestore)
export async function registerUser(email, password, name) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    role: "customer",
    modules: {
      store: true,
      delivery: false,
      credit: true
    },
    permissions: {
      manageProducts: false,
      manageUsers: false
    },
    subscription: {
      plan: "free",
      active: true
    },
    createdAt: new Date()
  });

  return user;
}


// 🔹 LOGIN
export async function loginUser(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}


// 🔹 LOGOUT
export async function logoutUser() {
  await signOut(auth);
}


// 🔹 USUARIO ACTUAL (Auth)
export function getCurrentUser() {
  return auth.currentUser;
}


// 🔹 ESCUCHAR SESIÓN (IMPORTANTE 🔥)
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}


// 🔹 OBTENER DATOS DEL USUARIO (Firestore)
export async function getUserData(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  } else {
    return null;
  }
}