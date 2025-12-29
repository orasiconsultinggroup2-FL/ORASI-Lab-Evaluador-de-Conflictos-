
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Actor, Incident, Conflict, RiskLevel } from '../types';

interface User {
  name: string;
  role: string;
  institution: string;
  type: 'consultant' | 'community';
}

interface ConflictExtended extends Conflict {
  resumen: string;
  poblacion: number;
  severidad: number;
}

interface SavedCase {
  id: string;
  timestamp: string;
  conflictInfo: ConflictExtended;
  actors: Actor[];
  incidents: Incident[];
}

interface ConflictContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  conflictInfo: ConflictExtended;
  actors: Actor[];
  incidents: Incident[];
  savedCases: SavedCase[];
  setConflictInfo: (info: Partial<ConflictExtended>) => void;
  updateActor: (id: string, data: Partial<Actor>) => void;
  addActor: (actor: Omit<Actor, 'id'>) => void;
  addIncident: (incident: Omit<Incident, 'id'>) => void;
  saveCurrentCase: () => void;
  loadCase: (id: string) => void;
  deleteCase: (id: string) => void;
  resetAll: () => void;
}

const ConflictContext = createContext<ConflictContextType | undefined>(undefined);

const STORAGE_KEY = 'ORASI_CONFLIC_REPO';

export const ConflictProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [conflictInfo, setConflictInfoState] = useState<ConflictExtended>({
    id: 'MATRIZ-' + Math.floor(Math.random() * 10000),
    title: '',
    departamento: '',
    provincia: '',
    distrito: '',
    localidad: '',
    gestorResponsable: '',
    naturalezaDisputa: '',
    sectorProductivo: '',
    resumen: '',
    situacionActual: '',
    poblacion: 0,
    severidad: 0,
    riskLevel: RiskLevel.LOW,
    updatedAt: 'Pendiente'
  });

  const [actors, setActors] = useState<Actor[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [savedCases, setSavedCases] = useState<SavedCase[]>([]);

  // Cargar repositorio al inicio
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedCases(JSON.parse(stored));
      } catch (e) {
        console.error("Error cargando repositorio local", e);
      }
    }
  }, []);

  const setConflictInfo = (info: Partial<ConflictExtended>) => {
    setConflictInfoState((prev) => {
      const newState = { ...prev, ...info };
      if ('poblacion' in info) {
        const val = parseInt(String(info.poblacion));
        newState.poblacion = isNaN(val) ? 0 : val;
      }
      if ('severidad' in info) {
        const val = parseInt(String(info.severidad));
        newState.severidad = isNaN(val) ? 0 : Math.min(100, Math.max(0, val));
      }
      newState.updatedAt = new Date().toLocaleTimeString();
      return newState;
    });
  };

  const updateActor = (id: string, data: Partial<Actor>) => {
    setActors(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const addActor = (actor: Omit<Actor, 'id'>) => {
    const newActor = { ...actor, id: Math.random().toString(36).substr(2, 9) };
    setActors(prev => [...prev, newActor]);
  };

  const addIncident = (incident: Omit<Incident, 'id'>) => {
    const newIncident = { ...incident, id: Math.random().toString(36).substr(2, 9) };
    setIncidents(prev => [newIncident, ...prev]);
  };

  const saveCurrentCase = () => {
    if (!conflictInfo.title) return;
    
    const newCase: SavedCase = {
      id: conflictInfo.id,
      timestamp: new Date().toISOString(),
      conflictInfo: { ...conflictInfo },
      actors: [...actors],
      incidents: [...incidents]
    };

    setSavedCases(prev => {
      const filtered = prev.filter(c => c.id !== conflictInfo.id);
      const updated = [newCase, ...filtered];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const loadCase = (id: string) => {
    const target = savedCases.find(c => c.id === id);
    if (target) {
      setConflictInfoState(target.conflictInfo);
      setActors(target.actors);
      setIncidents(target.incidents);
    }
  };

  const deleteCase = (id: string) => {
    setSavedCases(prev => {
      const updated = prev.filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const resetAll = () => {
    setConflictInfoState({
      id: 'MATRIZ-' + Math.floor(Math.random() * 10000),
      title: '', departamento: '', provincia: '', distrito: '', localidad: '',
      gestorResponsable: user?.name || '', naturalezaDisputa: '', sectorProductivo: '',
      resumen: '', situacionActual: '', poblacion: 0, severidad: 0,
      riskLevel: RiskLevel.LOW, updatedAt: 'Nuevo'
    });
    setActors([]);
    setIncidents([]);
  };

  return (
    <ConflictContext.Provider value={{ 
      user, setUser, conflictInfo, actors, incidents, savedCases,
      setConflictInfo, updateActor, addActor, addIncident, 
      saveCurrentCase, loadCase, deleteCase, resetAll 
    }}>
      {children}
    </ConflictContext.Provider>
  );
};

export const useConflict = () => {
  const context = useContext(ConflictContext);
  if (!context) throw new Error('useConflict debe ser usado dentro de un ConflictProvider');
  return context;
};
