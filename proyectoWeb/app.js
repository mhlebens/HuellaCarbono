// ============================================================
//  HuellaCarbonoDB — app.js
//  Lógica compartida para consumir la API REST con fetch()
//  API base: http://localhost:3000/api
// ============================================================

const BASE_URL = "http://localhost:3000/api";

// ------------------------------------------------------------
// Utilidades generales
// ------------------------------------------------------------

/** Muestra u oculta un mensaje de alerta en el elemento #alerta */
function mostrarAlerta(mensaje, tipo = "success") {
  const alerta = document.getElementById("alerta");
  if (!alerta) return;
  alerta.className = `alert alert-${tipo}`;
  alerta.textContent = mensaje;
  alerta.classList.remove("d-none");
  setTimeout(() => alerta.classList.add("d-none"), 3500);
}

/** Lee el parámetro ?id= de la URL actual */
function obtenerIdDeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/** Redirige a otra página */
function redirigir(url, delay = 1200) {
  setTimeout(() => (window.location.href = url), delay);
}

// ------------------------------------------------------------
// Función genérica de fetch con manejo de errores
// ------------------------------------------------------------

async function apiFetch(url, opciones = {}) {
  try {
    const response = await fetch(url, opciones);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error HTTP ${response.status}`);
    }
    // DELETE devuelve 200/204 sin body en algunos casos
    const texto = await response.text();
    return texto ? JSON.parse(texto) : {};
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// ============================================================
//  MÓDULO: USUARIOS
// ============================================================

async function obtenerUsuarios() {
  try {
    const usuarios = await apiFetch(`${BASE_URL}/usuarios`);
    mostrarUsuarios(usuarios);
  } catch {
    mostrarAlerta(
      "Error al cargar los usuarios. ¿Está corriendo el servidor?",
      "danger",
    );
  }
}

function mostrarUsuarios(usuarios) {
  const tabla = document.getElementById("tablaUsuarios");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!usuarios.length) {
    tabla.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No hay usuarios registrados.</td></tr>`;
    return;
  }

  usuarios.forEach((u) => {
    const fecha = u.fecha_registro
      ? new Date(u.fecha_registro).toLocaleDateString("es-CR")
      : "—";
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${u.id_usuario || "—"}</td>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>${fecha}</td>
      <td><span class="badge bg-success">${u.perfil || "—"}</span></td>
      <td class="text-center">
        <a href="create.html?id=${u._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${u._id}', 'usuarios')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarUsuario(id) {
  const datos = {
    id_usuario: document.getElementById("id_usuario")?.value.trim(),
    nombre: document.getElementById("nombre")?.value.trim(),
    email: document.getElementById("email")?.value.trim(),
    fecha_registro: document.getElementById("fecha_registro")?.value || null,
    perfil: document.getElementById("perfil")?.value,
  };

  if (!datos.id_usuario || !datos.nombre || !datos.email || !datos.perfil) {
    mostrarAlerta("Por favor completa todos los campos requeridos.", "danger");
    return;
  }

  try {
    const url = id ? `${BASE_URL}/usuarios/${id}` : `${BASE_URL}/usuarios`;
    const method = id ? "PUT" : "POST";
    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    mostrarAlerta(
      id
        ? "Usuario actualizado correctamente."
        : "Usuario creado correctamente.",
    );
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar el usuario.", "danger");
  }
}

async function cargarUsuarioEnFormulario(id) {
  try {
    const u = await apiFetch(`${BASE_URL}/usuarios/${id}`);
    document.getElementById("id_usuario").value = u.id_usuario || "";
    document.getElementById("nombre").value = u.nombre || "";
    document.getElementById("email").value = u.email || "";
    document.getElementById("perfil").value = u.perfil || "";
    if (u.fecha_registro) {
      document.getElementById("fecha_registro").value = new Date(
        u.fecha_registro,
      )
        .toISOString()
        .split("T")[0];
    }
  } catch {
    mostrarAlerta("No se pudo cargar el usuario.", "danger");
  }
}

// ============================================================
//  MÓDULO: RETOS
// ============================================================

async function obtenerRetos() {
  try {
    const retos = await apiFetch(`${BASE_URL}/retos`);
    mostrarRetos(retos);
  } catch {
    mostrarAlerta(
      "Error al cargar los retos. ¿Está corriendo el servidor?",
      "danger",
    );
  }
}

function mostrarRetos(retos) {
  const tabla = document.getElementById("tablaRetos");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!retos.length) {
    tabla.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No hay retos registrados.</td></tr>`;
    return;
  }

  const badgeColor = {
    facil: "success",
    medio: "warning text-dark",
    dificil: "danger",
  };

  retos.forEach((r) => {
    const dif = (r.dificultad || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
    const color =
      { facil: "success", media: "warning text-dark", dificil: "danger" }[
        dif
      ] || "secondary";
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${r.id_reto || "—"}</td>
      <td>${r.titulo || "—"}</td>
      <td>${r.duracion_dias} días</td>
      <td><span class="badge bg-${color}">${r.dificultad || "—"}</span></td>
      <td class="text-center">
        <a href="create.html?id=${r._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${r._id}', 'retos')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarReto(id) {
  const datos = {
    id_reto: parseInt(document.getElementById("id_reto")?.value),
    titulo: document.getElementById("titulo")?.value.trim(),
    duracion_dias: parseInt(document.getElementById("duracion_dias")?.value),
    dificultad: document.getElementById("dificultad")?.value,
  };

  if (
    isNaN(datos.id_reto) ||
    !datos.titulo ||
    isNaN(datos.duracion_dias) ||
    !datos.dificultad
  ) {
    mostrarAlerta("Por favor completa todos los campos.", "danger");
    return;
  }

  try {
    const url = id ? `${BASE_URL}/retos/${id}` : `${BASE_URL}/retos`;
    const method = id ? "PUT" : "POST";
    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    mostrarAlerta(id ? "Reto actualizado." : "Reto creado.");
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar el reto.", "danger");
  }
}

async function cargarRetoEnFormulario(id) {
  try {
    const r = await apiFetch(`${BASE_URL}/retos/${id}`);
    document.getElementById("id_reto").value = r.id_reto ?? "";
    document.getElementById("titulo").value = r.titulo || "";
    document.getElementById("duracion_dias").value = r.duracion_dias ?? "";
    document.getElementById("dificultad").value = r.dificultad || "";
  } catch {
    mostrarAlerta("No se pudo cargar el reto.", "danger");
  }
}

// ============================================================
//  MÓDULO: HÁBITOS
// ============================================================

async function obtenerHabitos() {
  try {
    const habitos = await apiFetch(`${BASE_URL}/habitos`);
    mostrarHabitos(habitos);
  } catch {
    mostrarAlerta(
      "Error al cargar los hábitos. ¿Está corriendo el servidor?",
      "danger",
    );
  }
}

function mostrarHabitos(habitos) {
  const tabla = document.getElementById("tablaHabitos");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!habitos.length) {
    tabla.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No hay hábitos registrados.</td></tr>`;
    return;
  }

  habitos.forEach((h) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${h.id_habito || "—"}</td>
      <td>${h.descripcion}</td>
      <td><span class="badge bg-info text-dark">${h.categoria || "—"}</span></td>
      <td><span class="fw-semibold text-success">${h.puntos_eco} pts</span></td>
      <td class="text-center">
        <a href="create.html?id=${h._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${h._id}', 'habitos')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarHabito(id) {
  const datos = {
    id_habito: document.getElementById("id_habito")?.value.trim(),
    descripcion: document.getElementById("descripcion")?.value.trim(),
    categoria: document.getElementById("categoria")?.value,
    puntos_eco: parseInt(document.getElementById("puntos_eco")?.value),
  };

  if (
    !datos.id_habito ||
    !datos.descripcion ||
    !datos.categoria ||
    isNaN(datos.puntos_eco)
  ) {
    mostrarAlerta("Por favor completa todos los campos.", "danger");
    return;
  }

  try {
    const url = id ? `${BASE_URL}/habitos/${id}` : `${BASE_URL}/habitos`;
    const method = id ? "PUT" : "POST";
    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    mostrarAlerta(id ? "Hábito actualizado." : "Hábito creado.");
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar el hábito.", "danger");
  }
}

async function cargarHabitoEnFormulario(id) {
  try {
    const h = await apiFetch(`${BASE_URL}/habitos/${id}`);
    document.getElementById("id_habito").value = h.id_habito || "";
    document.getElementById("descripcion").value = h.descripcion || "";
    document.getElementById("categoria").value = h.categoria || "";
    document.getElementById("puntos_eco").value = h.puntos_eco ?? "";
  } catch {
    mostrarAlerta("No se pudo cargar el hábito.", "danger");
  }
}

// ============================================================
//  MÓDULO: TIPOS DE TRANSPORTE
// ============================================================

async function obtenerTiposTransporte() {
  try {
    const tipos = await apiFetch(`${BASE_URL}/tipos-transporte`);
    mostrarTiposTransporte(tipos);
  } catch {
    mostrarAlerta(
      "Error al cargar los tipos de transporte. ¿Está corriendo el servidor?",
      "danger",
    );
  }
}

function mostrarTiposTransporte(tipos) {
  const tabla = document.getElementById("tablaTransporte");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!tipos.length) {
    tabla.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-muted">No hay tipos de transporte registrados.</td></tr>`;
    return;
  }

  tipos.forEach((t) => {
    const factor = t.factor_emision
      ? parseFloat(t.factor_emision).toFixed(4)
      : "0.0000";
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${t.id_transporte || "—"}</td>
      <td>${t.nombre}</td>
      <td><span class="badge bg-warning text-dark">${factor}</span></td>
      <td class="text-center">
        <a href="create.html?id=${t.id_transporte}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${t.id_transporte}', 'tipos-transporte')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarTipoTransporte(id) {
  const idNum = document.getElementById("id_transporte")?.value.trim();
  const factorVal = document.getElementById("factor_emision")?.value;

  const datos = {
    id_transporte: parseInt(idNum),
    nombre: document.getElementById("nombre")?.value.trim(),
    factor_emision: parseFloat(factorVal),
  };

  if (
    isNaN(datos.id_transporte) ||
    !datos.nombre ||
    isNaN(datos.factor_emision)
  ) {
    mostrarAlerta(
      "Por favor completa todos los campos con valores válidos.",
      "danger",
    );
    return;
  }

  try {
    const url = id
      ? `${BASE_URL}/tipos-transporte/${id}`
      : `${BASE_URL}/tipos-transporte`;

    const method = id ? "PUT" : "POST";

    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    mostrarAlerta(
      id ? "Tipo de transporte actualizado." : "Tipo de transporte creado.",
    );
    redirigir("index.html");
  } catch (error) {
    console.error(error);
    mostrarAlerta("Error al guardar en el servidor.", "danger");
  }
}

async function cargarTransporteEnFormulario(id) {
  try {
    const t = await apiFetch(`${BASE_URL}/tipos-transporte/${id}`);

    if (t) {
      document.getElementById("id_transporte").value = t.id_transporte || "";
      document.getElementById("nombre").value = t.nombre || "";
      document.getElementById("factor_emision").value = t.factor_emision ?? "";
      document.getElementById("id_transporte").readOnly = true;
    }
  } catch (error) {
    mostrarAlerta("No se pudo obtener la información para editar.", "danger");
  }
}

// ============================================================
//  MÓDULO: RECOMENDACIONES
// ============================================================

async function obtenerRecomendaciones() {
  try {
    const recomendaciones = await apiFetch(`${BASE_URL}/recomendaciones`);
    mostrarRecomendaciones(recomendaciones);
  } catch {
    mostrarAlerta(
      "Error al cargar las recomendaciones. ¿Está corriendo el servidor?",
      "danger",
    );
  }
}

function mostrarRecomendaciones(recomendaciones) {
  const tabla = document.getElementById("tablaRecomendaciones");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!recomendaciones.length) {
    tabla.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No hay recomendaciones registradas.</td></tr>`;
    return;
  }

  recomendaciones.forEach((r) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${r.id_recomendacion || "—"}</td>
      <td><span class="badge bg-primary">${r.tipo || "—"}</span></td>
      <td style="max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.texto}">${r.texto}</td>
      <td>${r.impacto_estimado || "—"}</td>
      <td class="text-center">
        <a href="create.html?id=${r.id_recomendacion}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${r.id_recomendacion}', 'recomendaciones')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarRecomendacion(id) {
  const datos = {
    id_recomendacion: document.getElementById("id_recomendacion")?.value.trim(),
    tipo: document.getElementById("tipo")?.value,
    texto: document.getElementById("texto")?.value.trim(),
    impacto_estimado: document.getElementById("impacto_estimado")?.value.trim(),
  };

  if (!datos.id_recomendacion || !datos.tipo || !datos.texto) {
    mostrarAlerta("Por favor completa los campos requeridos.", "danger");
    return;
  }

  try {
    const url = id
      ? `${BASE_URL}/recomendaciones/${id}`
      : `${BASE_URL}/recomendaciones`;
    const method = id ? "PUT" : "POST";
    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    mostrarAlerta(id ? "Recomendación actualizada." : "Recomendación creada.");
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar la recomendación.", "danger");
  }
}

async function cargarRecomendacionEnFormulario(id) {
  try {
    const r = await apiFetch(`${BASE_URL}/recomendaciones/${id}`);
    document.getElementById("id_recomendacion").value =
      r.id_recomendacion || "";
    document.getElementById("tipo").value = r.tipo || "";
    document.getElementById("texto").value = r.texto || "";
    document.getElementById("impacto_estimado").value =
      r.impacto_estimado || "";
  } catch {
    mostrarAlerta("No se pudo cargar la recomendación.", "danger");
  }
}

// ============================================================
//  MÓDULO: REGISTROS DIARIOS
// ============================================================

async function obtenerRegistrosDiarios() {
  try {
    const registros = await apiFetch(`${BASE_URL}/registrosDiarios`);
    mostrarRegistrosDiarios(registros);
  } catch {
    mostrarAlerta(
      "Error al cargar los registros. ¿Está corriendo el servidor?",
      "danger",
    );
  }
}

function mostrarRegistrosDiarios(registros) {
  const tabla = document.getElementById("tablaRegistros");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!registros.length) {
    tabla.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No hay registros diarios.</td></tr>`;
    return;
  }

  registros.forEach((r) => {
    const fecha = r.fecha ? new Date(r.fecha).toLocaleDateString("es-CR") : "—";
    let actResumen = "—";
    if (Array.isArray(r.actividades)) actResumen = r.actividades.join(", ");
    else if (typeof r.actividades === "object")
      actResumen = Object.values(r.actividades).join(", ");
    else if (r.actividades) actResumen = String(r.actividades);

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${r.id_registro || "—"}</td>
      <td>${r.usuario_id || "—"}</td>
      <td>${fecha}</td>
      <td style="max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${actResumen}">${actResumen}</td>
      <td class="text-center">
        <a href="create.html?id=${r._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${r._id}', 'registrosDiarios')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarRegistroDiario(id) {
  const actividades = Array.from(document.querySelectorAll(".actividad-input"))
    .map((el) => el.value.trim())
    .filter(Boolean);

  const datos = {
    id_registro: document.getElementById("id_registro")?.value.trim(),
    usuario_id: document.getElementById("usuario_id")?.value.trim(),
    fecha: document.getElementById("fecha")?.value || null,
    actividades,
  };

  if (!datos.id_registro || !datos.usuario_id || !datos.fecha) {
    mostrarAlerta("Por favor completa los campos requeridos.", "danger");
    return;
  }

  try {
    const url = id
      ? `${BASE_URL}/registrosDiarios/${id}`
      : `${BASE_URL}/registrosDiarios`;
    const method = id ? "PUT" : "POST";
    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    mostrarAlerta(id ? "Registro actualizado." : "Registro creado.");
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar el registro.", "danger");
  }
}

async function cargarRegistroEnFormulario(id) {
  try {
    const r = await apiFetch(`${BASE_URL}/registrosDiarios/${id}`);
    document.getElementById("id_registro").value = r.id_registro || "";
    document.getElementById("usuario_id").value = r.usuario_id || "";
    if (r.fecha)
      document.getElementById("fecha").value = new Date(r.fecha)
        .toISOString()
        .split("T")[0];

    const contenedor = document.getElementById("listaActividades");
    if (contenedor) {
      contenedor.innerHTML = "";
      let acts = [];
      if (Array.isArray(r.actividades)) acts = r.actividades;
      else if (typeof r.actividades === "object")
        acts = Object.values(r.actividades).map(String);
      else if (r.actividades) acts = [String(r.actividades)];

      (acts.length ? acts : [""]).forEach((a) => agregarFilaActividad(a));
    }
  } catch {
    mostrarAlerta("No se pudo cargar el registro.", "danger");
  }
}

function agregarFilaActividad(valor = "") {
  const contenedor = document.getElementById("listaActividades");
  if (!contenedor) return;
  const div = document.createElement("div");
  div.className = "actividad-item d-flex gap-2 mb-2";
  div.innerHTML = `
    <input type="text" class="form-control actividad-input"
           placeholder="Ej: Usé bicicleta al trabajo" value="${valor}" />
    <button type="button" class="btn btn-sm btn-outline-danger btn-quitar-act" title="Quitar">
      <i class="bi bi-dash-lg"></i>
    </button>`;
  contenedor.appendChild(div);

  div.querySelector(".btn-quitar-act").addEventListener("click", () => {
    const items = contenedor.querySelectorAll(".actividad-item");
    if (items.length > 1) div.remove();
    else div.querySelector("input").value = "";
  });
}

// ============================================================
//  MÓDULO: ALIMENTOS
// ============================================================

async function obtenerAlimentos() {
  try {
    const alimentos = await apiFetch(`${BASE_URL}/alimentos`);
    mostrarAlimentos(alimentos);
  } catch {
    mostrarAlerta(
      "Error al cargar los alimentos. ¿Está corriendo el servidor?",
      "danger",
    );
  }
}

function mostrarAlimentos(alimentos) {
  const tabla = document.getElementById("tablaAlimentos");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!alimentos.length) {
    tabla.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No hay alimentos registrados.</td></tr>`;
    return;
  }

  alimentos.forEach((a) => {
    const co2 =
      a.co2_por_kg != null ? parseFloat(a.co2_por_kg).toFixed(2) : "0.00";
    const impactoBadge = a.impacto_alto
      ? `<span class="badge bg-danger">Sí</span>`
      : `<span class="badge bg-secondary">No</span>`;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${a.id_alimento ?? "—"}</td>
      <td><span class="badge bg-info text-dark">${a.categoria || "—"}</span></td>
      <td><span class="fw-semibold text-success">${co2} kg</span></td>
      <td>${impactoBadge}</td>
      <td class="text-center">
        <a href="create.html?id=${a._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${a._id}', 'alimentos')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarAlimento(id) {
  const datos = {
    id_alimento: parseInt(document.getElementById("id_alimento")?.value),
    categoria: document.getElementById("categoria")?.value.trim(),
    impacto_alto: document.getElementById("impacto_alto")?.value === "true",
    co2_por_kg: parseFloat(document.getElementById("co2_por_kg")?.value),
  };

  if (
    isNaN(datos.id_alimento) ||
    !datos.categoria ||
    isNaN(datos.co2_por_kg) ||
    document.getElementById("impacto_alto")?.value === ""
  ) {
    mostrarAlerta("Por favor completa todos los campos.", "danger");
    return;
  }

  try {
    const url = id ? `${BASE_URL}/alimentos/${id}` : `${BASE_URL}/alimentos`;
    const method = id ? "PUT" : "POST";

    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    mostrarAlerta(id ? "Alimento actualizado." : "Alimento creado.");
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar el alimento.", "danger");
  }
}

async function cargarAlimentoEnFormulario(id) {
  try {
    const a = await apiFetch(`${BASE_URL}/alimentos/${id}`);
    document.getElementById("id_alimento").value = a.id_alimento ?? "";
    document.getElementById("categoria").value = a.categoria || "";
    document.getElementById("co2_por_kg").value = a.co2_por_kg ?? "";
    document.getElementById("impacto_alto").value =
      a.impacto_alto === true ? "true" : "false";
  } catch {
    mostrarAlerta("No se pudo cargar el alimento.", "danger");
  }
}

// ============================================================
//  MÓDULO: ConsumoEnergia
// ============================================================

async function obtenerConsumosEnergia() {
  try {
    const consumos = await apiFetch(`${BASE_URL}/consumos-energia`);
    mostrarConsumosEnergia(consumos);
  } catch {
    mostrarAlerta("Error al cargar los consumos de energía.", "danger");
  }
}

function mostrarConsumosEnergia(consumos) {
  const tabla = document.getElementById("tablaEnergia");
  if (!tabla) return;
  const tbody = tabla.querySelector("tbody") || tabla;
  tbody.innerHTML = "";

  if (!consumos.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No hay consumos registrados.</td></tr>`;
    return;
  }

  consumos.forEach((c) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${c.id_energia ?? "—"}</td>
      <td>${c.tipo || "—"}</td>
      <td>${c.unidad || "—"}</td>
      <td>${c.factor ?? "—"}</td>
      <td class="text-center">
        <a href="create.html?id=${c._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${c._id}', 'consumos-energia')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tbody.appendChild(fila);
  });
}

async function guardarConsumoEnergia(id) {
  const datos = {
    id_energia: parseInt(document.getElementById("id_energia")?.value),
    tipo: document.getElementById("tipo")?.value.trim(),
    unidad: document.getElementById("unidad")?.value.trim(),
    factor: parseFloat(document.getElementById("factor")?.value),
  };

  if (
    isNaN(datos.id_energia) ||
    !datos.tipo ||
    !datos.unidad ||
    isNaN(datos.factor)
  ) {
    mostrarAlerta(
      "Por favor completa todos los campos correctamente.",
      "danger",
    );
    return;
  }

  try {
    const url = id
      ? `${BASE_URL}/consumos-energia/${id}`
      : `${BASE_URL}/consumos-energia`;
    const method = id ? "PUT" : "POST";
    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    mostrarAlerta(
      id ? "Consumo de energía actualizado." : "Consumo de energía creado.",
    );
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar el consumo de energía.", "danger");
  }
}

async function cargarConsumoEnergiaEnFormulario(id) {
  try {
    const c = await apiFetch(`${BASE_URL}/consumos-energia/${id}`);
    document.getElementById("id_energia").value = c.id_energia ?? "";
    document.getElementById("tipo").value = c.tipo || "";
    document.getElementById("unidad").value = c.unidad || "";
    document.getElementById("factor").value = c.factor ?? "";
  } catch {
    mostrarAlerta("No se pudo cargar el consumo de energía.", "danger");
  }
}

// ============================================================
//  MÓDULO: CategoriaRetos
// ============================================================

async function obtenerCategoriasRetos() {
  try {
    const categorias = await apiFetch(`${BASE_URL}/categorias-retos`);
    mostrarCategoriasRetos(categorias);
  } catch {
    mostrarAlerta("Error al cargar las categorías de retos.", "danger");
  }
}

function mostrarCategoriasRetos(categorias) {
  const tabla = document.getElementById("tablaCategoria");
  if (!tabla) return;
  const tbody = tabla.querySelector("tbody") || tabla;
  tbody.innerHTML = "";

  if (!categorias.length) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-muted">No hay categorías registradas.</td></tr>`;
    return;
  }

  categorias.forEach((c) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${c.id_categoria ?? "—"}</td>
      <td>${c.nombre || "—"}</td>
      <td class="text-center">
        <a href="create.html?id=${c._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${c._id}', 'categorias-retos')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tbody.appendChild(fila);
  });
}

