import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../custom-hooks/useLocalStorage";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const { getLocalStorageItem } = useLocalStorage();

  useEffect(() => {
    const storedFavorites = getLocalStorageItem("favorites");
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  return (
    <section>
      {favorites.map((item, index) => (
        <pre key={index}>{JSON.stringify(item)}</pre>
      ))}
    </section>
  );
};

export default FavoritesPage;
