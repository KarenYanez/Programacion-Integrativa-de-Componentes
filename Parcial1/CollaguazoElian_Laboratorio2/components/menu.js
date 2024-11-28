class MenuComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                nav { background: #333; color: white; padding: 10px; }
                a { color: white; text-decoration: none; margin-right: 10px; }
                a:hover { text-decoration: underline; }
            </style>
            <nav>
                <a href="#" data-page="profile">Perfil</a>
                <a href="#" data-page="table">Tabla</a>
                <a href="#" data-page="gallery">Galería</a>
            </nav>
        `;
        this.shadowRoot.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.dispatchEvent(new CustomEvent("navigate", { detail: page, bubbles: true, composed: true }));
            });
        });
    }
}
customElements.define("app-menu", MenuComponent);