async function guardarCategoriaReto(id) {
  const datos = {
    id_categoria: parseInt(document.getElementById("id_categoria")?.value),
    nombre: document.getElementById("nombre")?.value.trim(),
  };

  if (isNaN(datos.id_categoria) || !datos.nombre) {
    mostrarAlerta("Por favor completa todos los campos requeridos.", "danger");
    return;
  }

  try {
    const url = id
      ? `${BASE_URL}/categorias-retos/${id}`
      : `${BASE_URL}/categorias-retos`;
    const method = id ? "PUT" : "POST";
    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    mostrarAlerta(id ? "Categoría actualizada." : "Categoría creada.");
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar la categoría.", "danger");
  }
}

async function cargarCategoriaRetoEnFormulario(id) {
  try {
    const c = await apiFetch(`${BASE_URL}/categorias-retos/${id}`);
    document.getElementById("id_categoria").value = c.id_categoria ?? "";
    document.getElementById("nombre").value = c.nombre || "";
  } catch {
    mostrarAlerta("No se pudo cargar la categoría.", "danger");
  }
}

// ============================================================
//  MÓDULO: CÁLCULOS CO2
// ============================================================

async function obtenerCalculosCO2() {
  try {
    const [calculos, usuarios] = await Promise.all([
      apiFetch(`${BASE_URL}/calculos-co2`),
      apiFetch(`${BASE_URL}/usuarios`),
    ]);

    const mapaUsuarios = {};
    usuarios.forEach((u) => {
      mapaUsuarios[u._id] = u.nombre || u.email || "Usuario sin nombre";
    });

    mostrarCalculosCO2(calculos, mapaUsuarios);
  } catch {
    mostrarAlerta(
      "Error al cargar los cálculos CO2. ¿Está corriendo el servidor?",
      "danger",
    );
  }
}

