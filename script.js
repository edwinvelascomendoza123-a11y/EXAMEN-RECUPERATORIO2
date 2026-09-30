// ===== Datos: arreglo de objetos {id, nombre, telefono} =====
let contactos = [];
let siguienteId = 1;

// ===== Referencias al DOM =====
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const btnAgregar = document.getElementById("btn-agregar");
const inputBuscador = document.getElementById("buscador");
const lista = document.getElementById("lista");
const mensajeVacio = document.getElementById("vacio");
const contador = document.getElementById("contador");

// ===== Dibuja la lista (aplica el filtro actual) =====
function mostrarContactos() {
  const filtro = inputBuscador.value.trim().toLowerCase();
  const visibles = contactos.filter(c => c.nombre.toLowerCase().includes(filtro));

  lista.innerHTML = "";

  visibles.forEach(c => {
    const li = document.createElement("li");
    li.className = "contacto";

    const datos = document.createElement("div");
    datos.className = "datos";

    const nombre = document.createElement("span");
    nombre.className = "nombre";
    nombre.textContent = c.nombre;

    const telefono = document.createElement("span");
    telefono.className = "telefono";
    telefono.textContent = c.telefono;

    datos.append(nombre, telefono);

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.type = "button";
    btnEliminar.textContent = "Eliminar";
    // Un event listener por cada botón de eliminar
    btnEliminar.addEventListener("click", () => eliminarContacto(c.id));

    li.append(datos, btnEliminar);
    lista.appendChild(li);
  });

  // Mensaje cuando no hay nada que mostrar
  if (visibles.length === 0) {
    mensajeVacio.hidden = false;
    mensajeVacio.textContent = contactos.length === 0
      ? "Todavía no agregaste contactos."
      : "No hay contactos que coincidan con la búsqueda.";
  } else {
    mensajeVacio.hidden = true;
  }

  actualizarContador();
}

// ===== Agregar =====
function agregarContacto() {
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  // No permite contactos vacíos
  if (nombre === "" || telefono === "") return;

  contactos.push({ id: siguienteId++, nombre, telefono });

  inputNombre.value = "";
  inputTelefono.value = "";
  inputNombre.focus();

  mostrarContactos();
}
btnAgregar.addEventListener("click", agregarContacto);

// ===== Eliminar =====
function eliminarContacto(id) {
  contactos = contactos.filter(c => c.id !== id);
  mostrarContactos();
}

// ===== Contador: siempre el total real, sin importar el filtro =====
function actualizarContador() {
  contador.textContent = "Contactos: " + contactos.length;
}

// ===== Buscador en tiempo real =====
inputBuscador.addEventListener("input", mostrarContactos);

// Estado inicial
mostrarContactos();
