import OrasiBrand from "../components/OrasiBrand";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // SESSION SIMPLE PARA DEMO
    localStorage.setItem("orasi_user", "ok");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-100">
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
        <div className="flex bg-slate-100 rounded-full p-1 mb-4">
          <button className="flex-1 bg-white rounded-full py-2 text-sm font-semibold">
            Institución
          </button>
          <button className="flex-1 py-2 text-sm text-slate-400">
            Comunidad
          </button>
        </div>

        {/* FORM */}
        <input
          className="w-full border rounded-lg p-3 mb-3"
          placeholder="Nombre completo"
        />
        <input
          className="w-full border rounded-lg p-3 mb-3"
          placeholder="Institución / Organización"
        />
        <select className="w-full border rounded-lg p-3 mb-4">
          <option>Consultor Senior</option>
          <option>Líder Comunitario</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          ACCEDER AL SISTEMA →
        </button>

        <p className="text-center text-xs text-slate-400 mt-6">
          ORASI LAB · TECNOLOGÍA PARA LA PAZ SOCIAL
        </p>
      </div>
    </div>
  );
}
