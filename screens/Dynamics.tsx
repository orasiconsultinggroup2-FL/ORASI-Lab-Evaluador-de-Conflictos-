
import React from 'react';
import { useConflict } from '../context/ConflictContext';

const Dynamics: React.FC = () => {
  const { actors, updateActor } = useConflict();

  const elementQuestions = [
    { key: 'comunicacion', label: 'COMUNICACIÓN', q: '¿Cuáles son los obstáculos para una comunicación efectiva?' },
    { key: 'relaciones', label: 'RELACIONES', q: '¿Qué aspectos de la relación actual hacen difícil abordar diferencias?' },
    { key: 'intereses', label: 'INTERESES', q: '¿Cuáles son las preocupaciones, necesidades y temores reales?' },
    { key: 'alternativas', label: 'ALTERNATIVAS', q: '¿Qué puede hacer cada uno por su lado si no hay acuerdo?' },
    { key: 'opciones', label: 'OPCIONES', q: '¿Cuáles son posibles soluciones creativas que satisfagan a ambos?' },
    { key: 'legitimidad', label: 'LEGITIMIDAD', q: '¿Qué criterios objetivos pueden ayudar a seleccionar la opción?' },
    { key: 'compromisos', label: 'COMPROMISOS', q: '¿Existen compromisos razonables que podrían firmar?' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black">8.- Elementos para Análisis del Caso</h1>
        <p className="text-slate-500">Análisis cualitativo por actor basado en los 7 elementos de Harvard.</p>
      </div>

      <div className="space-y-10">
        {actors.map(actor => (
          <div key={actor.id} className="bg-white dark:bg-[#1a2632] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-primary/5 p-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-primary text-lg uppercase">Actor: {actor.name}</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {elementQuestions.map(item => (
                <div key={item.key} className="flex flex-col gap-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">{item.label}</label>
                  <p className="text-[11px] text-slate-400 italic mb-1">{item.q}</p>
                  <textarea 
                    value={(actor.analisis as any)?.[item.key] || ''}
                    onChange={(e) => updateActor(actor.id, { 
                      analisis: { ...(actor.analisis || {}), [item.key]: e.target.value } as any 
                    })}
                    className="rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 p-3 text-sm min-h-[100px]"
                    placeholder="Escriba el análisis aquí..."
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dynamics;
