import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { School, ArrowRight, Building2, Mail, MapPin, Phone, Hash } from "lucide-react";

const SetupSchool: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Rediriger si l'école est déjà configurée
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get("/user");
        if (response.data.school_id) {
          navigate("/dashboard");
        }
      } catch (err) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post("/school/setup", {
        name,
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        email,
        address,
        phone,
      });

      alert("Votre établissement a été configuré avec succès !");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de la configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans transition-colors duration-300">
      <div className="flex w-full">
        {/* Onboarding Form */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:flex-none lg:px-24 xl:px-32">
          <div className="mx-auto w-full max-w-sm lg:w-[450px]">
            <div className="mb-10">
              <div className="flex items-center space-x-2 text-slate-950 dark:text-zinc-50 font-black text-xl mb-8">
                <img src="/tortue.svg" alt="GestionSchool" className="h-6 w-6 rounded" />
                <span>GestionSchool</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-zinc-50">Configurons votre instance</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500 font-medium italic">Parlez-nous de votre établissement pour commencer.</p>
            </div>

            <form onSubmit={handleSetup} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-950/20 p-3 text-xs font-medium text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2">Nom de l'établissement</label>
                  <div className="relative group">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-zinc-600" />
                    <input
                      type="text"
                      className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-10 py-2 text-sm text-slate-950 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                      placeholder="Ex: École Saint-Louis"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2">Slug (URL)</label>
                  <div className="relative group">
                    <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-zinc-600" />
                    <input
                      type="text"
                      className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-10 py-2 text-sm text-slate-950 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                      placeholder="ecole-st-louis"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2">Email Ecole</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-zinc-600" />
                    <input
                      type="email"
                      className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-10 py-2 text-sm text-slate-950 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                      placeholder="contact@ecole.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2">Adresse physique</label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-zinc-600" />
                    <input
                      type="text"
                      className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-10 py-2 text-sm text-slate-950 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                      placeholder="12 rue de l'école, Paris"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2">Téléphone</label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-zinc-600" />
                    <input
                      type="tel"
                      className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-10 py-2 text-sm text-slate-950 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                      placeholder="+33 1 23 45 67 89"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-md bg-slate-950 dark:bg-zinc-50 px-4 py-3 text-sm font-bold text-white dark:text-zinc-950 shadow-sm hover:opacity-90 transition-all active:scale-[0.98] mt-6 disabled:opacity-50"
              >
                {loading ? "Déploiement en cours..." : "Créer mon établissement"} <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>

        {/* Visual Side (Hidden on Mobile) */}
        <div className="relative hidden w-0 flex-1 lg:block bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-900 transition-colors">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
             <div className="h-16 w-16 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600 mb-8">
               <School size={32} />
             </div>
             <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-zinc-50 mb-4 italic leading-tight">Chaque école mérite son excellence.</h3>
             <p className="max-w-md text-slate-500 dark:text-zinc-500 font-medium leading-relaxed">
               Vous êtes sur le point de créer un espace de travail dédié. Toutes vos données seront isolées et protégées pour garantir la confidentialité de vos élèves et parents.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupSchool;
