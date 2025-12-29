
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useConflict } from '../context/ConflictContext';
import OrasiBrand from './OrasiBrand';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { setUser } = useConflict();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('¿Desea cerrar la sesión de forma segura?')) {
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <div className="mb-10">
          <OrasiBrand />
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 rounded-lg py-2"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 bg-slate-50 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
