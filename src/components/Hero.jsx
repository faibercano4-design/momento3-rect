import React from 'react';

export default function Hero() {
  const welcomeMessage = "Bienvenido a tu nueva plataforma";
  const currentYear = new Date().getFullYear();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2>{welcomeMessage}</h2>
        <p>Construyendo el futuro de tus aplicaciones paso a paso en este {currentYear}.</p>
        <button className="hero-button">Comenzar Ahora</button>
      </div>
    </section>
  );
}