import { Outlet, useNavigate } from "react-router-dom";
import OrasiBrand from "./OrasiBrand";
import { useConflict } from "../context/ConflictContext";

export default function Layout() {
  const { setUser } = useConflict();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <OrasiBrand size={42} />

        <nav className="mt-10 flex flex-col gap-4 text-sm">
          <button onClick={() => navigate("/")} className="text-left hover:text-blue-400">
            Panel Principal
          </button>
          <button onClick={() => navigate("/identification")} className="text-left hover:text-blue-400">
            Identificación
          </button>
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-600 hover:bg-red-700 rounded-md py-2 text-sm"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO SCROLLABLE */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
