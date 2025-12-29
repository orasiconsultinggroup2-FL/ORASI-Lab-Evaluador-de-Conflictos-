
export enum RiskLevel {
  LOW = 'Bajo',
  MEDIUM = 'Medio',
  HIGH = 'Alto',
  CRITICAL = 'Crítico'
}

export enum ActorStance {
  HARDLINER = 'Radical',
  CONDITIONAL = 'Condicional',
  NEUTRAL = 'Neutral',
  CONCILIATORY = 'Conciliador'
}

export interface ActorAnalysis {
  comunicacion: string;
  relaciones: string;
  posiciones: string;
  intereses: string;
  alternativas: string;
  opciones: string;
  legitimidad: string;
  compromisos: string;
}

export interface Actor {
  id: string;
  name: string;
  type: string;
  stance: ActorStance;
  influence: number;
  posiciones?: string; // Sección 7 de la matriz
  sintesis?: string;   // Sección 7 de la matriz
  analisis?: ActorAnalysis; // Sección 8 de la matriz
}

export interface Conflict {
  id: string;
  title: string;
  departamento: string;
  provincia: string;
  distrito: string;
  localidad: string;
  gestorResponsable: string;
  naturalezaDisputa: string;
  sectorProductivo: string;
  situacionActual: string;
  riskLevel: RiskLevel;
  updatedAt: string;
}

export interface Incident {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'Violencia' | 'Negociación';
  impact: 'Bajo' | 'Medio' | 'Alto';
}
export enum Permission {
  CREATE_CONFLICT = 'crear_conflicto',
  EDIT_CONFLICT = 'editar_conflicto',
  DELETE_CONFLICT = 'eliminar_conflicto',
  VIEW_REPORTS = 'ver_reportes',
  EXPORT_DATA = 'exportar_datos',
  MANAGE_USERS = 'gestionar_usuarios',
}

export interface ConflictReport {
  productivo: string;
  resumen: string;
  situacionActual: string;
  poblacion: number;
  severidad: number;
  riskLevel: string;
  type?: string;
  startDate?: string;
  updatedAt: string;
  status: 'Activo' | 'En Resolución' | 'Resuelto' | 'Escalado';
  priority: 'Baja' | 'Media' | 'Alta' | 'Crítica';
}

export interface AIAnalysis {
  riskClassification: string;
  suggestedActions: Array<{
    title: string;
    description: string;
    priority: 'Alta' | 'Media' | 'Baja';
    timeframe: string;
    resources: string[];
  }>;
  longTermOutlook: string;
}
