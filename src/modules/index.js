const { ipcRenderer } = require("electron");
const funciones = require("./src/modules/funciones.js");
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let nombre = document.querySelector("#nombre").value;
  let unidad = document.querySelector("#unidad").value;

  let datos_unidad_nombre = null;
  if (nombre != "" && unidad != "") {
    datos_unidad_nombre = {
      nombre: nombre,
      unidad: unidad,
    };
  }
  let paths_array = funciones.rutas();
  funciones.write_json(paths_array.datos_unidad_nombre, datos_unidad_nombre);
  ipcRenderer.send("acts_list", datos_unidad_nombre);


  nombre.value = "";
  unidad.value = "";
});
