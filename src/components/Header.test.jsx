import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import { FavoritesProvider } from "../context/FavoritesContext";

describe("Header", () => {
  it("muestra el nombre de la aplicación", () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <Header />
        </FavoritesProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("SantiDev Project")).toBeInTheDocument();
  });

  it("muestra el enlace de favoritos con cero favoritos", () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <Header />
        </FavoritesProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Favoritos \(0\)/i)).toBeInTheDocument();
  });

  it("muestra los enlaces de navegación", () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <Header />
        </FavoritesProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
  });
});