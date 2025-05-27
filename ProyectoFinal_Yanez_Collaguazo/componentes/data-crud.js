class DataCrud extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.recomendaciones = JSON.parse(localStorage.getItem('recomendaciones')) || [];
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('#form').addEventListener('submit', (e) => this.agregarRecomendacion(e));
  }

  guardarEnLocalStorage() {
    localStorage.setItem('recomendaciones', JSON.stringify(this.recomendaciones));
    this.dispatchEvent(new CustomEvent('data-updated', {
      bubbles: true,
      composed: true,
      detail: this.recomendaciones
    }));
  }

  agregarRecomendacion(e) {
    e.preventDefault();
    const input = this.shadowRoot.querySelector('#recomendacion');
    const texto = input.value.trim();
    const id = this.shadowRoot.querySelector('#id').value;

    if (!texto) return;

    if (id === '') {
      this.recomendaciones.push({ id: Date.now(), texto });
    } else {
      const index = this.recomendaciones.findIndex(r => r.id == id);
      this.recomendaciones[index].texto = texto;
    }

    input.value = '';
    this.shadowRoot.querySelector('#id').value = '';
    this.guardarEnLocalStorage();
    this.render();
  }

  editarRecomendacion(id) {
    const rec = this.recomendaciones.find(r => r.id == id);
    this.shadowRoot.querySelector('#recomendacion').value = rec.texto;
    this.shadowRoot.querySelector('#id').value = rec.id;
  }

  eliminarRecomendacion(id) {
    this.recomendaciones = this.recomendaciones.filter(r => r.id != id);
    this.guardarEnLocalStorage();
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: #f9f9f9;
          padding: 1em;
          border-radius: 10px;
          max-width: 500px;
          margin: auto;
          font-family: sans-serif;
        }
        h3 {
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 0.5em;
          margin-bottom: 1em;
        }
        input, button {
          padding: 0.5em;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          background: #fff;
          margin-bottom: 0.5em;
          padding: 0.5em;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
        }
        .actions button {
          margin-left: 0.5em;
        }
      </style>
      <h3>Gestión de Recomendaciones</h3>
      <form id="form">
        <input type="hidden" id="id">
        <input type="text" id="recomendacion" placeholder="Nueva recomendación">
        <button type="submit">Guardar</button>
      </form>
      <ul>
        ${this.recomendaciones.map(r => `
          <li>
            ${r.texto}
            <span class="actions">
              <button onclick="this.getRootNode().host.editarRecomendacion(${r.id})">✏️</button>
              <button onclick="this.getRootNode().host.eliminarRecomendacion(${r.id})">🗑️</button>
            </span>
          </li>
        `).join('')}
      </ul>
    `;
  }
}

customElements.define('data-crud', DataCrud);
