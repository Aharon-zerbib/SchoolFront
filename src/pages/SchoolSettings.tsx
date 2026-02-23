import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Building2, Mail, MapPin, Phone, Save, ArrowLeft, Loader2 } from "lucide-react";

interface SchoolData {
  name: string;
  email: string;
  address: string;
  phone: string;
  slug: string;
}

const SchoolSettings: React.FC = () => {
  const [formData, setFormData] = useState<SchoolData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    slug: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const response = await api.get("/school");
        setFormData(response.data);
      } catch (err) {
        console.error("Erreur de récupération", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchool();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await api.put("/school/update", formData);
      setMessage({ type: "success", text: "Les informations ont été mises à jour." });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Erreur de mise à jour." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-zinc-950">
      <Loader2 className="h-6 w-6 animate-spin text-slate-900 dark:text-zinc-50" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-sans text-slate-950 dark:text-zinc-50 p-6 md:p-12 transition-colors">
      <div className="mx-auto max-w-2xl">
        <button 
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center text-sm font-medium text-slate-500 hover:text-slate-950 dark:text-zinc-500 dark:hover:text-zinc-50 transition"
        >
          <ArrowLeft size={16} className="mr-2" /> Retour au Dashboard
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Paramètres de l'établissement</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-500 mt-2">Gérez les informations publiques et administratives de votre instance.</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-sm">
          <form onSubmit={handleUpdate} className="space-y-6">
            {message && (
              <div className={`rounded-md p-4 text-sm font-medium border ${
                message.type === "success" 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50" 
                  : "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50"
              }`}>
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2">Nom de l'école</label>
                <div className="relative group">
                  <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-zinc-600" />
                  <input
                    type="text"
                    className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2">Adresse</label>
                <div className="relative group">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-zinc-600" />
                  <input
                    type="text"
                    className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                    value={formData.address || ""}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2">Téléphone</label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-zinc-600" />
                  <input
                    type="tel"
                    className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-600 transition-all"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Slug (lecture seule car changer le slug est complexe) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2 opacity-50">Slug de l'instance (Définitif)</label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-2 text-sm text-slate-400 dark:text-zinc-600 cursor-not-allowed"
                    value={formData.slug}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-zinc-900 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center rounded-md bg-slate-950 dark:bg-zinc-50 px-6 py-2.5 text-sm font-bold text-white dark:text-zinc-950 shadow hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchoolSettings;
