// Inyectar estilos al head
const createStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    body {
      margin: 0;
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    header, footer {
      background-color: #222;
      color: white;
      padding: 10px;
      text-align: center;
    }

    .main-container {
      display: flex;
      flex: 1;
    }

    aside {
      width: 200px;
      background-color: #f0f0f0;
      padding: 10px;
    }

    main {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
    }

    .gallery-item {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
      background-color: #fff;
    }

    .gallery-item img {
      max-width: 100%;
      height: auto;
    }

    form > div {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }

    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .error {
      color: red;
    }
  `;
  document.head.appendChild(style);
};

const createLayout = () => {
  const header = document.createElement("header");
  header.textContent = "Galería de Imágenes";

  const mainContainer = document.createElement("div");
  mainContainer.className = "main-container";

  const sidebar = document.createElement("aside");
  const btnRegistrar = document.createElement("button");
  btnRegistrar.textContent = "Registrar nueva imagen";
  btnRegistrar.addEventListener("click", setupRegisterPage);
  sidebar.appendChild(btnRegistrar);

  const main = document.createElement("main");
  main.id = "main-content"; // Este se va a actualizar dinámicamente

  const footer = document.createElement("footer");
  footer.textContent = "© 2025 Mi Galería";

  mainContainer.appendChild(sidebar);
  mainContainer.appendChild(main);

  document.body.append(header);
  document.body.append(mainContainer);
  document.body.append(footer);
};

let imagenes = JSON.parse(localStorage.getItem("imagenes")) || [
  { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAFIhXjEa4auEZpjZH12K4wdUAPOfiSSM1M7Tk_Psz8g&s&ec=72940542", descripcion: "Imagen 1" },
  { url: "https://blogs.uoc.edu/informatica/wp-content/uploads/sites/153/2017/03/cx-picture-100608993-primary-idge_.jpg", descripcion: "Imagen 2" }
];


const renderGallery = () => {
  const main = document.getElementById("main-content");
  main.innerHTML = ""; // Limpiar contenido

  imagenes.forEach(({ url, descripcion }) => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    const img = document.createElement("img");
    img.src = url;
    img.alt = descripcion;

    const desc = document.createElement("p");
    desc.textContent = descripcion;

    item.appendChild(img);
    item.appendChild(desc);
    main.appendChild(item);
  });
};


const setupRegisterPage = () => {
  const main = document.getElementById("main-content");
  main.innerHTML = ""; // Limpiar contenido

  const form = document.createElement("form");

  const campoURL = document.createElement("div");
  const lblURL = document.createElement("label");
  lblURL.textContent = "URL de la imagen";
  const inputURL = document.createElement("input");
  inputURL.type = "text";
  inputURL.required = true;
  campoURL.appendChild(lblURL);
  campoURL.appendChild(inputURL);

  const campoDesc = document.createElement("div");
  const lblDesc = document.createElement("label");
  lblDesc.textContent = "Descripción";
  const inputDesc = document.createElement("input");
  inputDesc.type = "text";
  inputDesc.required = true;
  campoDesc.appendChild(lblDesc);
  campoDesc.appendChild(inputDesc);

  const error = document.createElement("div");
  error.className = "error";

  const btn = document.createElement("button");
  btn.type = "submit";
  btn.textContent = "Guardar";

  form.appendChild(campoURL);
  form.appendChild(campoDesc);
  form.appendChild(error);
  form.appendChild(btn);

  // Evento de envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const url = inputURL.value.trim();
    const descripcion = inputDesc.value.trim();
  
    if (!url || descripcion.length < 3) {
      error.textContent = "Campos inválidos. Ingresa URL y descripción válida (mínimo 3 caracteres).";
      return;
    }
  
    imagenes.push({ url, descripcion });
    localStorage.setItem("imagenes", JSON.stringify(imagenes)); // <-- Guardar en localStorage
  
    renderGallery(); // Volver a la galería
  });
  

  main.appendChild(form);
};

document.addEventListener("DOMContentLoaded", () => {
  createStyles();
  createLayout();
  renderGallery(); // Carga inicial con las imágenes
});
