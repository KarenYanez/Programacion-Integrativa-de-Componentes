class CustomTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; }
                th { background-color: #4CAF50; color: white; }
            </style>
            <table>
                <thead>
                    <tr><th>Nombre</th><th>Email</th><th>Teléfono</th></tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                const rows = data.map(user => `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                    </tr>
                `).join('');
                this.shadowRoot.querySelector('tbody').innerHTML = rows;
            });
    }
}
customElements.define("custom-table", CustomTable);
