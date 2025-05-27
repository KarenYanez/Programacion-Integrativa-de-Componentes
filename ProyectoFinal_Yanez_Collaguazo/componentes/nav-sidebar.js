class NavSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        aside {
          width: 200px;
          height: 100vh;
          background-color: #2c3e50;
          color: white;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          position: fixed;
          top: 0;
          left: 0;
          font-family: Arial, sans-serif;
          box-shadow: 2px 0 5px rgba(0,0,0,0.1);
        }

        h2 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        nav a {
          color: white;
          text-decoration: none;
          padding: 0.5rem 0;
          transition: background 0.3s;
          border-radius: 4px;
        }

        nav a:hover {
          background-color: #34495e;
        }
      </style>

      <aside>
        <h2>Menú</h2>
        <nav>
          <a href="#" data-target="dashboard">📊 Dashboard</a><br>
          <a href="#" data-target="recomendaciones">💡Recomendaciones</a><br>
          <a href="#" data-target="educativo">📚 Educativo</a>
        </nav>
      </aside>
    `;

    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const section = e.target.dataset.target;
        alert(`Ir a sección: ${section}`); // Luego se puede conectar con el sistema de navegación real
      });
    });
  };
}

customElements.define("nav-sidebar", NavSidebar);
