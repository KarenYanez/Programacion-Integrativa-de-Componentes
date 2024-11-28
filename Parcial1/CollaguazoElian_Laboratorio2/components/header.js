class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                h1 { color: #4CAF50; text-align: center; font-size: 2em; }
                header { background: #f4f4f4; padding: 10px; }
            </style>
            <header>
                <h1>Laboratorio nro. 2</h1>
            </header>
        `;
    }
}
customElements.define("app-header", HeaderComponent);
