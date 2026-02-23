import React, { useState } from "react";
import api from "../api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("test@example.com");
  const [password, setPassword] = useState<string>("password123");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      const { access_token, user } = response.data;

      // Stocker le token
      localStorage.setItem("token", access_token);
      setUser(user);
      
      alert("Connexion réussie !");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur de connexion");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("token");
      setUser(null);
      alert("Déconnecté !");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Connexion à GestionSchool
        </h2>

        {user ? (
          <div className="text-center">
            <p className="mb-4 text-green-600 font-medium">Bonjour, {user.name} !</p>
            <button
              onClick={handleLogout}
              className="w-full rounded-md bg-red-500 py-2 text-white hover:bg-red-600 transition"
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-100 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition"
            >
              Se connecter
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
