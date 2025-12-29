
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConflict } from '../context/ConflictContext';

const Repository: React.FC = () => {
  const navigate = useNavigate();
  const { savedCases, loadCase, deleteCase, saveCurrentCase, conflictInfo } = useConflict();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = savedCases.filter(c => 
    c.conflictInfo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.conflictInfo.gestorResponsable.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoad = (id: string) => {
    loadCase(id);
    navigate('/');
  };

  const handleExportExcel = () => {
    if (savedCases.length === 0) return;

    // Crear cabeceras
    const headers = [
      "ID Matriz", "Fecha Registro", "Título Conflicto", "Departamento", "Provincia", 
      "Gestor Responsable", "Naturaleza", "Sector", "Población", "Severidad %", 
      "Nivel Riesgo", "Num Actores", "Num Incidentes"
    ];

    // Crear filas
    const rows = savedCases.map(c => [
      c.id,
      new Date(c.timestamp).toLocaleDateString(),
      `"${c.conflictInfo.title.replace(/"/g, '""')}"`,
      c.conflictInfo.departamento,
      c.conflictInfo.provincia,
      c.conflictInfo.gestorResponsable,
      `"${c.conflictInfo.naturalezaDisputa.replace(/"/g, '""')}"`,
      c.conflictInfo.sectorProductivo,
      c.conflictInfo.poblacion,
      c.conflictInfo.severidad,
      c.conflictInfo.riskLevel,
      c.actors.length,
      c.incidents.length
    ]);

    // Unir todo en formato CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    // Descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `BBDD_EVALUADOR_CONFLICTOS_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl">database</span>
            Repositorio de Casos
          </h1>
          <p className="text-slate-500 font-medium">Histórico centralizado de evaluaciones y gestión de base de datos.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">table_view</span>
            Exportar BBDD Excel
          </button>
          <button 
            onClick={() => { saveCurrentCase(); alert('Caso actual guardado correctamente'); }}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            Guardar Caso Actual
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a2632] rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Buscar por título o gestor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none font-medium text-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
            Total: {filteredCases.length} registros
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5">Matriz ID / Fecha</th>
                <th className="px-6 py-5">Conflicto</th>
                <th className="px-6 py-5 text-center">Riesgo</th>
                <th className="px-6 py-5">Gestor</th>
                <th className="px-6 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredCases.map((c) => (
                <tr key={c.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-primary">{c.id}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{new Date(c.timestamp).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase leading-tight">{c.conflictInfo.title}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{c.conflictInfo.departamento}, {c.conflictInfo.provincia}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        c.conflictInfo.severidad > 75 ? 'bg-red-100 text-red-600' : 
                        c.conflictInfo.severidad > 50 ? 'bg-orange-100 text-orange-600' : 
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                        {c.conflictInfo.severidad}% {c.conflictInfo.riskLevel}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                      {c.conflictInfo.gestorResponsable}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleLoad(c.id)}
                        className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                        title="Cargar Caso"
                      >
                        <span className="material-symbols-outlined text-[20px]">file_open</span>
                      </button>
                      <button 
                        onClick={() => { if(confirm('¿Eliminar este registro permanentemente?')) deleteCase(c.id); }}
                        className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Eliminar"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                      <span className="material-symbols-outlined text-6xl">folder_off</span>
                      <p className="font-black uppercase tracking-[0.2em] text-sm">No hay registros guardados</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Repository;
