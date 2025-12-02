const API = "http://localhost:3000";

async function agregarHistoria() {
    const titulo = document.getElementById("titulo").value;
    const contenido = document.getElementById("contenido").value;

    await fetch(API + "/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, contenido })
    });

    alert("Historia agregada!");
    buscar();
}

async function buscar() {
    const q = document.getElementById("busqueda").value;
    const res = await fetch(API + "/historias?q=" + q);
    const historias = await res.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    historias.forEach(h => {
        lista.innerHTML += `
            <div style="border:1px solid #000; padding:10px; margin:10px;">
                <h3>${h.titulo}</h3>
                <p>${h.contenido}</p>
                <button onclick="eliminar(${h.id})">Eliminar</button>
            </div>
        `;
    });
}

async function eliminar(id) {
    await fetch(API + "/eliminar/" + id, { method: "DELETE" });
    buscar();
}

buscar();
