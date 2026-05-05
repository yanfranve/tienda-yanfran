import { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await registerUser(email, password, name);
      alert("Usuario creado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al crear usuario");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Registro</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}