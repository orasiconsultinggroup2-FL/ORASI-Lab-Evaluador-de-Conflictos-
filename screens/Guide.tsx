
import React from 'react';

const Guide: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 pb-20 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Manual y Glosario Técnico</h1>
        <p className="text-lg text-slate-500">Guía metodológica para la evaluación profesional de conflictos.</p>
      </div>

      {/* Sección: Guía Paso a Paso */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2 border-slate-200 dark:border-slate-800">
          <span className="material-symbols-outlined text-primary">menu_book</span>
          Guía Paso a Paso
        </h2>
        
        <div className="grid gap-6">
          <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-primary">Paso 1: Identificación (Secciones 1-5)</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Define el alcance geográfico y administrativo. Es vital identificar al <strong>Gestor Responsable</strong> (quién lidera el análisis) y la <strong>Naturaleza de la Disputa</strong> (¿es por recursos, por poder, o por identidad?).
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-primary">Paso 2: Contexto e Historia (Sección 6)</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Registra la línea de tiempo. Diferencia claramente entre <strong>Actos de Violencia</strong> (que escalan el conflicto) y <strong>Actos de Negociación</strong> (intentos previos de solución). Esto permite ver si el conflicto es recurrente o está en fase de explosión.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-primary">Paso 3: Mapeo de Actores (Sección 7)</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Identifica a los <em>stakeholders</em>. No solo nombres, sino su <strong>influencia real</strong>. Registra sus declaraciones públicas para extraer sus <strong>Posiciones</strong> (lo que dicen que quieren) antes de pasar al análisis profundo.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-primary">Paso 4: Los 7 Elementos (Sección 8)</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Utiliza el modelo de Harvard para desglosar a cada actor. Pregúntate: ¿Qué les impide comunicarse?, ¿Cuál es su alternativa si no hay trato (MAPAN)?, y ¿Qué opciones creativas podrían satisfacer a ambos?
            </p>
          </div>
        </div>
      </section>

      {/* Sección: Glosario Técnico */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2 border-slate-200 dark:border-slate-800">
          <span className="material-symbols-outlined text-primary">translate</span>
          Glosario Técnico
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <dt className="font-black text-slate-900 dark:text-white mb-1">MAPAN (BATNA)</dt>
            <dd className="text-sm text-slate-500 italic">Mejor Alternativa a un Acuerdo Negociado.</dd>
            <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">Es el curso de acción que un actor tomará si las negociaciones fallan. Define el poder de negociación.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <dt className="font-black text-slate-900 dark:text-white mb-1">Posiciones vs. Intereses</dt>
            <dd className="text-sm text-slate-500 italic">La demanda superficial vs. la necesidad real.</dd>
            <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">La posición es "quiero este terreno"; el interés puede ser "necesito seguridad económica para mi familia".</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <dt className="font-black text-slate-900 dark:text-white mb-1">Legitimidad</dt>
            <dd className="text-sm text-slate-500 italic">Criterios objetivos de justicia.</dd>
            <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">Uso de leyes, reglamentos, precedentes o valores de mercado para justificar una decisión y que no parezca arbitraria.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <dt className="font-black text-slate-900 dark:text-white mb-1">Sorpresas Predecibles</dt>
            <dd className="text-sm text-slate-500 italic">Eventos que sabemos que pueden ocurrir.</dd>
            <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">Situaciones que, aunque no han pasado, hay señales claras de su inminencia (ej. cambio de gobierno, sequía).</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <dt className="font-black text-slate-900 dark:text-white mb-1">Actor Radical (Hardliner)</dt>
            <dd className="text-sm text-slate-500 italic">Postura intransigente.</dd>
            <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">Parte interesada que se niega a hacer concesiones y mantiene su posición inicial a pesar de los costos.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <dt className="font-black text-slate-900 dark:text-white mb-1">Opciones de Mutuo Beneficio</dt>
            <dd className="text-sm text-slate-500 italic">Soluciones creativas "Gana-Gana".</dd>
            <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">Propuestas que expanden el pastel antes de dividirlo, integrando intereses de múltiples partes.</p>
          </div>
        </div>
      </section>

      <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl flex items-start gap-4">
        <span className="material-symbols-outlined text-primary text-3xl">lightbulb</span>
        <div>
          <h4 className="font-bold text-primary">Consejo Profesional</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Una buena evaluación de conflictos nunca se detiene en las <strong>Posiciones</strong>. El éxito del análisis radica en descubrir los <strong>Intereses</strong> subyacentes que los actores no siempre comunican abiertamente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