async function cargarUsuariosEnSelect(idSelect) {
  const select = document.getElementById(idSelect);
  if (!select) return;

  try {
    const usuarios = await apiFetch(`${BASE_URL}/usuarios`);
    select.innerHTML = `<option value="">Seleccione un usuario...</option>`;

    if (!usuarios.length) {
      select.innerHTML = `<option value="">No hay usuarios registrados</option>`;
      return;
    }

    usuarios.forEach((u) => {
      const option = document.createElement("option");
      option.value = u._id;
      option.textContent = `${u.nombre} (${u.email || "sin correo"})`;
      select.appendChild(option);
    });
  } catch {
    select.innerHTML = `<option value="">Error al cargar usuarios</option>`;
  }
}

function mostrarCalculosCO2(calculos, mapaUsuarios = {}) {
  const tabla = document.getElementById("tablaCalculosCO2");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!calculos.length) {
    tabla.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No hay cálculos CO2 registrados.</td></tr>`;
    return;
  }

  calculos.forEach((c) => {
    const total =
      c.total_emisiones != null
        ? parseFloat(c.total_emisiones).toFixed(2)
        : "0.00";

    const nombreUsuario =
      mapaUsuarios[c.usuario_id] || c.usuario_id || "Usuario no encontrado";

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${c.id_calculo ?? "—"}</td>
      <td>${nombreUsuario}</td>
      <td><span class="badge bg-info text-dark">${c.mes || "—"}</span></td>
      <td><span class="fw-semibold text-success">${total}</span></td>
      <td>${c.unidad || "kg"}</td>
      <td class="text-center">
        <a href="create.html?id=${c._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${c._id}', 'calculos-co2')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarCalculoCO2(id) {
  const datos = {
    id_calculo: parseInt(document.getElementById("id_calculo")?.value),
    usuario_id: document.getElementById("usuario_id")?.value,
    mes: document.getElementById("mes")?.value.trim(),
    total_emisiones: parseFloat(
      document.getElementById("total_emisiones")?.value,
    ),
    unidad: "kg",
  };

  if (
    isNaN(datos.id_calculo) ||
    !datos.usuario_id ||
    !datos.mes ||
    isNaN(datos.total_emisiones)
  ) {
    mostrarAlerta("Por favor completa todos los campos.", "danger");
    return;
  }

  try {
    const url = id
      ? `${BASE_URL}/calculos-co2/${id}`
      : `${BASE_URL}/calculos-co2`;

    const method = id ? "PUT" : "POST";

    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    mostrarAlerta(id ? "Cálculo CO2 actualizado." : "Cálculo CO2 creado.");
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar el cálculo CO2.", "danger");
  }
}

async function cargarCalculoCO2EnFormulario(id) {
  try {
    const c = await apiFetch(`${BASE_URL}/calculos-co2/${id}`);

    document.getElementById("id_calculo").value = c.id_calculo ?? "";
    document.getElementById("usuario_id").value = c.usuario_id || "";
    document.getElementById("mes").value = c.mes || "";
    document.getElementById("total_emisiones").value = c.total_emisiones ?? "";
    document.getElementById("unidad").value = c.unidad || "kg";
  } catch {
    mostrarAlerta("No se pudo cargar el cálculo CO2.", "danger");
  }
}

// ============================================================
//  MÓDULO: FactorPais
// ============================================================

async function obtenerFactoresPaises() {
  try {
    const factores = await apiFetch(`${BASE_URL}/factores-paises`);
    mostrarFactoresPaises(factores);
  } catch {
    mostrarAlerta("Error al cargar los factores país.", "danger");
  }
}

function mostrarFactoresPaises(factores) {
  const tabla = document.getElementById("tablaFactoresPaises");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!factores.length) {
    tabla.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No hay factores país registrados.</td></tr>`;
    return;
  }

  factores.forEach((f) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${f.id_pais ?? "—"}</td>
      <td>${f.nombre_pais || "—"}</td>
      <td>${f.factor_electricidad ?? "—"}</td>
      <td>${f.moneda || "—"}</td>
      <td class="text-center">
        <a href="create.html?id=${f._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${f._id}', 'factores-paises')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarFactorPais(id) {
  const datos = {
    id_pais: parseInt(document.getElementById("id_pais")?.value),
    nombre_pais: document.getElementById("nombre_pais")?.value.trim(),
    factor_electricidad: parseFloat(
      document.getElementById("factor_electricidad")?.value,
    ),
    moneda: document.getElementById("moneda")?.value.trim(),
  };

  if (
    isNaN(datos.id_pais) ||
    !datos.nombre_pais ||
    isNaN(datos.factor_electricidad) ||
    !datos.moneda
  ) {
    mostrarAlerta("Por favor completa todos los campos requeridos.", "danger");
    return;
  }

  try {
    const url = id ? `${BASE_URL}/factores-paises/${id}` : `${BASE_URL}/factores-paises`;
    const method = id ? "PUT" : "POST";

    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    mostrarAlerta(
      id
        ? "Factor país actualizado correctamente."
        : "Factor país creado correctamente.",
    );
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar el factor país.", "danger");
  }
}

