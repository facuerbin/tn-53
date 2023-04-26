// Microdesafío 1

let main = document.querySelector("main");
let h2 = document.querySelector("h2");
let a = document.querySelector("a");
let p = document.querySelectorAll("p");

let nombre = window.prompt("Ingrese su nombre");

// En caso de que el usuario no coloque su nombre, a la etiqueta <h2>, se le debe
// agregar la palabra “Invitado”. En caso contrario, se le debe agregar el nombre que el
// usuario ingresó.
// if (!nombre) {
//     nombre = "Invitado";
// }

nombre = nombre ? nombre : "Invitado";

h2.innerText += " " + nombre;
// text-transform
h2.style.textTransform = "uppercase";

a.style.color = "#E51B3E";

let fondoPantalla = window.confirm("¿Desea colocar un fondo de pantalla?");

if (fondoPantalla) {
  document.querySelector("body").classList.add("fondo");
}

// for (let i = 0; i < p.length; i++) {
//     if (i % 2 == 0) {
//         p[i].classList.add('destacadoPar');
//     } else {
//         p[i].classList.add('destacadoImpar');
//     }
// }

// p.forEach((element, i) => {
//     if (i % 2 == 0) {
//         element.classList.add('destacadoPar');
//     } else {
//         element.classList.add('destacadoImpar');
//     }
// })

p.forEach((element, index) =>
  element.classList.add(index % 2 == 0 ? "destacadoPar" : "destacadoImpar")
);

console.log(fondoPantalla);

main.style.display = "block";
