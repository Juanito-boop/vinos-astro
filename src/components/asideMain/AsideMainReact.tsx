import { useState } from 'react';
import ModalCarrito from '../modales/carrito/ModalCarrito';

interface Variedades {
  id: number;
  variedad: string;
}

interface Paises {
  id: number;
  pais: string;
}

interface AsideMainClientProps {
  variedades: Variedades[];
  paises: Paises[];
}

// Props interface
const RenderList = ({ items, title }: { items: { id: number; name: string, arreglo: string }[], title: string }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (itemName: string, arreglo: string) => {
    const newSelectedItems = selectedItems.includes(itemName)
      ? selectedItems.filter(item => item !== itemName)
      : [...selectedItems, itemName];

    // Ordena los elementos seleccionados alfabéticamente
    const sortedSelectedItems = newSelectedItems.toSorted((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

    setSelectedItems(sortedSelectedItems);

    const queryString = sortedSelectedItems.length > 0
      ? `?${arreglo}=${sortedSelectedItems.join(',')}`
      : '';

    window.history.pushState(null, '', queryString || window.location.pathname);
  };

  return (
    <section className="pb-2 border-t bg-normalColor11 border-principalColor1 rounded-b-xl">
      <span className="flex items-center justify-center my-2 text-xl font-bold text-principalColor1">
        {title}
      </span>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center pl-3 text-sm font-semibold text-black">
            <input
              type="checkbox"
              id={`checkbox-${item.id}`}
              name={item.name}
              value={item.name}
              onChange={() => handleCheckboxChange(item.name, item.arreglo)}
              className="mr-2"
            />
            <label htmlFor={`checkbox-${item.id}`}>{item.name}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default function AsideMainReact({ variedades, paises }: Readonly<AsideMainClientProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <aside className="flex flex-col max-w-[20%] min-w-[15%] rounded-l-xl bg-normalColor11">
      <button
        className="w-16 h-16 p-3 mx-auto my-4 border border-principalColor1 rounded-lg"
        onClick={handleOpenModal}
      >
        <picture>
          <img src="/carrito.svg" alt="Carrito" />
        </picture>
      </button>
      {isModalOpen && (
        <ModalCarrito
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <span className="flex items-center justify-center text-[1.5em] font-bold text-principalColor1 bg-normalColor11 rounded-t-xl px-5 py-2">
        {'FILTROS'}
      </span>
      <RenderList
        items={variedades.map((v) => ({
          id: v.id,
          name: v.variedad,
          arreglo: "variedades"
        }))}
        title="VARIEDADES"
      />
      <RenderList
        items={paises.map((p) => ({
          id: p.id,
          name: p.pais,
          arreglo: 'paises'
        }))}
        title="PAISES"
      />
    </aside>
  );
}