async function cargarFactorPaisEnFormulario(id) {
  try {
    const f = await apiFetch(`${BASE_URL}/factores-paises/${id}`);

    document.getElementById("id_pais").value = f.id_pais ?? "";
    document.getElementById("nombre_pais").value = f.nombre_pais || "";
    document.getElementById("factor_electricidad").value =
      f.factor_electricidad ?? "";
    document.getElementById("moneda").value = f.moneda || "";
  } catch {
    mostrarAlerta("No se pudo cargar el factor país.", "danger");
  }
}

// ============================================================
//  MÓDULO: ParticipacionReto
// ============================================================

async function obtenerParticipacionesRetos() {
  try {
    const participaciones = await apiFetch(`${BASE_URL}/participaciones-retos`);
    mostrarParticipacionesRetos(participaciones);
  } catch {
    mostrarAlerta("Error al cargar las participaciones de retos.", "danger");
  }
}

function mostrarParticipacionesRetos(participaciones) {
  const tabla = document.getElementById("tablaParticipacionesRetos");
  if (!tabla) return;
  tabla.innerHTML = "";

  if (!participaciones.length) {
    tabla.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No hay participaciones registradas.</td></tr>`;
    return;
  }

  participaciones.forEach((p) => {
    const fechaInicio = p.fecha_inicio
      ? new Date(p.fecha_inicio).toLocaleDateString("es-CR")
      : "—";

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.id_participacion ?? "—"}</td>
      <td>${p.usuario_id?._id || p.usuario_id || "—"}</td>
      <td>${p.reto_id?._id || p.reto_id || "—"}</td>
      <td>${fechaInicio}</td>
      <td><span class="badge bg-primary">${p.estado || "—"}</span></td>
      <td class="text-center">
        <a href="create.html?id=${p._id}" class="btn btn-sm btn-outline-warning me-1">
          <i class="bi bi-pencil-fill"></i> Editar
        </a>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar('${p._id}', 'participaciones-retos')">
          <i class="bi bi-trash-fill"></i> Eliminar
        </button>
      </td>`;
    tabla.appendChild(fila);
  });
}

