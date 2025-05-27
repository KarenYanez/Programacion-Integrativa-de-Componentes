class DataCrud extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.recommendations = [
      { id: 1, texto: "Usa mascarilla en días contaminados" },
      { id: 2, texto: "Evita hacer ejercicio al aire libre durante alertas" }
    ];
    this.editingId = null;
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

  // Cargar desde localStorage
  loadFromStorage = () => {
    const data = localStorage.getItem("airguard-recommendations");
    return data ? JSON.parse(data) : [
      { id: 1, texto: "Usa mascarilla en días contaminados" },
      { id: 2, texto: "Evita hacer ejercicio al aire libre durante alertas" }
    ];
  };

  // Guardar en localStorage
  saveToStorage = () => {
    localStorage.setItem("airguard-recommendations", JSON.stringify(this.recommendations));
  };

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

      <div class="container">
        <h2>Recomendaciones de Protección</h2>
        <form id="recommendation-form">
          <input type="text" id="reco-input" placeholder="Escribe una recomendación" required />
          <button type="submit">${this.editingId ? "Actualizar" : "Agregar"}</button>
        </form>
        <ul>
          ${this.recommendations.map(r => `
            <li>
              ${r.texto}
              <div class="actions">
                <button class="edit" data-id="${r.id}">Editar</button>
                <button class="delete" data-id="${r.id}">Eliminar</button>
              </div>
            </li>
          `).join("")}
        </ul>
      </div>
    `;

    this.shadowRoot.getElementById("recommendation-form").onsubmit = this.handleSubmit;

    this.shadowRoot.querySelectorAll(".edit").forEach(btn => {
      btn.onclick = () => this.editReco(btn.dataset.id);
    });

    this.shadowRoot.querySelectorAll(".delete").forEach(btn => {
      btn.onclick = () => this.deleteReco(btn.dataset.id);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const input = this.shadowRoot.getElementById("reco-input");
    const texto = input.value.trim();

    if (!texto) return;

    if (this.editingId) {
      const reco = this.recommendations.find(r => r.id == this.editingId);
      reco.texto = texto;
      this.editingId = null;
    } else {
      const nueva = {
        id: Date.now(),
        texto
      };
      this.recommendations.push(nueva);
    }

    input.value = "";
    this.render();
  };

  editReco = (id) => {
    const reco = this.recommendations.find(r => r.id == id);
    this.editingId = id;
    this.shadowRoot.getElementById("reco-input").value = reco.texto;
  };

  deleteReco = (id) => {
    this.recommendations = this.recommendations.filter(r => r.id != id);
    this.render();
  };
}

customElements.define("user-recommendations", UserRecommendations);
