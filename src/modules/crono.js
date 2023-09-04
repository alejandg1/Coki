const { ipcRenderer } = require("electron");
const funciones = require("../modules/funciones.js");
const actividades_funcs = require("../modules/actividades.js");
const paths_array = funciones.rutas();
let actividades_json = funciones.data(paths_array.cronograma);
const Table = document.querySelector("Table");
if (actividades_json != undefined && actividades_json != "[]") {
  actividades_json.forEach((actividad) => {
    let linea =
      "<tr> <td>" +
      actividad.duracion +
      "</td><td>" +
      funciones.formato_string(actividad.nombre) +
      "</td><td>" +
      actividad.mision +
      "</td><td>" +
      actividad.tipo +
      "</td><td>" +
      actividad.objetivo +
      "</td><td>" +
      actividad.necesidades +
      "</td><td><button class='quitar' id=" +
      funciones.formato_string(actividad.nombre, "reverse") +
      ">quitar actividad</button></td></tr>";
    Table.insertAdjacentHTML("beforeend", linea);
  });
} else {
  Table.insertAdjacentHTML("beforeend", "No existen actividades guardadas");
}
//NOTE: agregar actividades
const btn_list = document.querySelector("#list_act");
btn_list.addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send("agregar");
});
//NOTE: remover activida

const btn_delete_act = document.querySelectorAll(".quitar");
btn_delete_act.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    const ruta_cronograma = funciones.rutas().cronograma;
    let cronograma = funciones.data(ruta_cronograma);
    let nuevo_cronograma = cronograma.filter((actividad) => {
      actividad.nombre != boton.id;
    });
    funciones.write_json(ruta_cronograma, nuevo_cronograma);
    ipcRenderer.send("actividad_eliminada");
  });
});
