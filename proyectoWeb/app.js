const API_URL ="http://localhost:3000/api/cursos";

async function obtenerCursos() {
    try {
        const response = await fetch(API_URL)
        const cursos = await response.json();

        mostrarCursos(cursos);
    }catch (error) {
        console.error("Error.",error);
    }
    
}

function mostrarCursos(cursos){
    const tabla = document.getElementById("tablaCursos");
    tabla.innerHTML ="";

    cursos.forEach(cursos => {
        const fila = document.createElement("tr");

        fila.innerHTML =`
            <td>${cursos.nombre}</td>
            <td>${cursos.descripcion}</td>
            <td>${cursos.duracion}</td>
        `;

        tabla.appendChild(fila);
    });
}

document.addEventListener("DOMContentLoaded", obtenerCursos);