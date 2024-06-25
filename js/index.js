let productos = [];

class Producto{
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        
    }
}

let producto1 = new Producto(1, "bermuda lacoste", 500, "bermuda-lacoste-denim-slim.jpg");
let producto2 = new Producto(2, "botines de futbol", 450, "botines-de-futbol-topper.jpg");
let producto3 = new Producto(3, "camiseta arsenal", 768, "camiseta-arsenal.jpg");
let producto4 = new Producto(4, "chomba lacoste", 690, "chomba-azul.jpg");
let producto5 = new Producto(5, "bermuda lacoste", 568, "bermuda-lacoste-denim-slim.jpg");
let producto6 = new Producto(6, "guante reusch", 245, "guante-de-arquero-reusch.jpg");
let producto7 = new Producto(7, "mochila dunlop", 345, "mochila-dunlop-abbey.jpg");
let producto8 = new Producto(8, "musculosa reebok", 780, "musculosa-reebok.jpg");
let producto9 = new Producto(9, "pelota adidas", 150, "pelota-adidas.jpg");
let producto10 = new Producto(10, "raqueta", 290, "raqueta-de-tenis-dunlop.jpg");



let {id, nombre, precio, img} = producto1
console.log(id)
console.log(nombre)


let contenedor = document.getElementById("contenedor");

productos.push(producto1);
productos.push(producto2);
productos.push(producto3);
productos.push(producto4);
productos.push(producto5);
productos.push(producto6);
productos.push(producto7);
productos.push(producto8);
productos.push(producto9);
productos.push(producto10);

// const desestructurar = ({producto}) =>{
//     let {id, nombre, img, precio} = producto;
//     return {id, nombre, img, precio};

// }

productos.forEach(prod => {
    let {id, nombre, precio, img} = prod;
    contenedor.innerHTML +=  `
    <div class="card border-primary mb-3 text-center" style="max-width: 15rem; margin:4px">
        <div class="card-header name" style="max-width: 15rem; margin:4px">${nombre}</div>
        <img src="img/${img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title">$${precio}</h4>
            <button class="btn btn-success my-3 agregar-carrito" data-id="${id}">Agregar al carrito</button>
        </div>
    </div>
    
    `
})

let butons = document.querySelectorAll(".agregar-carrito");




const obtenerProductosLocalStorage = () =>{
    let productoLS;
    if(localStorage.getItem('productos') == null){
        productoLS = [];
    }
    else{
        productoLS= JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS
}

//Almacenar en el LS
const guardarProductosLocalStorage = (producto)=>{
    let productos;
    //Toma valor de un arreglo con datos del LS
    productos = obtenerProductosLocalStorage();
    //Agregar el producto al carrito
    productos.push(producto);
    //Agregamos al LS
    localStorage.setItem('productos', JSON.stringify(productos));
}

const insertarCarrito = (producto)=>{
    const listaProductos = document.querySelector('.contenido');
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="align-middle">
            <img src="${producto.img}" width="100">
        </td>
        <td class="align-middle text-wrap">${producto.nombre}</td>
        <td class="align-middle text-center">${producto.precio}</td>
        <td class="align-middle text-center">
            <input type="number" value="1" min="1" class="w-50">
        </td>
        <td class="align-middle text-center">
            <button data-id="${producto.id}" type="button" class="btn btn-danger">
                <i class="bi bi-trash-fill"></i>
            </button>
        </td>
    `;
    
    listaProductos.appendChild(row);

    guardarProductosLocalStorage(producto);
    
}

butons.forEach(buton =>{
    buton.addEventListener("click", (e) =>{
        const producto = e.target.parentElement.parentElement
        console.log(producto)
        const info = {
            img: producto.querySelector('img').src,
            nombre: producto.querySelector('.name').textContent,
            precio: producto.querySelector('h4').innerText,
            id: producto.querySelector('button').getAttribute('data-id'),

        }
        let productoLS;
        productoLS = obtenerProductosLocalStorage();
        let prodId;
        productoLS.forEach((productoLS) => {
            if(productoLS.id == info.id){
                prodId = productoLS.id
            }
        })
        if(prodId === info.id){
            Swal.fire({
                icon: 'info',
                text: `Producto ${info.nombre} ya se encuentra en el carrito`,
                showConfirmButton: false,
                timer: 2000
            })
        }else{
            Toastify({
                text: `Producto ${info.nombre} agregado al carrito`,
                duration: 3000,
              }).showToast();
            insertarCarrito(info);
        }
    })
})

//Mostrar los productos guardados en el LS
const leerLocalStorage = ()=>{
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    productosLS.forEach((producto) =>{
        //Construir plantilla
        const listaProductos = document.querySelector('.contenido');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="align-middle">
                <img src="${producto.img}" width=100>
            </td>
            <td class="align-middle text-wrap">${producto.nombre}</td>
            <td class="align-middle text-center">${producto.precio}</td>
            <td class="align-middle text-center">
                <input type="number" value="1" min="1" class="w-50">
            </td>
            <td class="align-middle text-center">
                <button id="${producto.id}" data-id="${producto.id}" type="button" class="btn btn-danger">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        `;
        
        listaProductos.appendChild(row);
        
    });
    
} 

leerLocalStorage();


//Eliminar todos los datos del LS
const vaciarLocalStorage = ()=>{
    localStorage.clear();
} 

// Elimina todos los productos
const vaciarCarrito = ()=>{
    const listaProductos = document.querySelector('.contenido');
    // console.log(listaProductos.firstChild)
    while(listaProductos.firstElementChild){
        const listaTr = listaProductos.querySelectorAll('tr');
        listaTr.forEach((fila)=>{
            fila.remove();
        })
    }
    vaciarLocalStorage();
}

let boton = document.getElementById('vaciar');

boton.addEventListener('click', ()=>{
    vaciarCarrito();
})






