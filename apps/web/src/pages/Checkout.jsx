import { useState } from "react";
import { registerUser } from "../services/authService";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

const auth = getAuth();

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 👉 Simulación de carrito (luego lo conectamos real)
  const cartItems = [
    {
      productId: "prod1",
      name: "Producto ejemplo",
      price: 10000,
      quantity: 1
    }
  ];

  async function handleCheckout(e) {
    e.preventDefault();

    let user = auth.currentUser;

    try {
      // 🔥 si no está logueado → crear cuenta
      if (!user) {
        const newUser = await registerUser(email, password, name);
        user = newUser;
      }

      // 👉 crear orden
      await addDoc(collection(db, "orders_delivery"), {
        userId: user.uid,
        items: cartItems,
        status: "pending",
        createdAt: new Date()
      });

      alert("Compra realizada");

    } catch (error) {
      console.error(error);
      alert("Error en la compra");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>

      <form onSubmit={handleCheckout}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Finalizar compra</button>
      </form>
    </div>
  );
}