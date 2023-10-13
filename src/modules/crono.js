const { ipcRenderer } = require("electron");
const funciones = require("../modules/funciones.js");
const paths_array = funciones.rutas();
let actividades_json = (funciones.data(paths_array.cronograma))
const Table = document.querySelector("Table");
const Excel = document.querySelector("#xlsx");
const btn_new_act = document.querySelector("#new_act");



if (
  actividades_json != undefined &&
  actividades_json != "[]" &&
  actividades_json.length > 0
) {
  actividades_json.forEach((actividad) => {let svgButtonRemove = `<button class='boton-quitar'><svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
<path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
</svg></button>`;
    let linea =
      "<tr id='actividad' > <td>" +
      actividad.duracion + " min" +
      "</td><td>" +
      funciones.formato_string(actividad.nombre) + "</td><td>" +
      actividad.tipo +
      "</td><td>" +
      actividad.objetivo +
      "</td><td>" +
      actividad.necesidades +
      "</td><td>" + svgButtonRemove + "</td></tr>";
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

const btn_delete_act = document.querySelectorAll(".boton-quitar");
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
btn_new_act.addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send("redir_new");
});
Excel.addEventListener("click", () => {
  funciones.crear_excel();
});
