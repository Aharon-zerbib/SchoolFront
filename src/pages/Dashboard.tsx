import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  ChevronRight, 
  Calendar,
  GraduationCap,
  AlertCircle,
  Plus,
  HelpCircle
} from "lucide-react";

interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get<User>("/user");
        setUser(response.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  if (!user) return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 dark:border-zinc-50 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-sans text-slate-950 dark:text-zinc-50 transition-colors duration-300">
      
      {/* Sidebar Shadcn Style (Adaptive) */}
      <aside className="hidden w-64 bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800 md:flex flex-col">
        <div className="p-4 border-b border-slate-100 dark:border-zinc-900 mb-2">
            <div className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-zinc-900 cursor-pointer transition border border-transparent hover:border-slate-200 dark:hover:border-zinc-800">
            <img src="/tortue.svg" alt="GestionSchool" className="h-6 w-6 rounded" />
            <div className="flex-1 overflow-hidden">
               <p className="text-xs font-semibold truncate">GestionSchool Pro</p>
               <p className="text-[10px] text-slate-500 dark:text-zinc-500 truncate italic">Établissement Principal</p>
            </div>
            <ChevronRight size={14} className="text-slate-400 rotate-90" />
          </div>
        </div>

        <div className="flex-1 px-3 space-y-1 overflow-y-auto">
          <p className="px-3 py-2 text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest">Général</p>
          <button className="flex w-full items-center space-x-3 rounded-md bg-slate-100 dark:bg-zinc-900 px-3 py-2 text-slate-950 dark:text-zinc-50 font-medium transition text-sm">
            <LayoutDashboard size={16} /> <span>Dashboard</span>
          </button>
          <button className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-950 dark:hover:text-zinc-50 transition text-sm font-medium">
            <Users size={16} /> <span>Élèves</span>
          </button>
          <button className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-950 dark:hover:text-zinc-50 transition text-sm font-medium">
            <BookOpen size={16} /> <span>Classes</span>
          </button>
          
          <p className="px-3 py-2 text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest mt-6">Finance & RH</p>
          <button className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-950 dark:hover:text-zinc-50 transition text-sm font-medium">
            <CreditCard size={16} /> <span>Facturation</span>
          </button>
          <button className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-950 dark:hover:text-zinc-50 transition text-sm font-medium">
            <Calendar size={16} /> <span>Emplois du temps</span>
          </button>
        </div>

        <div className="p-3 space-y-1 border-t border-slate-100 dark:border-zinc-900">
          <button 
            onClick={() => navigate("/school/settings")}
            className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-950 dark:hover:text-zinc-50 transition text-sm font-medium"
          >
            <Settings size={16} /> <span>Paramètres</span>
          </button>
          <button className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-950 dark:hover:text-zinc-50 transition text-sm font-medium">
            <HelpCircle size={16} /> <span>Support</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition text-sm font-medium mt-4"
          >
            <LogOut size={16} /> <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar (Adaptive) */}
        <header className="h-14 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
          <div className="flex items-center space-x-4 overflow-hidden">
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-zinc-500 font-medium whitespace-nowrap">
              <span className="hidden sm:inline">GestionSchool</span>
              <ChevronRight size={14} className="text-slate-300 dark:text-zinc-700 hidden sm:block" />
              <span className="text-slate-950 dark:text-zinc-50 font-semibold truncate">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative group hidden sm:block">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={14} className="text-slate-400 dark:text-zinc-600" />
              </div>
              <input 
                type="text" 
                placeholder="Rechercher... (⌘+K)" 
                className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-md py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-zinc-700 w-64 transition-all"
              />
            </div>
            <button className="h-8 w-8 rounded-full border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition">
              <Bell size={16} />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-950 dark:bg-zinc-50 flex items-center justify-center text-white dark:text-zinc-950 text-[10px] font-bold">
               {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8 overflow-x-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Vue d'ensemble</h1>
              <p className="text-sm text-slate-500 dark:text-zinc-500">Gérez les opérations de votre établissement en temps réel.</p>
            </div>
            <button className="inline-flex items-center justify-center rounded-md bg-slate-950 dark:bg-zinc-50 px-4 py-2 text-sm font-medium text-slate-50 dark:text-zinc-950 shadow transition-colors hover:bg-slate-950/90 dark:hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950">
               <Plus size={16} className="mr-2" /> Nouvelle inscription
            </button>
          </div>

          {/* Stats Grid (Shadcn style cards Adaptive) */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Élèves Totaux", value: "1,284", icon: <Users size={14}/>, trend: "+20.1%", trendColor: "text-emerald-600" },
              { label: "Classes Actives", value: "42", icon: <GraduationCap size={14}/>, trend: "+2 nouvelles", trendColor: "text-emerald-600" },
              { label: "Revenus (Mensuel)", value: "15,231.89€", icon: <CreditCard size={14}/>, trend: "+12%", trendColor: "text-emerald-600" },
              { label: "Alertes système", value: "7", icon: <AlertCircle size={14}/>, trend: "3 critiques", trendColor: "text-red-600" }
            ].map((stat, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm transition-colors duration-300">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-xs font-semibold tracking-tight text-slate-500 dark:text-zinc-500 uppercase">{stat.label}</h3>
                  <div className="text-slate-400 dark:text-zinc-600">{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-[10px] ${stat.trendColor} mt-1 font-bold`}>
                  {stat.trend} <span className="text-slate-500 dark:text-zinc-600 font-medium ml-1">par rapport au mois dernier</span>
                </p>
              </div>
            ))}
          </div>

          {/* Activity Section (Data Table Look Adaptive) */}
          <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden transition-colors duration-300">
             <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-900 flex items-center justify-between bg-white dark:bg-zinc-950">
                <div>
                   <h3 className="text-sm font-semibold">Activités récentes</h3>
                   <p className="text-xs text-slate-500 dark:text-zinc-500">Historique des 48 dernières heures.</p>
                </div>
                <button className="text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-50 transition">Filtrer</button>
             </div>
             <div className="divide-y divide-slate-100 dark:divide-zinc-900">
                {[
                  { name: "Jean Dupont", action: "Nouvelle inscription - Classe 6ème A", status: "Inscrit", time: "2h", statusClass: "bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-300" },
                  { name: "Marie Curie", action: "Paiement reçu - Frais de scolarité T1", status: "Validé", time: "5h", statusClass: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400" }
                ].map((act, idx) => (
                  <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-900 transition group">
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-zinc-400 transition-colors">
                          {act.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold tracking-tight">{act.name}</p>
                          <p className="text-xs text-slate-500 dark:text-zinc-500">{act.action}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <div className="text-right hidden xs:block">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors ${act.statusClass}`}>
                            {act.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-zinc-600 font-medium whitespace-nowrap">Il y a {act.time}</p>
                    </div>
                  </div>
                ))}
             </div>
             <div className="px-6 py-3 bg-slate-50/50 dark:bg-zinc-900/50 border-t border-slate-100 dark:border-zinc-900 text-center">
                <button className="text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-50 transition">Voir toutes les activités</button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
