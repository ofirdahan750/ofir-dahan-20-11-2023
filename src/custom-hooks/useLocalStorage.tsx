export const useLocalStorage = () => {
  const setLocalStorageItem = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error saving to local storage", err);
    }
  };

  const getLocalStorageItem = (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error("Error getting from local storage", err);
      return null;
    }
  };

  return { setLocalStorageItem, getLocalStorageItem };
};
