import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("muestra el nombre del desarrollador", () => {
    render(<Footer />);

    expect(
      screen.getByText(/Faiber Santiago Cano/i)
    ).toBeInTheDocument();
  });

  it("muestra el texto de derechos reservados", () => {
    render(<Footer />);

    expect(
      screen.getByText(/Todos los derechos reservados/i)
    ).toBeInTheDocument();
  });
});