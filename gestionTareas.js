// clase Tarea
class Tarea {
    constructor(id, titulo, descripcion, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.completada = completada;
    }

    // método para mostrar los detalles de la tarea
    mostrarDetalles() {
        console.log(`ID: ${this.id}`);
        console.log(`Título: ${this.titulo}`);
        console.log(`Descripción: ${this.descripcion}`);
        console.log(`Completada: ${this.completada ? 'Sí' : 'No'}`);
        console.log('---');
    }
}

// clase ListaTareas
class ListaTareas {
    constructor() {
        this.tareas = [];
        this.siguienteId = 1;
    }

    // agregar una nueva tarea a la lista
    agregarTarea(tarea) {
        this.tareas.push(tarea);
    }

    // eliminar una tarea por su ID
    eliminarTarea(id) {
        this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    }

    // marcar una tarea como completada por su ID
    marcarComoCompletada(id) {
        const tarea = this.tareas.find((tarea) => tarea.id === id);
        if (tarea) {
            tarea.completada = true;
        }
    }

    // mostrar todas las tareas en consola
    mostrarTareas() {
        if (this.tareas.length === 0) {
            console.log('No hay tareas en la lista');
            return;
        }

        console.log('=== LISTA DE TAREAS ===');
        this.tareas.forEach((tarea) => {
            tarea.mostrarDetalles();
        });
    }
    // mostrar mensaje de estado (solo en navegador)
    mostrarMensaje(mensaje, tipo) {
        const contenedor = document.getElementById('contenedor-tareas');
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = tipo;
        mensajeDiv.textContent = mensaje;
        contenedor.insertBefore(mensajeDiv, contenedor.firstChild);
        setTimeout(() => {
            if (mensajeDiv.parentNode) mensajeDiv.parentNode.removeChild(mensajeDiv);
        }, 3000);
    }

    // agregar una nueva tarea a la lista
    agregarTarea(tarea) {
        this.tareas.push(tarea);
    }

    // eliminar una tarea por su ID
    eliminarTarea(id) {
        this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    }

    // marcar una tarea como completada por su ID
    marcarComoCompletada(id) {
        const tarea = this.tareas.find((tarea) => tarea.id === id);
        if (tarea) {
            tarea.completada = true;
        }
    }

    // generar HTML para mostrar las tareas en el DOM
    renderizarTareas() {
        const listaTareasDiv = document.getElementById('lista-tareas');

        if (this.tareas.length === 0) {
            listaTareasDiv.innerHTML = '<p>No hay tareas pendientes</p>';
            return;
        }

        let html = '';
        this.tareas.forEach((tarea) => {
            html += `
                <div class="item-tarea ${tarea.completada ? 'completada' : ''}">
                    <h3>${tarea.titulo}</h3>
                    <p>${tarea.descripcion}</p>
                    <p><strong>Estado:</strong> ${tarea.completada ? 'Completada' : 'Pendiente'}</p>
                    <div class="acciones-tarea">
                        ${!tarea.completada ? `<button class="btn-completar" onclick="completarTarea(${tarea.id})">Completar</button>` : ''}
                        <button class="btn-eliminar" onclick="eliminarTareaDOM(${tarea.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });

        listaTareasDiv.innerHTML = html;
    }
}

// instancia global de la lista de tareas
const listaTareas = new ListaTareas();

// función para agregar tarea desde el formulario
function agregarTareaDesdeFormulario(evento) {
    evento.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();

    if (titulo && descripcion) {
        const nuevaTarea = new Tarea(listaTareas.siguienteId++, titulo, descripcion, false);
        listaTareas.agregarTarea(nuevaTarea);

        // limpiar formulario
        document.getElementById('formulario-tarea').reset();

        listaTareas.renderizarTareas();
        listaTareas.mostrarMensaje(`Tarea "${titulo}" agregada`, 'exito');
        console.log(`Tarea "${titulo}" agregada localmente`);
    }
}

// mantener funciones de interacción

// función para eliminar tarea
function eliminarTareaDOM(id) {
    listaTareas.eliminarTarea(id);
    listaTareas.renderizarTareas();
    console.log(`Tarea con ID ${id} eliminada`);
}

// función para completar tarea
function completarTarea(id) {
    listaTareas.marcarComoCompletada(id);
    listaTareas.renderizarTareas();
    console.log(`Tarea con ID ${id} marcada como completada`);
}

// event listeners
document.addEventListener('DOMContentLoaded', function () {
    // event listener para el formulario
    const formulario = document.getElementById('formulario-tarea');
    formulario.addEventListener('submit', agregarTareaDesdeFormulario);

    // renderizar inicialmente
    listaTareas.renderizarTareas();

    console.log('Sistema de gestión de tareas inicializado (navegador)');
});
