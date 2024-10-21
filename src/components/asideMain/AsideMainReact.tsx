import { GlobalSelectionProvider, useGlobalSelection } from '@/hooks/useGlobalSelection';
import { useEffect, useState } from 'react';
import type { AsideMainClientProps } from './interface';

const RenderList = ({ items, title, storageKey, setIsAnyChecked }: { items: { id: number; name: string, arreglo: string }[], title: string, storageKey: string, isAnyChecked: boolean, setIsAnyChecked: (value: boolean) => void }) => {
  const { toggleItem } = useGlobalSelection();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (itemName: string) => {
    toggleItem(storageKey, itemName);
    setSelectedItems((prevItems) => {
      const updatedItems = prevItems.includes(itemName)
        ? prevItems.filter(item => item !== itemName)
        : [...prevItems, itemName];
      localStorage.setItem(storageKey, JSON.stringify(updatedItems));
      setIsAnyChecked(updatedItems.length > 0);
      return updatedItems;
    });
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setSelectedItems(storedItems);
    setIsAnyChecked(storedItems.length > 0);
  }, [storageKey, setIsAnyChecked]);

  const handleTitleClick = () => {

  };

  return (
    <section className="w-full col-span-1 pb-2 border-t bg-normalColor11 border-principalColor1 rounded-b-xl">
      <span 
        className="flex items-center justify-center my-2 text-xl font-bold text-[#fdcd57] cursor-pointer"
        onClick={handleTitleClick}
      >
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

const AsideWithFilters = ({ variedades, paises }: Readonly<AsideMainClientProps>) => {
  const { clearAllSelections } = useGlobalSelection();
  const [isAnyChecked, setIsAnyChecked] = useState(false);

  const handleClearFilters = () => {
    clearAllSelections();
    window.location.reload();
  };

  return (
    <aside className="flex flex-col rounded-l-xl bg-normalColor11">
      <span className="flex items-center justify-center text-[1.5em] font-bold text-[#fdcd57] bg-normalColor11 rounded-t-xl px-5 py-2">FILTROS</span>
      {/* <span className='text-2xl text-[#fdcd57] text-center px-2'>Los Filtros no estan disponibles por el momento</span> */}
      <RenderList
        items={variedades.map((v) => ({
          id: v.id,
          name: v.variedad,
          arreglo: "variedades"
        }))}
        title="VARIEDADES"
        storageKey="selectedItems_variedades"
        isAnyChecked={isAnyChecked}
        setIsAnyChecked={setIsAnyChecked}
      />
      <RenderList
        items={paises.map((p) => ({
          id: p.id, 
          name: p.pais,
          arreglo: "paises"
        }))}
        title="PAISES"
        storageKey="selectedItems_paises"
        isAnyChecked={isAnyChecked}
        setIsAnyChecked={setIsAnyChecked}
      />
      <button
        className="p-2 mx-auto my-4 text-white bg-red-500 rounded-lg"
        onClick={handleClearFilters}
      >
        Limpiar Filtro
      </button>
    </aside>
  );
};

const AsideMainReact = ({ variedades, paises }: Readonly<AsideMainClientProps>) => (
  <GlobalSelectionProvider>
    <AsideWithFilters variedades={variedades} paises={paises} />
  </GlobalSelectionProvider>
);

export default AsideMainReact;