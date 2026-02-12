document.addEventListener('DOMContentLoaded', function () {
    const fecha = document.querySelector(`#fecha`);
    const lista = document.querySelector(`#lista`);
    const input = document.querySelector(`#input`);
    const botonEnter = document.querySelector(`#boton-enter`);

    const check = `bx-check-circle`;
    const uncheck = `bx-circle`;
    const lineThrough = `line-through`;

    let id;
    let LIST = []; // Inicializar LIST aquí

    const FECHA = new Date();
    fecha.innerHTML = FECHA.toLocaleDateString('es-MX', { weekday: 'long', month: 'long', day: 'numeric' });

    // Mover cargarLista DESPUÉS de definir agregarTarea
    function agregarTarea(tarea, id, realizado, eliminado) {
        if (eliminado) { return; }

        const REALIZADO = realizado ? check : uncheck;
        const LINE = realizado ? lineThrough : '';

        const elemento = `
            <li>
                <i class='bx ${REALIZADO}' data="realizado" id="${id}"></i>
                <p class="text" style="${LINE ? 'text-decoration: line-through;' : ''}">${tarea}</p>
                <i class='bx bx-trash' data="eliminado" id="${id}"></i>
            </li>`;
        lista.insertAdjacentHTML("beforeend", elemento);
    }

    function tareaRealizada(element) {
        element.classList.toggle(check);
        element.classList.toggle(uncheck);
        element.parentNode.querySelector('.text').classList.toggle(lineThrough);
        // Usar 'realizado' para mantener consistencia
        LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
        localStorage.setItem('TODO', JSON.stringify(LIST));
    }

    function tareaEliminada(element) {
        element.parentNode.parentNode.removeChild(element.parentNode);
        LIST[element.id].eliminado = true;
        localStorage.setItem('TODO', JSON.stringify(LIST));
    }

    function cargarLista(DATA) {
        DATA.forEach(function(item) {
            // CORREGIDO: i.eliminadoa -> item.eliminado
            agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
        });
    }

    botonEnter.addEventListener('click', () => {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false, // CAMBIADO: finalizado -> realizado
                eliminado: false
            });
            localStorage.setItem('TODO', JSON.stringify(LIST));
            input.value = '';
            id++;
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const tarea = input.value;
            if (tarea) {
                agregarTarea(tarea, id, false, false);
                LIST.push({
                    nombre: tarea,
                    id: id,
                    realizado: false, // CAMBIADO: finalizado -> realizado
                    eliminado: false
                });
                localStorage.setItem('TODO', JSON.stringify(LIST));
                input.value = '';
                id++;
            }
        }
    });

    lista.addEventListener('click', function(event) {
        const element = event.target;
        const elementData = element.attributes.data?.value;

        if (elementData === 'realizado') {
            tareaRealizada(element);
        } else if (elementData === 'eliminado') {
            tareaEliminada(element);
        }
    });

    // Cargar datos del localStorage
    let data = localStorage.getItem('TODO');

    if (data) {
        LIST = JSON.parse(data);
        id = LIST.length;
        cargarLista(LIST);
    } else {
        LIST = [];
        id = 0;
    }
});
