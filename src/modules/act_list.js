const { ipcRenderer } = require("electron");
const { rutas, data, write_json } = require("../modules/funciones.js");
const funciones = require("../modules/funciones.js");
const dirs = rutas();
const actividades = data(dirs.actividades);
const Table = document.querySelector("Table");
const datos_consulta = data(dirs.datos_temporales);
actividades.forEach((actividad) => {
  if (actividad.unidad == datos_consulta.unidad) {
    let linea =
      "<tr> <td>" +
      actividad.duracion +
      "</td><td>" +
      actividad.nombre +
      "</td><td>" +
      actividad.mision +
      "</td><td>" +
      actividad.tipo +
      "</td><td>" +
      actividad.objetivo +
      "</td><td>" +
      actividad.necesidades +
      "</td><td><button class='agregar' id=" +
      actividad.nombre +
      " >añadir</button></td><td><button class='edit' id=" +
      actividad.nombre +
      ">Editar actividad</button></td></tr>";
    Table.insertAdjacentHTML("beforeend", linea);
  }
});
const p = document.querySelector("p");
p.insertAdjacentHTML(
  "afterend",
  "Tabla de actividades de " + datos_consulta.nombre
);
const btn = document.querySelector("#return");
btn.addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send("return", true);
});
//NOTE: editar actividad
const btn_edit = document.querySelectorAll(".edit");
btn_edit.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    let id_element = boton.id;
    ipcRenderer.send("editar", id_element);
  });
});
const btn_new_act = document.querySelector("#new_act");
btn_new_act.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("creando..");
  ipcRenderer.send("redir_new");
});
const btn_push_act = document.querySelectorAll("#agregar");
btn_push_act.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("añadiendo");
    let actividad = funciones.obtener_act(boton.id);
    //NOTE debe crear un archivo o añadir a ese archivo la actividad obtenida
  });
});
