export interface CarouselProps {
  vinos: Wine[];
  page: number;
  itemsPerPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export interface CarouselSectionProps {
  vinos: Wine[];
  variedad: string;
}

export interface PaginationDotsProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (index: number) => void;
}

export interface Wine {
  id: number;
  nombre: string;
  precio: number;
  variedad: number;
  id_unica: number;
  url_imagen: string;
  variedades: Variedades;
  paises: Paises;
}

export interface Paises {
  pais: string;
}

export interface Variedades {
  variedad: string;
}
