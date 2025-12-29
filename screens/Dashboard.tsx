
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useConflict } from '../context/ConflictContext';
import { RiskLevel } from '../types';

const RISK_DATA_DEMO = [
  { name: 'Bajo', value: 45, color: '#10b981' },
  { name: 'Medio', value: 30, color: '#f59e0b' },
  { name: 'Alto', value: 15, color: '#f97316' },
  { name: 'Crítico', value: 10, color: '#ef4444' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { conflictInfo, incidents, actors, resetAll } = useConflict();

  const handleAddNew = () => {
    resetAll();
    navigate('/identification');
  };

  const safeVal = (val: any) => {
    const num = parseInt(val);
    return isNaN(num) ? 0 : num;
  };

  const hasData = conflictInfo.title.trim() !== '';

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl">dashboard</span>
            Panel Principal
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium ml-12 italic">
            "Mejores Procesos, Mejores Relaciones"
          </p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center justify-center gap-3 rounded-2xl h-14 px-8 bg-primary hover:bg-blue-600 text-white text-sm font-black shadow-xl shadow-primary/25 transition-all hover:scale-[1.03] active:scale-95 group"
        >
          <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add_circle</span>
          <span className="uppercase tracking-widest">{hasData ? 'Cambiar Caso' : 'Iniciar Nuevo Caso'}</span>
        </button>
      </div>

      {/* KPIs Rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Actores', val: actors.length, icon: 'hub', color: 'bg-blue-500' },
          { label: 'Eventos', val: incidents.length, icon: 'history', color: 'bg-orange-500' },
          { label: 'Severidad', val: `${safeVal(conflictInfo.severidad)}%`, icon: 'speed', color: 'bg-red-500' },
          { label: 'Población', val: safeVal(conflictInfo.poblacion).toLocaleString(), icon: 'groups', color: 'bg-emerald-500' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-[#1a2632] p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${kpi.color} text-white shadow-lg`}>
              <span className="material-symbols-outlined">{kpi.icon}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">{kpi.val}</span>
            </div>
          </div>
        ))}
      </div>

      {!hasData ? (
        /* Pantalla de Entrada para Usuario Nuevo */
        <div className="bg-white dark:bg-[#1a2632] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px] p-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
          <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center mb-8 relative">
            <span className="material-symbols-outlined text-primary text-6xl animate-pulse">rocket_launch</span>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">NUEVO</div>
          </div>
          
          <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Bienvenido al Evaluador de Conflictos</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg text-lg leading-relaxed mb-10">
            Esta plataforma le ayudará a transformar datos complejos en <strong>estrategias de resolución</strong> basadas en la metodología de Harvard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
            {[
              { step: '1', title: 'Identificar', desc: 'Cargue los datos base y georeferencia del caso.', icon: 'map' },
              { step: '2', title: 'Mapear', desc: 'Identifique actores y sus niveles de influencia.', icon: 'group_work' },
              { step: '3', title: 'Generar', desc: 'Obtenga la Matriz y recomendaciones con IA.', icon: 'auto_awesome' }
            ].map((s, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center">
                <div className="size-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center font-black text-primary mb-4 border border-slate-100 dark:border-slate-700">
                  {s.step}
                </div>
                <span className="material-symbols-outlined text-slate-400 mb-2">{s.icon}</span>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">{s.title}</h4>
                <p className="text-xs text-slate-500 leading-tight">{s.desc}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={handleAddNew}
            className="px-12 py-5 bg-slate-900 dark:bg-primary text-white rounded-2xl font-black text-base shadow-2xl hover:scale-105 transition-all flex items-center gap-4 group"
          >
            COMENZAR ANÁLISIS AHORA
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </button>
        </div>
      ) : (
        /* Vista con Datos (Casos Activos) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">article</span>
                Caso Activo en Memoria
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest">En Proceso</span>
            </div>
            <div className="p-8">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">{conflictInfo.title}</h4>
                    <p className="text-slate-500 mt-1">{conflictInfo.departamento} / {conflictInfo.provincia} / {conflictInfo.distrito}</p>
                  </div>
                  <button onClick={() => navigate('/identification')} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Gestor Responsable</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{conflictInfo.gestorResponsable || 'No asignado'}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Nivel de Riesgo</p>
                    <p className="text-sm font-bold text-red-600 uppercase">{conflictInfo.riskLevel}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                <button 
                  onClick={() => navigate('/final-report')}
                  className="px-8 py-3 bg-primary/10 text-primary rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
                >
                  Ver Informe de Matriz
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-8 flex flex-col">
            <h3 className="text-slate-900 dark:text-white font-bold mb-6">Métrica de Riesgo</h3>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={RISK_DATA_DEMO} margin={{ top: 0, right: 0, left: -35, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={24}>
                    {RISK_DATA_DEMO.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
