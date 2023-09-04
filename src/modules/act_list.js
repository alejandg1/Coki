const { ipcRenderer } = require("electron");
const funciones = require("../modules/funciones.js");
const actividades_funcs = require("../modules/actividades.js");
const paths_array = funciones.rutas();
let actividades_json = funciones.data(paths_array.json_actividades);
const Table = document.querySelector("Table");
const datos_unidad_nombre = funciones.data(paths_array.datos_unidad_nombre);
if (actividades_json != undefined && actividades_json != "[]") {
  actividades_json.forEach((actividad) => {
    if (actividad.unidad == datos_unidad_nombre.unidad) {
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
        "</td><td><button class='agregar' id=" +
        funciones.formato_string(actividad.nombre, "reverse") +
        " >añadir</button></td><td><button class='edit' id=" +
        funciones.formato_string(actividad.nombre, "reverse") +
        ">Editar actividad</button></td></tr>";
      Table.insertAdjacentHTML("beforeend", linea);
    }
  });
} else {
  Table.insertAdjacentHTML("beforeend", "No existen actividades guardadas");
}
const p = document.querySelector("p");
p.insertAdjacentHTML(
  "afterend",
  "Tabla de actividades de " + datos_unidad_nombre.nombre
);
//NOTE: regresar pagina principal
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
//NOTE: mueva actividad
const btn_new_act = document.querySelector("#new_act");
btn_new_act.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("creando..");
  ipcRenderer.send("redir_new");
});
//NOTE: añadir al cronograma
const btn_push_act = document.querySelectorAll(".agregar");
btn_push_act.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    const ruta_cronograma = funciones.rutas().cronograma;
    let actividad = funciones.obtener_act(boton.id);
    let cronograma = funciones.data(ruta_cronograma);
    if (cronograma == "[]") {
      cronograma = [];
    }
    if (actividades_funcs.actividad_existe(boton.id, cronograma)) {
      ipcRenderer.send("repetida_cronograma", boton.id);
    } else {
      console.log("añadiendo");
      cronograma.push(actividad);
      funciones.write_json(ruta_cronograma, cronograma);
    }
  });
});
