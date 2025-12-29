import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConflict } from '../context/ConflictContext';
import OrasiBrand from '../components/OrasiBrand';

const Login: React.FC = () => {
  const { setUser, setConflictInfo } = useConflict();
  const navigate = useNavigate();

  const [identityType, setIdentityType] = useState<'consultant' | 'community'>('consultant');
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    role: 'Senior Consultant',
  });

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.trim() && formData.institution.trim()) {
      setUser({ ...formData, type: identityType });
      setConflictInfo({ gestorResponsable: formData.name });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

        {/* BRAND */}
        <div className="mb-8 flex justify-center">
          <OrasiBrand />
        </div>

        {/* FORM */}
        <form onSubmit={handleEnter} className="space-y-4">

          <input
            type="text"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="Institución / Organización"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="Senior Consultant">Consultor Senior</option>
            <option value="Conflict Analyst">Analista de Conflictos</option>
            <option value="Community Leader">Líder Comunitario</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold"
          >
            ACCEDER AL SISTEMA
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
