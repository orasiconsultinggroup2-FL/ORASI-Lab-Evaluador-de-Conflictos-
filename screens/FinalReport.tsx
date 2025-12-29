
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConflict } from '../context/ConflictContext';
import { generateStrategyAnalysis } from '../services/geminiService';

const FinalReport: React.FC = () => {
  const { conflictInfo, actors, incidents, user, saveCurrentCase } = useConflict();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string>('');

  const generateAIReport = async () => {
    setLoading(true);
    const dataString = JSON.stringify({ conflictInfo, actors, incidents });
    const result = await generateStrategyAnalysis(`Genera una sección de "RECOMENDACIONES DE SEGUIMIENTO" profesional para este caso de conflicto. Datos: ${dataString}`);
    setRecommendations(result?.longTermOutlook || 'No se pudo generar el reporte.');
    setLoading(false);
  };

  const handleSave = () => {
    saveCurrentCase();
    alert('Caso guardado exitosamente en el repositorio local.');
  };

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white dark:bg-[#1a2632] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-2xl font-black">Informe Final: Ficha Matriz</h1>
            <p className="text-sm text-slate-500 font-medium">Documento estratégico consolidado.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            className="bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-emerald-100"
          >
            <span className="material-symbols-outlined text-sm">save</span> Guardar Repo
          </button>
          <button onClick={() => window.print()} className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-slate-200">
            <span className="material-symbols-outlined text-sm">print</span> Imprimir
          </button>
          <button 
            onClick={generateAIReport}
            className="bg-primary text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20"
            disabled={loading}
          >
            <span className="material-symbols-outlined text-sm">{loading ? 'sync' : 'magic_button'}</span>
            {loading ? 'Generando...' : 'Síntesis IA'}
          </button>
        </div>
      </div>

      <div id="print-area" className="bg-white text-black p-12 shadow-2xl rounded-sm border border-slate-300 print:shadow-none print:border-none max-w-[210mm] mx-auto min-h-[297mm]">
        <div className="flex justify-between items-start mb-10 pb-8 border-b-4 border-slate-900">
          <div className="flex flex-col gap-3">
            <img 
              src="https://orasi.com.pe/wp-content/uploads/2021/11/logo-orasi-300x95.png" 
              alt="ORASI Lab" 
              className="h-16 w-auto object-contain brightness-105"
            />
            <div className="flex flex-col">
               <p className="text-[14px] font-black uppercase text-slate-900 leading-tight">ORASI Lab</p>
               <p className="text-[12px] font-black text-primary uppercase tracking-[0.05em]">EVALUADOR DE CONFLICTOS</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">{user?.institution || 'INSTITUCIÓN NO ESPECIFICADA'}</p>
            </div>
          </div>
          <div className="text-right text-[9px] leading-relaxed text-slate-500 font-medium">
            <p className="font-bold text-slate-900">... Logra Mejores Resultados!</p>
            <p className="mt-2 uppercase tracking-widest">Consultoría Estratégica</p>
            <p>Email: contacto@orasi.com.pe</p>
            <p>WhatsApp: +51 986.375.900</p>
          </div>
        </div>

        <div className="border-2 border-black mb-8 p-4 text-center font-black text-xl uppercase bg-slate-50 tracking-widest">
          FICHA MATRIZ DE EVALUACIÓN DE CONFLICTO
        </div>

        <div className="grid grid-cols-12 border-t-2 border-l-2 border-black">
          <div className="col-span-3 border-r-2 border-b-2 border-black p-3 font-bold bg-slate-50 text-[10px] uppercase">1.- NOMBRE DEL CONFLICTO</div>
          <div className="col-span-9 border-r-2 border-b-2 border-black p-3 uppercase font-black text-sm">{conflictInfo.title || 'SIN NOMBRE'}</div>

          <div className="col-span-12 border-r-2 border-b-2 border-black p-2 font-black bg-slate-200 uppercase text-[10px] text-center tracking-widest">2.- ÁMBITO GEOGRÁFICO</div>
          <div className="col-span-3 border-r-2 border-b-2 border-black p-2 italic text-[10px] font-bold">Departamento:</div>
          <div className="col-span-3 border-r-2 border-b-2 border-black p-2 text-[10px]">{conflictInfo.departamento || '-'}</div>
          <div className="col-span-3 border-r-2 border-b-2 border-black p-2 italic text-[10px] font-bold">Provincia:</div>
          <div className="col-span-3 border-r-2 border-b-2 border-black p-2 text-[10px]">{conflictInfo.provincia || '-'}</div>
          <div className="col-span-3 border-r-2 border-b-2 border-black p-2 italic text-[10px] font-bold">Distrito:</div>
          <div className="col-span-3 border-r-2 border-b-2 border-black p-2 text-[10px]">{conflictInfo.distrito || '-'}</div>
          <div className="col-span-3 border-r-2 border-b-2 border-black p-2 italic text-[10px] font-bold">Localidad:</div>
          <div className="col-span-3 border-r-2 border-b-2 border-black p-2 text-[10px]">{conflictInfo.localidad || '-'}</div>

          <div className="col-span-3 border-r-2 border-b-2 border-black p-3 font-bold bg-slate-50 text-[10px] uppercase">3.- GESTOR RESPONSABLE</div>
          <div className="col-span-9 border-r-2 border-b-2 border-black p-3 text-[10px] font-bold uppercase">{conflictInfo.gestorResponsable} ({user?.role})</div>
          
          <div className="col-span-3 border-r-2 border-b-2 border-black p-3 font-bold bg-slate-50 text-[10px] uppercase">4.- NATURALEZA DISPUTA</div>
          <div className="col-span-9 border-r-2 border-b-2 border-black p-3 text-[10px] italic">{conflictInfo.naturalezaDisputa || 'Sin registrar.'}</div>
          
          <div className="col-span-3 border-r-2 border-b-2 border-black p-3 font-bold bg-slate-50 text-[10px] uppercase">5.- SECTOR PRODUCTIVO</div>
          <div className="col-span-9 border-r-2 border-b-2 border-black p-3 text-[10px] uppercase">{conflictInfo.sectorProductivo || '-'}</div>
        </div>

        <div className="mt-8">
          <h3 className="font-black border-b-2 border-black mb-3 text-[12px] uppercase tracking-widest">6.- CONTEXTO Y ANTECEDENTES</h3>
          <div className="space-y-5">
            <div className="border border-black p-3 bg-slate-50">
              <p className="font-bold text-[10px] uppercase mb-2 border-b border-black pb-1">6.1.- Actos de Violencia:</p>
              <div className="pl-2 text-[10px] italic leading-relaxed">
                {incidents.filter(i => i.type === 'Violencia').length > 0 ? (
                  incidents.filter(i => i.type === 'Violencia').map(i => <p key={i.id} className="mb-1">• {i.date}: {i.title} - {i.description}</p>)
                ) : <p>No se registran actos de violencia significativos.</p>}
              </div>
            </div>
            <div className="border border-black p-3">
              <p className="font-bold text-[10px] uppercase mb-2 border-b border-black pb-1">6.2.- Actos de Negociación:</p>
              <div className="pl-2 text-[10px] italic leading-relaxed">
                {incidents.filter(i => i.type === 'Negociación').length > 0 ? (
                  incidents.filter(i => i.type === 'Negociación').map(i => <p key={i.id} className="mb-1">• {i.date}: {i.title} - {i.description}</p>)
                ) : <p>No se registran intentos de negociación previos documentados.</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-2 border-black p-6 bg-slate-50">
          <h3 className="font-black text-[12px] mb-4 text-center uppercase tracking-[0.3em] border-b border-black pb-3">12.- RECOMENDACIONES ESTRATÉGICAS</h3>
          <div className="whitespace-pre-wrap text-[10px] italic leading-loose text-slate-800">
            {recommendations || "Seleccione 'Síntesis IA' para generar recomendaciones basadas en la metodología de Harvard para resolución de conflictos."}
          </div>
        </div>

        <div className="mt-16 flex justify-between items-end">
          <div className="flex flex-col items-center gap-2">
            <div className="w-48 h-[1px] bg-black"></div>
            <p className="text-[8px] font-black uppercase">Firma del Gestor</p>
            <p className="text-[7px] text-slate-500 uppercase">{conflictInfo.gestorResponsable}</p>
          </div>
          <p className="text-[8px] text-slate-400 font-bold uppercase">Matriz Generada el: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FinalReport;
