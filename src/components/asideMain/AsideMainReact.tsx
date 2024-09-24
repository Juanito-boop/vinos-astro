import { GlobalSelectionProvider, useGlobalSelection } from '@/hooks/useGlobalSelection';
import { useEffect, useState } from 'react';
import type { AsideMainClientProps } from './interface';

const RenderList = ({ items, title, storageKey }: { items: { id: number; name: string, arreglo: string }[], title: string, storageKey: string }) => {
  const { toggleItem, clearSelectionForKey } = useGlobalSelection();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const areAllChecked = selectedItems.length === items.length && items.length > 0;

  useEffect(() => {
    if (areAllChecked) {
      clearSelectionForKey(storageKey);
    }
  }, [areAllChecked, storageKey]);

  const handleCheckboxChange = (itemName: string) => {
    toggleItem(storageKey, itemName);
    setSelectedItems((prevItems) => {
      const updatedItems = prevItems.includes(itemName)
        ? prevItems.filter(item => item !== itemName)
        : [...prevItems, itemName];
      localStorage.setItem(storageKey, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setSelectedItems(storedItems);
  }, [storageKey]);

  return (
    <section className="w-full col-span-1 pb-2 border-t bg-normalColor11 border-principalColor1 rounded-b-xl">
      <span className="flex items-center justify-center my-2 text-xl font-bold text-[#fdcd57]">
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
              onChange={() => {
                handleCheckboxChange(item.name);
                window.location.reload();
              }}
              className="mr-2"
            />
            <label className='w-full text-balance text-white' htmlFor={`checkbox-${item.id}`}>{item.name}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

const AsideWithFilters = ({ variedades }: Readonly<AsideMainClientProps>) => {
  const { clearAllSelections } = useGlobalSelection();
  // const { cartItemsCount } = useCart();
  const [, setCartUpdate] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      setCartUpdate(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleClearFilters = () => {
    clearAllSelections();
    window.location.reload();
  };

  return (
    <aside className="flex flex-col rounded-l-xl bg-normalColor11">
      <span className="flex items-center justify-center text-[1.5em] font-bold text-[#fdcd57] bg-normalColor11 rounded-t-xl px-5 py-2">FILTROS</span>
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
        onClick={handleClearFilters}
      >
        Limpiar Filtro
      </button>
    </aside>
  );
};

const AsideMainReact = ({ variedades }: Readonly<AsideMainClientProps>) => (
  <GlobalSelectionProvider>
    <AsideWithFilters variedades={variedades} />
  </GlobalSelectionProvider>
);

export default AsideMainReact;