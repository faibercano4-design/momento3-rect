import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="home-page">
      <section className="hero-home">
        <div className="hero-text">
          <span className="hero-badge">SANTIDEV PROJECT</span>

          <h1>
            Tu plataforma,
            <br />
            <span>simple y moderna.</span>
          </h1>

          <p>
            Explora nuestro catálogo, descubre nuevos productos
            y guarda tus favoritos en un solo lugar.
          </p>

          <div className="hero-actions">
            <Link to="/catalogo" className="hero-primary">
              Explorar catálogo
            </Link>

            <Link to="/favoritos" className="hero-secondary">
              Ver favoritos
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-icon">✦</div>

          <h2>Todo en un solo lugar</h2>

          <p>
            Busca productos y crea tu propia lista de favoritos.
          </p>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🔎</div>
          <h2>Busca</h2>
          <p>
            Encuentra rápidamente los productos que necesitas.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">❤️</div>
          <h2>Guarda</h2>
          <p>
            Agrega tus productos favoritos con un solo clic.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h2>Explora</h2>
          <p>
            Navega por la plataforma de forma rápida y sencilla.
          </p>
        </div>
      </section>
    </div>
  );
}