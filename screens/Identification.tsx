
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useConflict } from '../context/ConflictContext';

const Identification: React.FC = () => {
  const navigate = useNavigate();
  const { conflictInfo, setConflictInfo } = useConflict();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      const num = parseInt(value);
      setConflictInfo({ [name]: isNaN(num) ? 0 : num });
    } else {
      setConflictInfo({ [name]: value });
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary">
            <button onClick={() => navigate('/')} className="hover:scale-110 transition-transform flex items-center gap-2 group">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span className="text-[10px] font-black uppercase tracking-widest group-hover:underline">Volver al Dashboard</span>
            </button>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Identificación de Matriz</h1>
          <p className="text-slate-500 font-medium text-sm">Fase 1: Datos generales y georeferencia del conflicto.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form sections same as before but ensuring clear inputs */}
        <div className="bg-white dark:bg-[#1a2632] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
             <span className="material-symbols-outlined text-primary text-xl">info</span>
             <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">Información Base</h3>
          </div>
          
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">1.- Nombre del Conflicto</span>
            <input name="title" value={conflictInfo.title} onChange={handleInputChange} placeholder="Ej: Disputa por recursos hídricos en cuenca..." className="rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-14 px-5 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium" />
          </label>

          <div className="grid grid-cols-2 gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Departamento</span>
              <input name="departamento" value={conflictInfo.departamento} onChange={handleInputChange} className="rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-14 px-5 outline-none" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Provincia</span>
              <input name="provincia" value={conflictInfo.provincia} onChange={handleInputChange} className="rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-14 px-5 outline-none" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Población Afectada</span>
              <input type="number" name="poblacion" value={conflictInfo.poblacion} onChange={handleInputChange} className="rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-14 px-5 outline-none font-bold text-primary" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Severidad (0-100)</span>
              <input type="number" name="severidad" min="0" max="100" value={conflictInfo.severidad} onChange={handleInputChange} className="rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-14 px-5 outline-none font-bold text-red-500" />
            </label>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2632] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
             <span className="material-symbols-outlined text-primary text-xl">admin_panel_settings</span>
             <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">Responsabilidades</h3>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Gestor Responsable</span>
            <input name="gestorResponsable" value={conflictInfo.gestorResponsable} onChange={handleInputChange} className="rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-14 px-5 outline-none font-bold" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Naturaleza de la Disputa</span>
            <textarea name="naturalezaDisputa" value={conflictInfo.naturalezaDisputa} onChange={handleInputChange} className="rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 p-5 min-h-[120px] outline-none resize-none font-medium" placeholder="Escriba aquí los intereses y demandas principales..." />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Sector Productivo</span>
            <input name="sectorProductivo" value={conflictInfo.sectorProductivo} onChange={handleInputChange} className="rounded-2xl border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 h-14 px-5 outline-none font-medium" />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button 
          onClick={() => navigate('/history')} 
          className="px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/25 hover:scale-[1.03] active:scale-95 transition-all uppercase tracking-widest text-[11px] flex items-center gap-3"
        >
          CONTINUAR AL PASO 6
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Identification;
