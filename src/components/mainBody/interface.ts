import type { EmblaOptionsType } from "embla-carousel";

export interface Wines {
  id:         number;
  nombre:     string;
  precio:     number;
  id_unica:   number;
  url_imagen: string;
  bodega:     string;
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

export interface EmblaCarouselProps {
  titulo: string;
  options?: EmblaOptionsType;
  vinos: Wines[];
};