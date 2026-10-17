import React from 'react';

export default function Footer() {
  const developerName = "Faiber Santiago Cano"; // Tu nombre dinámico
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <p>&copy; {currentYear} {developerName}. Todos los derechos reservados.</p>
    </footer>
  );
}