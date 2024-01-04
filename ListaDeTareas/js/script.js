document.addEventListener('DOMContentLoaded', function () {
    const fecha = document.querySelector(`#fecha`);
    const lista = document.querySelector(`#lista`);
    const input = document.querySelector(`#input`);
    const botonEnter = document.querySelector(`#boton-enter`);

    const check = `bx-check-circle`
    const uncheck = `bx-circle`
    const lineThrough = `line-through`  

    let id 
    
    let LIST 

    const FECHA = new Date()
    fecha.innerHTML=FECHA.toLocaleDateString('es-MX',{weekday:'long',month:'long',day:'numeric'})
    
    
    
    function agregarTarea(tarea,id,realizado,eliminado) {

        if(eliminado){return}
        
        const REALIZADO = realizado ?check:uncheck
        const LINE = realizado ?lineThrough :''

        const elemento = `
            <li id=elemento> 
                <i class='bx bx-circle' data="realizado" id=${id}}></i>
                <p class="text" ${LINE}>${tarea}</p>
                <i class='bx bx-trash' data="eliminado" id=${id}></i>
            </li>`;
        lista.insertAdjacentHTML("beforeend", elemento);
    }

    botonEnter.addEventListener('click', () => {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea,id,false,false);
            LIST.push({
                nombre:tarea,
                id:id,
                finalizado:false,
                eliminado:false
            })
        }
        localStorage.setItem('TODO',JSON.stringify(LIST))
        input.value = '';
        id++
    });


    document.addEventListener(`keyup`,function(event){
        if(event.key==`Enter`){
            const tarea = input.value
            if(tarea){
                agregarTarea(tarea,id,false,false)
                LIST.push({
                    nombre:tarea,
                    id:id,
                    finalizado:false,
                    eliminado:false
                })
            }
            localStorage.setItem('TODO',JSON.stringify(LIST))
            input.value = ``;
            id++
        } 
         
    })

    function tareaRealizada(element){
        element.classList.toggle(check)
        element.classList.toggle(uncheck)
        element.parentNode.querySelector('.text').classList.toggle(lineThrough)
        LIST[element.id].realizado = LIST[element.id].realizado ?false :true
    }
    function tareaEliminada(element){
        element.parentNode.parentNode.removeChild(element.parentNode)
        LIST[element.id].eliminado = true
    }

    lista.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData==='realizado'){
        tareaRealizada(element)
    }
    else if (elementData==='eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    })

    let data = localStorage.getItem('TODO')

    if(data){
        LIST=JSON.parse(data)
        id = LIST.length
        cargarLista(LIST)
    }else{
        LIST = []
        id=0

    }
    function cargarLista(DATA){
        DATA.forEach(function(i){
            agregarTarea(i.nombre,i.id,i.realizado,i.eliminadoa)
        })
    }

});