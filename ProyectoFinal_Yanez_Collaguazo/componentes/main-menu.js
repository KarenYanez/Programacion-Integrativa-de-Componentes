class MainMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: linear-gradient(90deg, #6a11cb, #2575fc);
          color: white;
          padding: 1rem;
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .menu-items {
          display: flex;
          gap: 1rem;
        }
        .menu-items a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s;
        }
        .menu-items a:hover {
          color: #ffe082;
        }
      </style>

      <nav>
        <div class="logo">🌍 AirGuard</div>
        <div class="menu-items">
          <a href="#" data-section="dashboard">Inicio</a>
          <a href="#" data-section="educativo">Educate</a>
          <a href="#" data-section="recomendaciones">Recomendaciones</a>
          <a href="#" data-section="acerca">Acerca</a>
        </div>
      </nav>
    `;

    this.shadowRoot.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const section = e.target.getAttribute('data-section');
        alert(`Navegar a la sección: ${section}`); // Esto se puede reemplazar con lógica real de navegación
      });
    });
  };
}

customElements.define('main-menu', MainMenu);
