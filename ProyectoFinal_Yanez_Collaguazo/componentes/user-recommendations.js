class UserRecommendations extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.recommendations = this.loadFromStorage();
    this.editingId = null;
  }

  connectedCallback() {
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

  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          margin-left: 220px;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }

        h2 {
          color: #2c3e50;
        }

        form {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        input {
          flex: 1;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        button {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background-color: #3498db;
          color: white;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #2980b9;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          background: #ecf0f1;
          padding: 10px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          border-radius: 6px;
        }

        .actions button {
          margin-left: 5px;
          background-color: #e67e22;
        }

        .actions button.delete {
          background-color: #e74c3c;
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
    this.saveToStorage(); // Guardar cambios
    this.render();
  };

  editReco = (id) => {
    const reco = this.recommendations.find(r => r.id == id);
    this.editingId = id;
    this.shadowRoot.getElementById("reco-input").value = reco.texto;
  };

  deleteReco = (id) => {
    this.recommendations = this.recommendations.filter(r => r.id != id);
    this.saveToStorage(); // Guardar cambios
    this.render();
  };
}

customElements.define("user-recommendations", UserRecommendations);
