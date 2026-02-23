import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: any;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("test@example.com");
  const [password, setPassword] = useState<string>("password123");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950 font-sans selection:bg-blue-100 transition-colors duration-300">
      <div className="flex w-full">
        {/* Form Side */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:flex-none lg:px-24 xl:px-32">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="mb-10">
              <div className="flex items-center space-x-2 text-slate-950 dark:text-zinc-50 font-black text-xl mb-8">
                <div className="h-6 w-6 bg-slate-950 dark:bg-zinc-50 rounded flex items-center justify-center text-white dark:text-zinc-950 text-[10px]">GS</div>
                <span>GestionSchool</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-zinc-50">Content de vous revoir</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">Identifiez-vous pour accéder à votre console.</p>
            </div>

            <div className="mt-10">
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 dark:bg-red-950/20 p-3 text-xs font-medium text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-slate-950 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">Mot de passe</label>
                    <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-500">Oublié ?</a>
                  </div>
                  <input
                    type="password"
                    className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-slate-950 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-slate-950 dark:bg-zinc-50 px-4 py-2.5 text-sm font-bold text-white dark:text-zinc-950 shadow-sm hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all active:scale-[0.98]"
                >
                  Se connecter <ArrowRight size={16} className="ml-2" />
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium">
                  Pas encore de compte ? <Link to="/register" className="text-blue-600 hover:text-blue-500 font-bold transition">Créer un compte</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Side (Hidden on Mobile) */}
        <div className="relative hidden w-0 flex-1 lg:block bg-slate-50 dark:bg-zinc-900/50 border-l border-slate-100 dark:border-zinc-900 transition-colors">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
             <div className="h-16 w-16 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600 mb-8">
               <ShieldCheck size={32} />
             </div>
             <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-zinc-50 mb-4">Infrastructure Scolaire <br/> de Nouvelle Génération</h3>
             <p className="max-w-md text-slate-500 dark:text-zinc-500 font-medium leading-relaxed">
               GestionSchool assure la continuité pédagogique et administrative de plus de 2,500 établissements à travers le monde.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
