// app.js

console.log("App cargada correctamente.");

// Ejemplo simple: cargar historias desde un arreglo
const historias = [
    {
        titulo: "La sombra del pasillo",
        texto: "Cada noche veía una sombra pasar, hasta que un día decidió seguirla..."
    },
    {
        titulo: "El susurro en la ventana",
        texto: "Decían que si escuchabas el susurro tres veces, no despertarías al día siguiente."
    }
];

function cargarHistorias() {
    const contenedor = document.getElementById("lista-historias");

    if (!contenedor) return;

    historias.forEach(h => {
        const card = document.createElement("div");
        card.classList.add("historia-card");

        card.innerHTML = `
            <h3>${h.titulo}</h3>
            <p>${h.texto}</p>
        `;

        contenedor.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", cargarHistorias);
