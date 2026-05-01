import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getProducts() {
  const q = query(
    collection(db, "products_store"),
    where("active", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}