
const buscar = document.getElementById("buscar");
const busqueda = document.getElementsByTagName("p");
const input = document.getElementById("ingreso");
const form = document.querySelector("form");
const contenedorProductos = document.getElementById("contenedorVino")
const verCarrito = document.getElementById("verCarrito");
const contenedorLista = document.getElementById("contenedor-lista");
const contadorCarrito = document.getElementById("contador-carrito");
const botonVaciar = document.getElementById('vaciar-carrito')
const vinos = [
    { id: 1, nombre: "El Enemigo", precio: 1200, img: "./img/enemigo.jpg"},
    { id: 2, nombre: "Salentein", precio: 1800 , img: "./img/salentein.jpg"},
    { id: 3, nombre: "Luigi bosca", precio: 2800, img: "./img/luigi-bosca.jpg"},
    { id: 4, nombre: "Catena malbec", precio: 1500, img: "./img/catena.jpg"},
    { id: 5, nombre: "Patridge", precio: 1200, img: "./img/partridge.jpg"},
    { id: 6, nombre: "Catena zapata", precio: 1900, img: "./img/catena-zapata.jpg"},
  ];
   
  //                             evento de busqueda del producto
   input.addEventListener("keyup", ()=>{
      busqueda[0].innerText = input.value;
    })
     function filtrarVino(arr, filtro) {
       const filtrado = arr.filter((el) => {
         return el.nombre.includes(filtro);
      });
       return filtrado;
     }
     buscar.addEventListener("click", () => {
       let resultado = filtrarVino(vinos, input.value);
       console.log(resultado);
        busqueda[0].innerText = `${resultado[0].nombre}`;
    });
   form.addEventListener("submit",(e)=>{

      e.preventDefault();
    })
  
  //            creando carrito y aplicando guardado local     //
   let carrito = [];
   document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//                   boton eliminacion del carrio  
botonVaciar.addEventListener('click', () => {
  carrito.length = 0
  localStorage.clear()
  actualizarCarrito()
})
//                **********          creando el html     ********
vinos.forEach((producto) => {
  const div = document.createElement('div')
  div.classList.add('cards')
  div.innerHTML = `
  <img src=${producto.img} alt= "">
  <h3>${producto.nombre}</h3>
  <p class="precioProducto">Precio:$ ${producto.precio}</p>
  <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
  `
  contenedorProductos.appendChild(div)
  
  const boton = document.getElementById(`agregar${producto.id}`)


  boton.addEventListener('click', () => {
      
      agregarAlCarrito(producto.id)
      
  })


})
              //             click carrito para mostrar //
const mostrarcarrito = () =>{
  document.getElementById("contenedor-lista").style.display ="inline-block";
}
 verCarrito.addEventListener("click",()=>{
   mostrarcarrito();
 })
//                           push al carrito
const agregarAlCarrito = (prodId) => {

  const item = vinos.find(prod => prod.id === prodId)

      carrito.push(item)
      actualizarCarrito()
      
  }

//                            lista productos  //////
 
const actualizarCarrito = () => {
    contenedorLista.innerHTML = ""

  carrito.forEach((prod) => {
    const div = document.createElement('div')
    div.className = ('listaProductos')
    div.innerHTML = `
    <img src="${prod.img}">
    <p>${prod.nombre}</p>
    <p>Precio:$${prod.precio}</p>
    
    `

    contenedorLista.appendChild(div)
    
  localStorage.setItem('carrito',JSON.stringify(carrito))
  

  })

//                          contador a pagar
  contadorCarrito.innerText = carrito.length;
  const total = carrito.reduce((acc , el) => acc + el.precio,0);

     const totalProductos = document.createElement("div")
     totalProductos.className = "totalProductos"
     totalProductos.innerHTML = `
       <h3>Total a pagar: $ ${total}
   `;
     contenedorLista.append(totalProductos);
    
   
//                  boton salir de la lista   
     const listaButton = document.createElement("h1")
     listaButton.innerText = "x";
     listaButton.className = "listaButton";
   
   
     listaButton.addEventListener("click",() => {
          contenedorLista.style.display = "none"
     });
   
     contenedorLista.append(listaButton);
  



}

  
  