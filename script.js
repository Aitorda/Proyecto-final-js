

class Departamento {
  constructor(nombre, precio, cantidadPersonas, cochera, cantidadPersonasReservadas = 1, cantidadNochesReservadas = 1) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidadPersonas = cantidadPersonas;
    this.cochera = cochera;
    this.cantidadPersonasReservadas = cantidadPersonasReservadas;
    this.cantidadNochesReservadas = cantidadNochesReservadas;

  }

  get precioDeReserva() {
    return this.cantidadNochesReservadas * this.cantidadPersonasReservadas * this.precio
  }

  clonar() {
    return new Departamento(this.nombre, this.precio, this.cantidadPersonas, this.cochera,
      this.cantidadPersonasReservadas, this.cantidadNochesReservadas)
  }
}


fetch("./data.json")
  .then(respuesta => respuesta.json())
  .then(departamentos => renderDepartamentos(departamentos.map(d =>
    new Departamento(d.nombre, d.precio, d.cantidadPersonas, d.cochera))))


let carrito = []

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if (storage) {
    carrito = storage.map(item =>
      new Departamento(item.nombre, item.precio, 0, item.cochera, item.cantidadPersonasReservadas, item.cantidadNochesReservadas));
    renderCarrito()
  }
}

let container = document.getElementById("container");
const tbody = document.querySelector(`.tbody`);

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}


function renderDepartamentos(departamentos) {
  departamentos.forEach(departamento => {
    console.log(departamento.nombre)
    let item = document.createElement("div");
    item.innerHTML = `
      <div class="col d-flex justify-content-center-mb-4">
            <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
              <h5 class="card-title pt-2 text-center text-primary">${departamento.nombre}</h5>
              <img class="card-img-top" src="./Imagenes/${departamento.nombre}.webp" alt="Card image cap">
              <div class="card-body  ">
  
                <p class="card-text text-white-50 description">${departamento.nombre}, cuenta con una capacidad hasta para ${departamento.cantidadPersonas} personas
                </p>
                <h5 class="text-primary">Precio: <span class="precio">$ ${departamento.precio}/noche</span></h5>
                <div class="d-grid gap-2">
                <p class="text-white">A partir de :</p>
                <input type = "date" />
                  <p class="text-white">Cantidad de noches</p>
                  <input type="number" id="${departamento.nombre}-noches" value="${departamento.cantidadNochesReservadas}"  min="1">
                  <p class="text-white">Cantidad de personas</p>
                        <input type="number" id="${departamento.nombre}-personas" value="${departamento.cantidadPersonasReservadas}"  min="1">
                        <p class="text-white" id="${departamento.nombre}-precio">Precio: $${departamento.precio}</p>
                  <button class="btn btn-primary button" id="${departamento.nombre}-boton">Reservar</a>
                </div>
  
              </div>
            </div>
          </div>
      `
    container.append(item);

    let nocheReservada = document.getElementById(departamento.nombre + "-noches");
    let cantidadPersonas = document.getElementById(departamento.nombre + "-personas");
    let precio = document.getElementById(departamento.nombre + "-precio");
    let boton = document.getElementById(departamento.nombre + "-boton");

    function calcularPrecioNocheReservadas(e) {
      departamento.cantidadNochesReservadas = nocheReservada.value
      precio.textContent = "Precio: $" + departamento.precioDeReserva
    }

    function calcularPrecioCantidadPersonasReservadas(e) {
      departamento.cantidadPersonasReservadas = cantidadPersonas.value
      precio.textContent = "Precio: $" + departamento.precioDeReserva
    }

    function agregarCarrito() {
      carrito.push(departamento.clonar())
      const alert = document.querySelector('.agregar');

      setTimeout(function () {
        alert.classList.add('hide')
      }, 2000)
      alert.classList.remove('hide')
      guardarCarrito()
      renderCarrito()
    }
    nocheReservada.addEventListener("input", calcularPrecioNocheReservadas)
    cantidadPersonas.addEventListener("input", calcularPrecioCantidadPersonasReservadas)
    boton.addEventListener("click", agregarCarrito)
  }
  )
}

function renderCarrito() {
  tbody.innerHTML = ``
  carrito.forEach((item, index) => {
    const tr = document.createElement(`tr`)
    tr.classList.add(`itemCarrito`)
    const content = `
      <th scope="row">${index + 1}</th>
      <td class="table__productos">
          <img src="./Imagenes/${item.nombre}.webp" alt="">
          <h6 class="title">${item.nombre}</h6>
      </td>
      <td class="table__precio"><p>$${item.precioDeReserva}</p></td>
      <td class="table__cantidad">
        <input type="number" min ="1" value=${item.cantidadNochesReservadas} class="input__elemento">
        <button class="delete btn btn-danger" >X</button>
      </td>
      
      `
    tr.innerHTML = content;
    tbody.append(tr)
    tr.querySelector(`.delete`).addEventListener('click', removeItemCarrito(index))
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad(index))
  })
  CarritoTotal()
}

function CarritoTotal() {
  let total = 0;
  const itemCartTotal = document.querySelector(`.itemCartTotal`)
  carrito.forEach((item) => {
    total = total + item.precioDeReserva
  })

  itemCartTotal.innerHTML = `Total $${total}`

}

function removeItemCarrito(indice) {
  return () => {
    carrito.splice(indice, 1);
    guardarCarrito()
    renderCarrito()

    const alert = document.querySelector('.remove');

    setTimeout(function () {
      alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')
  }
}

function sumaCantidad(indice) {
  return (event) => {
    const item = carrito[indice]
    const input = event.target
    const cantidadNoches = input.value
    item.cantidadNochesReservadas = cantidadNoches
    guardarCarrito()

    renderCarrito()
    console.log(carrito);
  }
}
let pagar = document.getElementById("pagar");
pagar.addEventListener("click", () => {
  if (carrito.length === 0) {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "No cuenta con reservas",
      showConfirmButton: false,
      timer: 3000,
    })
  }
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Pago confirmado",
    showConfirmButton: false,
    timer: 3000,
  }).then(() => {
    carrito = []
    guardarCarrito()
    window.location.href = '/index.html'

  })
}
)