async function guardarParticipacionReto(id) {
  const datos = {
    id_participacion: parseInt(
      document.getElementById("id_participacion")?.value,
    ),
    usuario_id: document.getElementById("usuario_id")?.value.trim(),
    reto_id: document.getElementById("reto_id")?.value.trim(),
    fecha_inicio: document.getElementById("fecha_inicio")?.value || null,
    estado: document.getElementById("estado")?.value,
  };

  if (
    isNaN(datos.id_participacion) ||
    !datos.usuario_id ||
    !datos.reto_id ||
    !datos.fecha_inicio ||
    !datos.estado
  ) {
    mostrarAlerta("Por favor completa todos los campos requeridos.", "danger");
    return;
  }

  try {
    const url = id
      ? `${BASE_URL}/participaciones-retos/${id}`
      : `${BASE_URL}/participaciones-retos`;
    const method = id ? "PUT" : "POST";

    await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    mostrarAlerta(
      id
        ? "Participación actualizada correctamente."
        : "Participación creada correctamente.",
    );
    redirigir("index.html");
  } catch {
    mostrarAlerta("Error al guardar la participación.", "danger");
  }
}

async function cargarParticipacionRetoEnFormulario(id) {
  try {
    const p = await apiFetch(`${BASE_URL}/participaciones-retos/${id}`);

    document.getElementById("id_participacion").value =
      p.id_participacion ?? "";
    document.getElementById("usuario_id").value =
      p.usuario_id?._id || p.usuario_id || "";
    document.getElementById("reto_id").value =
      p.reto_id?._id || p.reto_id || "";
    document.getElementById("fecha_inicio").value = p.fecha_inicio
      ? new Date(p.fecha_inicio).toISOString().split("T")[0]
      : "";
    document.getElementById("estado").value = p.estado || "En progreso";
  } catch {
    mostrarAlerta("No se pudo cargar la participación.", "danger");
  }
}

