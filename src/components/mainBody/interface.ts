import type { EmblaOptionsType } from "embla-carousel";

export interface Wines {
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