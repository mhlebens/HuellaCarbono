async function listarCategorias() {
    const res = await fetch(`${BASE_URL}/categoriaReto`);
    const data = await res.json();

    const tbdoy = document.querySelector("#tablaCategoria tbody");
    tbdoy.innerHTML = "";

    data.forEach(c => {
        tbody.innerHTML += `
      <tr>
        <td>${c._id}</td>
        <td>${c.nombre}</td>
        <td>
          <button class="btn btn-danger" onclick="eliminarCategoria('${c._id}')">Eliminar</button>
        </td>
      </tr>
    `;
    });
}

async function crearCategoria(nombre) {
    await fetch(`${BASE_URL}/categoriaReto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre })
    });

    mostrarAlerta("Categoria creada");
}

async function eliminarCategoria(id) {
    await fetch(`${BASE_URL}/categoriaReto/${id}`, {
        method: "DELETE"
    });

    mostrarAlerta("Eliminado");
    listarCategorias();
}