// ============================================================
//  ELIMINAR — función genérica usada por todos los módulos
// ============================================================

let _idEliminar = null;
let _colEliminar = null;
let _callbackLista = null;

/**
 * Abre el modal de confirmación de eliminación.
 * @param {string} id         - _id del documento MongoDB
 * @param {string} coleccion  - nombre de la colección (ej: "usuarios")
 * @param {Function} callback - función para recargar la lista tras eliminar
 */
function confirmarEliminar(id, coleccion, callback) {
  _idEliminar = id;
  _colEliminar = coleccion;
  _callbackLista = callback || null;

  const modal = document.getElementById("modalEliminar");
  if (modal) new bootstrap.Modal(modal).show();
}

async function ejecutarEliminar() {
  if (!_idEliminar || !_colEliminar) return;
  try {
    await apiFetch(`${BASE_URL}/${_colEliminar}/${_idEliminar}`, {
      method: "DELETE",
    });
    bootstrap.Modal.getInstance(
      document.getElementById("modalEliminar"),
    )?.hide();
    mostrarAlerta("Registro eliminado correctamente.");

    // Recargar la tabla de la colección correspondiente
    const recargadores = {
      usuarios: obtenerUsuarios,
      retos: obtenerRetos,
      habitos: obtenerHabitos,
      alimentos: obtenerAlimentos,
      "tipos-transporte": obtenerTiposTransporte,
      recomendaciones: obtenerRecomendaciones,
      registrosDiarios: obtenerRegistrosDiarios,
      "calculos-co2": obtenerCalculosCO2,
      "consumos-energia": obtenerConsumosEnergia,
      "categorias-retos": obtenerCategoriasRetos,
      "factores-paises": obtenerFactoresPaises,
      "participaciones-retos": obtenerParticipacionesRetos,
    };

    if (_callbackLista) _callbackLista();
    else if (recargadores[_colEliminar]) recargadores[_colEliminar]();
  } catch {
    mostrarAlerta("Error al eliminar el registro.", "danger");
  }
}

// Enlazar el botón de confirmación del modal al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const btnConfirmar = document.getElementById("btnConfirmarEliminar");
  if (btnConfirmar) btnConfirmar.addEventListener("click", ejecutarEliminar);
});