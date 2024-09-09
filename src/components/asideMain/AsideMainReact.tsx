import ModalCarrito from '@/components/modales/carrito/ModernModalWithCartIcon';
import { GlobalSelectionProvider, useGlobalSelection } from '@/hooks/useGlobalSelection';
import type { AsideMainClientProps } from './interface';
import { useEffect } from 'react';

const RenderList = ({ items, title, storageKey }: { items: { id: number; name: string, arreglo: string }[], title: string, storageKey: string }) => {
  const { getSelectedItems, toggleItem, clearSelectionForKey } = useGlobalSelection();
  const selectedItems = getSelectedItems(storageKey);
  const areAllChecked = selectedItems.length === items.length && items.length > 0;

  useEffect(() => {
    if (areAllChecked) {
      clearSelectionForKey(storageKey);
    }
  }, [areAllChecked, storageKey]);

  return (
    <section className="w-full col-span-1 pb-2 border-t bg-normalColor11 border-principalColor1 rounded-b-xl">
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
            <label className='w-full text-balance' htmlFor={`checkbox-${item.id}`}>{item.name}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

function AsideWithFilters({ variedades, paises }: Readonly<AsideMainClientProps>) {
  const { clearAllSelections } = useGlobalSelection();

  return (
    <aside className="flex flex-col rounded-l-xl bg-normalColor11">
      <div className='mx-auto mt-3'>
        <ModalCarrito />
      </div>
      <span className="flex items-center justify-center text-[1.5em] font-bold text-principalColor1 bg-normalColor11 rounded-t-xl px-5 py-2">FILTROS</span>
      <RenderList
        items={variedades.map((v) => ({
          id: v.id,
          name: v.variedad,
          arreglo: "variedades"
        }))}
        title="VARIEDADES"
        storageKey="selectedItems_variedades"
      />
      <button
        className="p-2 mx-auto mt-4 text-white bg-red-500 rounded-lg"
        onClick={clearAllSelections}
      >
        Limpiar Filtro
      </button>
    </aside>
  );
}

export default function AsideMainReact({ variedades, paises }: Readonly<AsideMainClientProps>) {
  return (
    <GlobalSelectionProvider>
      <AsideWithFilters variedades={variedades} paises={paises} />
    </GlobalSelectionProvider>
  );
}