import { useNavigate } from "react-router-dom";
import OrasiBrand from "./OrasiBrand";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("orasi_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <OrasiBrand size={32} />
        <p className="text-xs mt-2 text-slate-400">
          Evaluador de Conflictos
        </p>

        <nav className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="block w-full text-left hover:text-blue-400"
          >
            Panel Principal
          </button>
          <button
            onClick={() => navigate("/identification")}
            className="block w-full text-left hover:text-blue-400"
          >
            Identificación
          </button>
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-600 py-2 rounded-lg text-sm hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
