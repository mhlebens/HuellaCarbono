async function listarConsumoEnergia() {
    const res = await fetch(`${BASE_URL}/consumoEnergia`);
    const data = res.json();

    const tbdoy = document.querySelector("#tablaEnergia tbody");
    tbdoy.innerHTML = "";

    data.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>${c._id}</td>
                <td>${c.usuario}</td>
                <td>${c.kwh}</td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarConsumo('${c._id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

async function eliminarConsumo(id) {
    await fetch(`${BASE_URL}/consumoEnergia/${id}`, {
        method: "DELETE"
    });

    mostrarAlerta("Registro eliminado");
    listarConsumoEnergia();

}