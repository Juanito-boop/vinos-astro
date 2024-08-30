interface Variedades {
  id: number;
  variedad: string;
}

interface Paises {
  id: number;
  pais: string;
}

export interface AsideMainClientProps {
  variedades: Variedades[];
  paises: Paises[];
}

export interface RenderListProps {
  items: { id: number; name: string; arreglo: string }[];
  title: string;
}