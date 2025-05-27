class AirQualityChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.chart = null;
  }

  connectedCallback() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const response = await fetch("https://run.mocky.io/v3/2ea2871b-a7e1-4de1-b66a-f8c7ddf57f05");
      if (!response.ok) throw new Error('Error al obtener datos');
      const data = await response.json();
      this.renderChart(data);
    } catch (error) {
      this.shadowRoot.innerHTML = `<p>Error cargando gráfico</p>`;
      console.error(error);
    }
  };

  renderChart = (data) => {
    this.shadowRoot.innerHTML = `
      <style>
        .chart-container {
          margin-left: 220px;
          padding: 2rem;
          max-width: 700px;
        }
        canvas {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
      </style>
      <div class="chart-container">
        <canvas id="airChart"></canvas>
      </div>
    `;

    const ctx = this.shadowRoot.getElementById('airChart').getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['PM2.5', 'PM10', 'CO₂', 'O₃'],
        datasets: [{
          label: 'Concentración',
          data: [data.pm25, data.pm10, data.co2, data.o3],
          backgroundColor: [
            '#3498db',
            '#2ecc71',
            '#f1c40f',
            '#e74c3c'
          ],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.raw} µg/m³`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'µg/m³ o ppm'
            }
          }
        }
      }
    });
  };
}

customElements.define('air-quality-chart', AirQualityChart);
