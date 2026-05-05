import { useState } from "react";
import { loginUser } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await loginUser(email, password);
      alert("Bienvenido");
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}