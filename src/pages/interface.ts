export interface Wine {
  id_vino: string;
  nombre: string;
  precio: string;
  bodega: string;
  anada: number;
  notas_cata: string;
  url_imagen: string;
  descripcion: string;
  nivel_alcohol: number;
  variedades: string[];
  pais_importacion: string;
  color_vino: "Blanco" | "Tinto";
  contenido_azucar: "Seco" | "Semiseco";
  contenido_carbonico: "Tranquilo";
  tipo_crianza: string;
}

export interface Paises {
  id: number;
  pais: string;
}

export enum Tipo {
  Blanco = "Blanco",
  Tinto = "Tinto",
}

export interface Variedades {
  id: number;
  tipo: Tipo;
  variedad: string;
}

export interface Peticion {
  nombre: string;
  variedades: VariedadesID;
}

export interface VariedadesID{
  variedad: string;
}