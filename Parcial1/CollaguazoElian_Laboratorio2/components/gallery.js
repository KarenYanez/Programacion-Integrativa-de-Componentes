class GalleryComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .gallery { display: flex; flex-wrap: wrap; gap: 10px; }
                img { width: 100px; height: 100px; object-fit: cover; }
            </style>
            <div class="gallery"></div>
        `;
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
            .then(res => res.json())
            .then(data => {
                const images = data.results.map(pokemon => `
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png" alt="${pokemon.name}">
                `).join('');
                this.shadowRoot.querySelector('.gallery').innerHTML = images;
            });
    }
}
customElements.define("gallery-page", GalleryComponent);
