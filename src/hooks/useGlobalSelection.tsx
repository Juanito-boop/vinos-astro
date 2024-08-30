import { useState, useContext, createContext, useEffect } from 'react';

// Crear un contexto para el estado global
const GlobalSelectionContext = createContext<{
  getSelectedItems: (key: string) => string[];
  toggleItem: (key: string, item: string) => void;
  clearAllSelections: () => void;
}>({
  getSelectedItems: () => [],
  toggleItem: () => { },
  clearAllSelections: () => { },
});

// Hook personalizado para usar el contexto
export const useGlobalSelection = () => {
  return useContext(GlobalSelectionContext);
};

// Proveedor del contexto
export const GlobalSelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selections, setSelections] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedSelections: { [key: string]: string[] } = {};
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith('selectedItems_')) {
          updatedSelections[key] = JSON.parse(localStorage.getItem(key) || '[]');
        }
      }
      setSelections(updatedSelections);
    };

    window.addEventListener('storage', handleStorageChange);

    // Llamar handleStorageChange para sincronizar el estado inicial
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getSelectedItems = (key: string) => {
    return selections[key] || [];
  };

  const toggleItem = (key: string, item: string) => {
    const selectedItems = getSelectedItems(key);
    const newSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];

    // Ordenar alfabéticamente los elementos seleccionados
    const sortedSelectedItems = newSelectedItems.sort((a, b) =>
      a.localeCompare(b, 'es', { sensitivity: 'base' })
    );

    setSelections(prevSelections => ({
      ...prevSelections,
      [key]: sortedSelectedItems,
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(sortedSelectedItems));
    }
  };

  const clearAllSelections = () => {
    if (typeof window !== 'undefined') {
      // Recorre todas las claves en localStorage y elimina las que comienzan con 'selectedItems_'
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith('selectedItems_')) {
          localStorage.clear();
        }
      }
      // Limpia también el estado interno
      setSelections({});
    }
  };


  return (
    <GlobalSelectionContext.Provider value={{ getSelectedItems, toggleItem, clearAllSelections }}>
      {children}
    </GlobalSelectionContext.Provider>
  );
};
