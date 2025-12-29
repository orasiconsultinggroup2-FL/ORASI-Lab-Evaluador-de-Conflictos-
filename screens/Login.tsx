import OrasiBrand from "../components/OrasiBrand";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <OrasiBrand size={48} />
          <h1 className="mt-4 text-2xl font-bold text-center">
            EVALUADOR DE CONFLICTOS
          </h1>
          <p className="text-xs tracking-widest text-blue-600 mt-2">
            MEJORES PROCESOS, MEJORES RELACIONES
          </p>
        </div>

        {/* TABS */}
        <div className="flex bg-slate-100 rounded-full p-1 mb-6">
          <button className="flex-1 bg-white rounded-full py-2 text-sm font-semibold">
            Institución
          </button>
          <button className="flex-1 text-sm text-slate-400">
            Comunidad
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Ej: Luis Oré"
          />
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Ej: ORASI Lab"
          />
          <select className="w-full border rounded-lg px-4 py-2">
            <option>Consultor Senior</option>
            <option>Líder Comunitario</option>
          </select>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold"
        >
          ACCEDER AL SISTEMA →
        </button>

        <p className="text-[10px] text-center text-slate-400 mt-6">
          ORASI LAB · TECNOLOGÍA PARA LA PAZ SOCIAL
        </p>
      </div>
    </div>
  );
}
