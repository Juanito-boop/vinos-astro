import ModalCarrito from '@/components/modales/carrito/ModernModalWithCartIcon';
import { GlobalSelectionProvider, useGlobalSelection } from '@/hooks/useGlobalSelection';
import { useState } from 'react';
import type { AsideMainClientProps } from './interface';

// Props interface
const RenderList = ({ items, title, storageKey }: { items: { id: number; name: string, arreglo: string }[], title: string, storageKey: string }) => {
  const { getSelectedItems, toggleItem } = useGlobalSelection();
  const selectedItems = getSelectedItems(storageKey);

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
              checked={selectedItems.includes(item.name)}
              onChange={() => toggleItem(storageKey, item.name)}
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
  const { clearAllSelections } = useGlobalSelection();

  return (
    <GlobalSelectionProvider>
      <aside className="flex flex-col rounded-l-xl bg-normalColor11">
        <div className='mx-auto mt-3'>
          <ModalCarrito />
        </div>
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
          storageKey="selectedItems_variedades"
        />
        <RenderList
          items={paises.map((p) => ({
            id: p.id,
            name: p.pais,
            arreglo: 'paises'
          }))}
          title="PAISES"
          storageKey="selectedItems_paises"
        />
        <button
          className="mt-4 p-2 bg-red-500 text-white rounded-lg mx-auto"
          onClick={clearAllSelections} // Llama a la función para limpiar
        >
          Limpiar Filtros
        </button>
      </aside>
    </GlobalSelectionProvider>
  );
}