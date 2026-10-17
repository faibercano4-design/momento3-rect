import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (product) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (favorite) => favorite.id === product.id
      );

      if (exists) {
        return currentFavorites.filter(
          (favorite) => favorite.id !== product.id
        );
      }

      return [...currentFavorites, product];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}