import { useNavigate, NavLink } from "react-router-dom";
import OrasiBrand from "./OrasiBrand";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-4">
        <div className="mb-6">
          <OrasiBrand size={28} />
          <p className="text-xs text-slate-300 mt-1">
            Evaluador de Conflictos
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`
            }
          >
            Panel Principal
          </NavLink>

          <NavLink
            to="/identification"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`
            }
          >
            Identificación
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>

    </div>
  );
}
