
import React, { useState } from 'react';
import { generateStrategyAnalysis, generateConflictVisual } from '../services/geminiService';
import { useConflict } from '../context/ConflictContext';
import { RiskLevel } from '../types';

const RiskAssessment: React.FC = () => {
  const { conflictInfo, actors, incidents } = useConflict();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [conflictImage, setConflictImage] = useState<string | null>(null);

  const handleGenerateAnalysis = async () => {
    setLoading(true);
    const details = `
      Título: ${conflictInfo.title}
      Naturaleza: ${conflictInfo.naturalezaDisputa}
      Sector: ${conflictInfo.sectorProductivo}
      Severidad: ${conflictInfo.severidad}%
      Actores: ${actors.map(a => `${a.name} (${a.stance})`).join(', ')}
    `;
    const result = await generateStrategyAnalysis(details);
    setAiAnalysis(result);
    setLoading(false);
  };

  const handleGenerateImage = async () => {
    setImageLoading(true);
    const prompt = `Conflict title: ${conflictInfo.title}. Nature: ${conflictInfo.naturalezaDisputa}. Key actors: ${actors.map(a => a.name).join(', ')}. Represents tension and strategic resolution.`;
    const imageUrl = await generateConflictVisual(prompt);
    setConflictImage(imageUrl);
    setImageLoading(false);
  };

  const getRiskLabel = (severity: number) => {
    if (severity > 75) return 'RIESGO CRÍTICO';
    if (severity > 50) return 'RIESGO ALTO';
    if (severity > 25) return 'RIESGO MEDIO';
    return 'RIESGO BAJO';
  };

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Evaluación y Acción Estratégica</h1>
          <p className="text-slate-500 dark:text-slate-400">Sintetice hallazgos y visualice el escenario con inteligencia artificial.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleGenerateImage}
            disabled={imageLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">{imageLoading ? 'progress_activity' : 'image'}</span>
            {imageLoading ? 'Generando Visual...' : 'Visualizar con Nano Banana'}
          </button>
          <button 
            onClick={handleGenerateAnalysis}
            disabled={loading}
            className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">{loading ? 'sync' : 'psychology'}</span>
            {loading ? 'Analizando...' : 'Estrategia IA'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Métrica de Riesgo */}
          <section className="bg-white dark:bg-[#1a2632] p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500">warning</span> Alerta de Nivel
            </h2>
            <div className="flex flex-col gap-4">
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className={`h-full bg-emerald-500 w-1/4 ${conflictInfo.severidad <= 25 ? 'opacity-100' : 'opacity-20'}`}></div>
                <div className={`h-full bg-yellow-500 w-1/4 ${conflictInfo.severidad > 25 && conflictInfo.severidad <= 50 ? 'opacity-100' : 'opacity-20'}`}></div>
                <div className={`h-full bg-orange-500 w-1/4 ${conflictInfo.severidad > 50 && conflictInfo.severidad <= 75 ? 'opacity-100' : 'opacity-20'}`}></div>
                <div className={`h-full bg-red-600 w-1/4 ${conflictInfo.severidad > 75 ? 'opacity-100' : 'opacity-20'}`}></div>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-black uppercase tracking-tighter ${
                  conflictInfo.severidad > 75 ? 'text-red-600' : conflictInfo.severidad > 50 ? 'text-orange-600' : 'text-emerald-600'
                }`}>
                  {getRiskLabel(conflictInfo.severidad)}
                </p>
                <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Impacto Calculado: {conflictInfo.severidad}%</p>
              </div>
            </div>
          </section>

          {/* Imagen Generada por IA */}
          <section className="bg-white dark:bg-[#1a2632] p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <h2 className="text-sm font-black mb-4 text-slate-500 uppercase tracking-widest">Metáfora Visual (Nano Banana)</h2>
            <div className="aspect-video bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
              {conflictImage ? (
                <img src={conflictImage} alt="Visualización del Conflicto" className="w-full h-full object-cover animate-in fade-in duration-1000" />
              ) : (
                <div className="flex flex-col items-center gap-2 opacity-30">
                  <span className="material-symbols-outlined text-4xl">landscape</span>
                  <p className="text-[10px] font-bold">Sin imagen generada</p>
                </div>
              )}
            </div>
            {conflictImage && (
              <p className="text-[10px] text-slate-400 mt-4 italic text-center">"Imagen conceptual generada por IA para soporte analítico"</p>
            )}
          </section>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="bg-white dark:bg-[#1a2632] p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm min-h-[500px]">
            <h2 className="text-xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-xl">assignment_turned_in</span> 
              Recomendaciones del Consultor Senior
            </h2>
            
            {aiAnalysis ? (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
                   <h3 className="text-primary font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                     <span className="material-symbols-outlined text-[16px]">verified</span> 
                     Clasificación Estratégica
                   </h3>
                   <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{aiAnalysis.riskClassification}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiAnalysis.suggestedActions.map((action: any, idx: number) => (
                    <div key={idx} className="p-5 border border-slate-100 dark:border-slate-800 rounded-[28px] hover:border-primary/50 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all cursor-default group">
                      <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black mb-3 group-hover:bg-primary group-hover:text-white transition-colors">{idx + 1}</div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{action.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{action.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Perspectiva Proyectada</h4>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border-l-4 border-primary italic text-sm text-slate-600 dark:text-slate-300">
                    "{aiAnalysis.longTermOutlook}"
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[350px] text-slate-300 dark:text-slate-700">
                <div className="size-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl">analytics</span>
                </div>
                <p className="text-center max-w-xs font-bold text-sm">Use el botón "Estrategia IA" para sintetizar los datos del caso.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
