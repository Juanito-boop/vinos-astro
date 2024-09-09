export interface Wine {
  id:                  number;
  nombre:              string;
  variedad:            number;
  anada:               number;
  bodega:              string;
  pais:                number;
  region:              string;
  precio:              number;
  stock:               number;
  tipo:                Tipo;
  nivel_alcohol:       number;
  tipo_barrica:        string;
  descripcion:         string;
  notas_cata:          string;
  temperatura_consumo: string;
  maridaje:            string;
  activo:              boolean;
  id_unica:            number;
  url_imagen:          string;
  promocion:           boolean;
  busqueda:            number;
  variedades:          Variedades;
  paises:              Paises;
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