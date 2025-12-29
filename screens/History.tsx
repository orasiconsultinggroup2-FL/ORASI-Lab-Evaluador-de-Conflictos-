
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConflict } from '../context/ConflictContext';

const History: React.FC = () => {
  const { incidents, addIncident } = useConflict();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Violencia' as 'Violencia' | 'Negociación',
    impact: 'Medio' as 'Bajo' | 'Medio' | 'Alto',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addIncident(formData);
    setShowModal(false);
    setFormData({ title: '', description: '', type: 'Violencia', impact: 'Medio', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary">
            <button onClick={() => navigate('/')} className="hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <span className="text-[10px] font-black uppercase tracking-widest">Volver al Panel</span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-4xl font-black">Interacciones Históricas</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">Documente y analice actos de violencia pasados e intentos de negociación.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
        >
          <span className="material-symbols-outlined">add</span> Registrar Incidente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a2632] shadow-sm">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Total Incidentes</p>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">{incidents.length}</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a2632] shadow-sm">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Negociaciones</p>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">{incidents.filter(i => i.type === 'Negociación').length}</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a2632] shadow-sm">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Eventos de Violencia</p>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">{incidents.filter(i => i.type === 'Violencia').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">dangerous</span> Actos de Violencia
          </h3>
          <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
            {incidents.filter(i => i.type === 'Violencia').map(incident => (
              <div key={incident.id} className="relative">
                <div className="absolute -left-[33px] top-0 size-4 bg-red-500 rounded-full border-4 border-white dark:border-[#101922]"></div>
                <div className="bg-white dark:bg-[#1a2632] rounded-lg border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400">{incident.date}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${incident.impact === 'Alto' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>Impacto {incident.impact}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{incident.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{incident.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">handshake</span> Intentos de Negociación
          </h3>
          <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
            {incidents.filter(i => i.type === 'Negociación').map(incident => (
              <div key={incident.id} className="relative">
                <div className="absolute -left-[33px] top-0 size-4 bg-primary rounded-full border-4 border-white dark:border-[#101922]"></div>
                <div className="bg-white dark:bg-[#1a2632] rounded-lg border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400">{incident.date}</span>
                    <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">Registrado</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{incident.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{incident.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold uppercase tracking-widest text-sm">Registrar Incidente</h3>
              <button onClick={() => setShowModal(false)} className="material-symbols-outlined text-slate-400 hover:text-red-500">close</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Fecha</span>
                  <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-12 px-3 outline-none" required />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tipo</span>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-12 px-3 outline-none">
                    <option value="Violencia">Violencia</option>
                    <option value="Negociación">Negociación</option>
                  </select>
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Título</span>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-12 px-4 outline-none" placeholder="Nombre corto del evento" required />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Descripción</span>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 p-4 min-h-[120px] outline-none resize-none" placeholder="Contexto detallado..." required />
              </label>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-slate-500 font-bold uppercase text-[10px]">Cancelar</button>
                <button type="submit" className="px-8 py-3 bg-primary text-white font-black rounded-xl uppercase text-[10px] tracking-widest shadow-lg">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
