import React from "react";
import { useNavigate } from "react-router-dom";
import { useConflict } from "../context/ConflictContext";
import OrasiBrand from "./OrasiBrand";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { setUser } = useConflict();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("¿Desea cerrar la sesión de forma segura?")) {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 text-white flex flex-col p-6">
        <div className="mb-8">
          <OrasiBrand size={48} />
          <div className="text-sm text-slate-300 mt-1">
            Evaluador de Conflictos
          </div>
        </div>

        <nav className="flex-1 space-y-3 text-sm">
          <button
            onClick={() => navigate("/")}
            className="block w-full text-left px-3 py-2 rounded hover:bg-slate-800"
          >
            Panel principal
          </button>

          <button
            onClick={() => navigate("/identification")}
            className="block w-full text-left px-3 py-2 rounded hover:bg-slate-800"
          >
            Identificación
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 rounded px-4 py-2 text-sm"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
