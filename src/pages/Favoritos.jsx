import { useFavorites } from "../context/FavoritesContext";

export default function Favoritos() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <section>
      <h1>Mis favoritos</h1>

      {favorites.length === 0 ? (
        <p>Aún no tienes productos favoritos.</p>
      ) : (
        <div>
          {favorites.map((producto) => (
            <article key={producto.id}>
              <h2>{producto.nombre}</h2>
              <p>Categoría: {producto.categoria}</p>

              <button onClick={() => toggleFavorite(producto)}>
                Quitar de favoritos
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}