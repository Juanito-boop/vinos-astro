export interface Wines {
  id:         number;
  nombre:     string;
  precio:     number;
  variedad:   number;
  id_unica:   number;
  url_imagen: string;
  variedades: Variedades;
  paises:     Paises;
}

export interface Paises {
  id:   number;
  pais: string;
}

export interface Variedades {
  id:       number;
  tipo:     string;
  variedad: string;
}

export interface VinosOrganizados {
  [key: string]: Wines[];
}

export interface CarouselReactProps {
  titulo: string;
  vinos: Wines[];
}