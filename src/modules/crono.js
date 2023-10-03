const { ipcRenderer } = require("electron");
const funciones = require("../modules/funciones.js");
const paths_array = funciones.rutas();
let actividades_json = (funciones.data(paths_array.cronograma))
const Table = document.querySelector("Table");
const Excel = document.querySelector("#xlsx");
console.log(actividades_json)
if (
  actividades_json != undefined &&
  actividades_json != "[]" &&
  actividades_json.length > 0
) {
  actividades_json.forEach((actividad) => {
    let linea =
      "<tr id='actividad' > <td>" +
      actividad.duracion +
      "</td><td>" +
      funciones.formato_string(actividad.nombre) + "</td><td>" + actividad.mision +
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

const btn_list = document.querySelector("#list_act");
btn_list.addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send("agregar");
});

const btn_delete_act = document.querySelectorAll(".quitar");
btn_delete_act.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    const ruta_cronograma = paths_array.cronograma
    let cronograma = funciones.data(ruta_cronograma);
    let nuevo_cronograma = cronograma.filter((actividad) => actividad.nombre != boton.id);
    funciones.write_json(ruta_cronograma, nuevo_cronograma);
    ipcRenderer.send("actividad_eliminada", nuevo_cronograma);
  });
});

Excel.addEventListener("click", () => {
  funciones.crear_excel();
});
