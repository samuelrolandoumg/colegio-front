export interface Alumno {
  id_usuario: string;
  nombre: string;
  entregado: boolean;
  archivo_nombre?: string;
  archivo_url?: string;
  fecha_subida?: string;
  calificado?: boolean;
}

export interface Tarea {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  puntuacion: number;
  fecha_entrega: string;
  alumnos: Alumno[];
}

export interface Clase {
  id_clase: number;
  nombre_clase: string;
}

export interface Grupo {
  id_grupo: number;
  nombre_grupo: string;
  Clase: Clase;
}
