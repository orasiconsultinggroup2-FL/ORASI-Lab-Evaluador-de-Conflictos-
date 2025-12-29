import OrasiBrand from "../components/OrasiBrand";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("orasi_auth", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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

        <input className="w-full mb-3 p-3 border rounded" placeholder="Usuario" />
        <input className="w-full mb-4 p-3 border rounded" placeholder="Clave" />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
        >
          ACCEDER AL SISTEMA →
        </button>
      </div>
    </div>
  );
}
