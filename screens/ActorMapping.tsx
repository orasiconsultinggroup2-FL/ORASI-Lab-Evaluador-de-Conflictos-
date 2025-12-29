
import React, { useState } from 'react';
import { useConflict } from '../context/ConflictContext';
import { ActorStance } from '../types';

const ActorMapping: React.FC = () => {
  const { actors, addActor } = useConflict();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Gobierno',
    stance: ActorStance.NEUTRAL,
    influence: 50
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActor(formData);
    setShowModal(false);
    setFormData({ name: '', type: 'Gobierno', stance: ActorStance.NEUTRAL, influence: 50 });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Mapeo Estratégico de Actores</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Identifique y analice a las partes interesadas clave, sus posiciones y dinámicas de poder.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined">add</span> Añadir Nuevo Actor
        </button>
      </div>

      <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <th className="py-4 pl-6 pr-4 text-xs font-bold text-slate-500 uppercase">Nombre del Actor</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase">Tipo</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase">Postura</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase">Influencia</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-slate-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {actors.map(actor => (
                <tr key={actor.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg flex items-center justify-center font-bold text-sm bg-primary/10 text-primary">
                        {actor.name.split(' ').map(n => n[0]).join('').substr(0, 2)}
                      </div>
                      <p className="text-slate-900 dark:text-white font-semibold text-sm">{actor.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {actor.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border ${
                      actor.stance === ActorStance.HARDLINER ? 'text-red-700 bg-red-50 border-red-100' :
                      actor.stance === ActorStance.CONDITIONAL ? 'text-orange-700 bg-orange-50 border-orange-100' :
                      actor.stance === ActorStance.CONCILIATORY ? 'text-green-700 bg-green-50 border-green-100' :
                      'text-blue-700 bg-blue-50 border-blue-100'
                    }`}>
                      {actor.stance}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="w-32 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-1000" 
                          style={{ width: `${actor.influence}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{actor.influence}% Influencia</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-primary rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">Añadir Actor Estratégico</h3>
              <button onClick={() => setShowModal(false)} className="material-symbols-outlined text-slate-400 hover:text-red-500">close</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold">Nombre del Actor</span>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-10 px-3" placeholder="Nombre de la organización o grupo" required />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">Tipo de Actor</span>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-10 px-3">
                    <option value="Gobierno">Gobierno</option>
                    <option value="Milicia">Milicia</option>
                    <option value="ONG">ONG</option>
                    <option value="Económico">Económico</option>
                    <option value="Mediador Externo">Mediador Externo</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">Postura Inicial</span>
                  <select value={formData.stance} onChange={e => setFormData({...formData, stance: e.target.value as any})} className="rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-10 px-3">
                    {Object.values(ActorStance).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold">Influencia Estimada ({formData.influence}%)</span>
                <input type="range" value={formData.influence} onChange={e => setFormData({...formData, influence: parseInt(e.target.value)})} min="0" max="100" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2" />
              </label>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-500 font-medium">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-600">Añadir Actor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActorMapping;
