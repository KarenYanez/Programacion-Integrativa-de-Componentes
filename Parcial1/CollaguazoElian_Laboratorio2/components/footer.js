class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                footer { background: #4CAF50; color: white; text-align: center; padding: 10px; }
            </style>
            <footer>
                <p>Universidad de las Fuerzas Armadas "ESPE"</p>
                <p>Programación Integrativa</p>
            </footer>
        `;
    }
}
customElements.define("app-footer", FooterComponent);
