import { useState, useContext, createContext, useEffect, useMemo } from 'react';

const GlobalSelectionContext = createContext<{
  getSelectedItems: (key: string) => string[];
  toggleItem: (key: string, item: string) => void;
  clearAllSelections: () => void;
  clearSelectionForKey: (key: string) => void;
}>({
  getSelectedItems: () => [],
  toggleItem: () => {},
  clearAllSelections: () => {},
  clearSelectionForKey: () => {}
});

export const useGlobalSelection = () => {
  return useContext(GlobalSelectionContext);
};

export const GlobalSelectionProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [selections, setSelections] = useState<{ [key: string]: string[] }>({});

  const handleStorageChange = () => {
    const updatedSelections: { [key: string]: string[] } = {};
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith('selectedItems_')) {
        updatedSelections[key] = JSON.parse(localStorage.getItem(key) ?? '[]');
      }
    }
    setSelections(updatedSelections);
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getSelectedItems = (key: string) => {
    const selectedItems = selections[key] || [];
    return selectedItems;
  };


  const toggleItem = (key: string, item: string) => {
    const selectedItems = getSelectedItems(key);
    const newSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((i: string) => i !== item)
      : [...selectedItems, item];

    const sortedSelectedItems = newSelectedItems.toSorted((a: string, b: string) =>
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
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith('selectedItems_')) {
          localStorage.setItem(key, JSON.stringify([]));
        }
      }
      setSelections({});
    }
  };

  const clearSelectionForKey = (key: string) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [key]: []
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify([]));
    }
  };


  return useMemo(
    () => (
      <GlobalSelectionContext.Provider
        value={{ getSelectedItems, toggleItem, clearAllSelections, clearSelectionForKey }}
      >
        {children}
      </GlobalSelectionContext.Provider>
    ),
    [selections]
  );
};