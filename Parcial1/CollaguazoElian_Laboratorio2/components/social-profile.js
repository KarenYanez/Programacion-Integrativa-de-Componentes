class SocialProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; padding: 20px; font-family: Arial; }
            </style>
            <div>
                <h2>Perfil de red social</h2>
                <h3>Facebook</h3>
                <p>Nombre: Elian Collaguazo</p>
                <p>Email: collaguazoelian@hotmail.com</p>
                <p>Teléfono: 099 162 361</p>
            </div>
        `;
    }
}
customElements.define("social-profile", SocialProfile);
