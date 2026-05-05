import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthChange, logoutUser } from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Yanfran
      </h2>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>{user.email}</span>
            <button onClick={logoutUser}>Cerrar sesión</button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
        )}
      </div>
    </div>
  );
}