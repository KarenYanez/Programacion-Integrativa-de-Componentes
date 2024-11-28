class MainComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; padding: 20px; }
            </style>
            <slot></slot>
        `;
    }
}
customElements.define("app-main", MainComponent);
