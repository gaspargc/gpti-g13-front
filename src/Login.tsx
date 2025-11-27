import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        setError("Credenciales inválidas");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("LOGIN OK:", data);

      // Guardar user_id
      localStorage.setItem("user_id", data.user_id);

      // Redirigir a new_menu
      navigate("/new_menu");

    } catch (err) {
      console.error("Error al conectar al backend:", err);
      setError("Error de conexión");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-2xl font-semibold text-emerald-600">Menux</h1>

          <div className="flex items-center gap-4">
            <a
              href="/register"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
            >
              Registrarse
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

          <h2 className="text-3xl font-bold text-center mb-6">
            Iniciar sesión
          </h2>

          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Correo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl shadow-md text-lg font-medium transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="text-center mt-6 text-gray-600">
            <p>
              ¿No tienes cuenta?{" "}
              <a
                href="/register"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Menux
      </footer>
    </div>
  );
};

export default Login;
