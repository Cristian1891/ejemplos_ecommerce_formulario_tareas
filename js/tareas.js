class Tarea {
    constructor(nombreTarea, textoTarea) {
        this.nombre = nombreTarea
        this.texto = textoTarea
    }
}

let tareas = []

if(localStorage.getItem('tareas')){
    tareas = JSON.parse(localStorage.getItem('tareas'));
}else{
    localStorage.setItem('tareas',JSON.stringify(tareas));
}

const form = document.getElementById('idForm');
const botonTareas = document.getElementById('idBotonTarea');
const divTareas = document.getElementById('divTareas');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let datForm = new FormData(e.target);
    const tarea = new Tarea(datForm.get('nombre'), datForm.get('texto'));
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    Swal.fire({
        icon: 'success',
        text: `Tarea ${datForm.get('nombre')} creada`,
        showConfirmButton: false,
        timer: 1500
    })
    form.reset();
})


botonTareas.addEventListener('click', ()=>{
    let tareasStorage = JSON.parse(localStorage.getItem('tareas'));
    divTareas.innerHTML = "";
    tareasStorage.forEach((tarea, indice) => {
        divTareas.innerHTML += `
        <div class="card border-primary mb-3" id="tarea${indice}" style="max-width:17rem;margin:4px">
            <div class="card-header">${tarea.nombre}</div>
            <div class="card-body">
                <h4 class="card-title">${tarea.texto}</h4>
                <button class="btn btn-danger">Eliminar Tarea</button>
            </div>
        </div>
        `
    })

    tareasStorage.forEach((tarea, indice) => {
        document.getElementById(`tarea${indice}`).lastElementChild.lastElementChild.addEventListener('click', ()=>{
            document.getElementById(`tarea${indice}`).remove();
            tareas.splice(indice, 1);
            localStorage.setItem('tareas', JSON.stringify(tareas));
            Toastify({
                text: `Tarea ${tarea.nombre} eliminada`,
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
              }).showToast();
        })
    })
})