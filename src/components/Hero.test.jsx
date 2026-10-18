import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hero from "./Hero";

describe("Hero", () => {
  it("muestra el mensaje de bienvenida", () => {
    render(<Hero />);

    expect(
      screen.getByText("Bienvenido a tu nueva plataforma")
    ).toBeInTheDocument();
  });

  it("muestra el botón Comenzar Ahora", () => {
    render(<Hero />);

    expect(
      screen.getByRole("button", { name: "Comenzar Ahora" })
    ).toBeInTheDocument();
  });
});