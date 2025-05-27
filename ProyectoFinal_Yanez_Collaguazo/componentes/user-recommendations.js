// user-recommendations.js
class UserRecommendations extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.recommendations = [
      'Usa mascarilla si los niveles son altos',
      'Evita ejercicio al aire libre en horas pico'
    ];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ul { list-style: disc; margin-left: 1.5rem; }
        li { margin: .5rem 0; }
      </style>
      <h3>Recomendaciones</h3>
      <ul>
        ${this.recommendations.map(r => `<li>${r}</li>`).join('')}
      </ul>
    `;
  }
}
customElements.define('user-recommendations', UserRecommendations);