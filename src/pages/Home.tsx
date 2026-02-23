import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, ShieldCheck, Zap, Globe, LayoutDashboard } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans text-slate-950 dark:text-zinc-50 selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
      
      {/* Background Grid Pattern (Vercel Style) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-radial-at-t from-blue-50/20 dark:from-blue-900/10 via-transparent to-transparent"></div>
      </div>

      {/* Nav Pro */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl px-6 py-4 flex items-center justify-between transition-colors">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-slate-950 dark:bg-zinc-50 rounded flex items-center justify-center text-white dark:text-zinc-950 font-black text-[10px]">GS</div>
          <span className="text-lg font-bold tracking-tighter">GestionSchool</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-sm font-medium text-slate-500 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-50 transition">Connexion</Link>
          <Link 
            to="/register" 
            className="rounded-full bg-slate-950 dark:bg-zinc-50 px-5 py-2 text-sm font-bold text-white dark:text-zinc-950 shadow-sm hover:opacity-90 transition active:scale-95"
          >
            Déployer
          </Link>
        </div>
      </nav>

      {/* Hero SaaS */}
      <section className="relative px-6 py-24 lg:py-40 text-center overflow-hidden">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 px-3 py-1 text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-10 transition-colors">
            <Zap size={12} className="mr-2 text-blue-500" /> Infrastructure v4.0 disponible
          </div>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tighter text-slate-950 dark:text-zinc-50 md:text-8xl mb-8">
            L'OS moderne de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">votre établissement.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-500 dark:text-zinc-500 leading-relaxed mb-12 font-medium">
            Une plateforme unifiée pour orchestrer la vie scolaire. <br className="hidden md:block"/> 
            Performante, sécurisée et conçue pour l'excellence académique.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link 
              to="/register" 
              className="group flex items-center justify-center rounded-md bg-slate-950 dark:bg-zinc-50 px-8 py-4 text-base font-bold text-white dark:text-zinc-950 shadow-xl hover:opacity-90 transition w-full sm:w-auto"
            >
              Commencer l'aventure <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="flex items-center justify-center rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-8 py-4 text-base font-bold text-slate-900 dark:text-zinc-50 hover:bg-slate-50 dark:hover:bg-zinc-900 transition w-full sm:w-auto"
            >
              Accéder à la console
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Shadcn Style */}
      <section className="py-24 px-6 border-t border-slate-200 dark:border-zinc-900 bg-slate-50/30 dark:bg-zinc-900/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-1 px-1 lg:grid-cols-3">
            {[
              {
                title: "Gestion Administrative",
                desc: "Contrôlez les inscriptions, les emplois du temps et le personnel en temps réel.",
                icon: <LayoutDashboard size={20} className="text-blue-500" />
              },
              {
                title: "Suivi Académique",
                desc: "Carnet de notes, absences et bulletins numériques synchronisés instantanément.",
                icon: <GraduationCap size={20} className="text-indigo-500" />
              },
              {
                title: "Flux Financiers",
                desc: "Automatisez la facturation et les relances de frais de scolarité en toute sécurité.",
                icon: <Globe size={20} className="text-emerald-500" />
              }
            ].map((f, i) => (
              <div key={i} className="group p-10 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 transition-all duration-300">
                <div className="mb-6">{f.icon}</div>
                <h3 className="text-lg font-bold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimalist */}
      <footer className="border-t border-slate-200 dark:border-zinc-900 py-16 px-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center space-x-2 grayscale opacity-50">
             <div className="h-5 w-5 bg-slate-950 dark:bg-zinc-50 rounded flex items-center justify-center text-white dark:text-zinc-950 text-[8px] font-black">GS</div>
             <span className="text-sm font-bold tracking-tighter">GestionSchool</span>
          </div>
          <p className="text-xs font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-[0.3em]">
            L'excellence technologique au service de l'éducation
          </p>
          <div className="text-[10px] text-slate-400 dark:text-zinc-600 font-medium space-x-6">
            <a href="#" className="hover:text-slate-950 dark:hover:text-zinc-50 transition">Status</a>
            <a href="#" className="hover:text-slate-950 dark:hover:text-zinc-50 transition">Privacy</a>
            <a href="#" className="hover:text-slate-950 dark:hover:text-zinc-50 transition">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
