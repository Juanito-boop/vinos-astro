interface Variedades {
  id: number;
  variedad: string;
}

export interface AsideMainClientProps {
  variedades: Variedades[];
}

export interface RenderListProps {
  items: { id: number; name: string; arreglo: string }[];
  title: string;
}