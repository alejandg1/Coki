const { rutas, data } = require("./src/modules/funciones.js");
const LStr_path = rutas();
const LDir_data = data(LStr_path);
const Table = document.querySelector("table");

console.log("xd");
LDir_data.forEach((actividad) => {
  console.log({
    nombre: actividad.nombre,
    duracion: actividad.duracion,
    desc: actividad.desc,
  });
  let linea =
    "<tr> <td>" +
    actividad.nombre +
    "</td><td>" +
    actividad.duracion +
    "</td><td>" +
    actividad.desc +
    "</td></tr>";
  Table.insertAdjacentHTML("beforeend", linea);
});
