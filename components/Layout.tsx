import OrasiBrand from "./OrasiBrand";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <div className="mb-8">
          <OrasiBrand size={42} />
          <p className="text-xs text-slate-400 mt-2">
            Evaluador de Conflictos
          </p>
        </div>

        <nav className="flex-1 space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full text-left px-3 py-2 rounded hover:bg-slate-700"
          >
            Panel Principal
          </button>

          <button
            onClick={() => navigate("/identification")}
            className="w-full text-left px-3 py-2 rounded hover:bg-slate-700"
          >
            Identificación
          </button>
        </nav>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-red-600 hover:bg-red-700 rounded py-2 text-sm"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
