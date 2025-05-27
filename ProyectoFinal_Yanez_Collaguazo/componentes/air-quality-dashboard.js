class AirQualityDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = null;
  }

  connectedCallback() {
    this.fetchAirData();
  }

  fetchAirData = async () => {
    try {
      // Simulación con datos estáticos o se puede reemplazar con una API real
      const response = await fetch('./data.json'); // Puedes usar también una API real
      if (!response.ok) throw new Error('Error al obtener los datos');
      this.data = await response.json();
      this.render();
    } catch (error) {
      console.error("Error al cargar datos de calidad del aire:", error);
      this.shadowRoot.innerHTML = `<p style="color:red;">Error al cargar datos</p>`;
    }
  };

  render = () => {
    if (!this.data) return;

    const { pm25, pm10, co2, o3 } = this.data;

    this.shadowRoot.innerHTML = `
      <style>
        .dashboard {
          margin-left: 220px;
          padding: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          font-family: Arial, sans-serif;
        }

        .card {
          background: #f0f9ff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          padding: 1rem;
          text-align: center;
          transition: transform 0.3s;
        }

        .card:hover {
          transform: scale(1.05);
        }

        h3 {
          margin: 0.5rem 0;
          color: #2c3e50;
        }

        .value {
          font-size: 2rem;
          color: #2980b9;
          font-weight: bold;
        }
      </style>

      <div class="dashboard">
        <div class="card">
          <h3>PM2.5</h3>
          <div class="value">${pm25} µg/m³</div>
        </div>
        <div class="card">
          <h3>PM10</h3>
          <div class="value">${pm10} µg/m³</div>
        </div>
        <div class="card">
          <h3>CO₂</h3>
          <div class="value">${co2} ppm</div>
        </div>
        <div class="card">
          <h3>Ozono (O₃)</h3>
          <div class="value">${o3} µg/m³</div>
        </div>
      </div>
    `;
  };
}

customElements.define("air-quality-dashboard", AirQualityDashboard);
