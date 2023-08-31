const { ipcRenderer, dialog } = require("electron");
const funciones = require("./src/modules/funciones.js");
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let nombre = document.querySelector("#nombre").value;
  let unidad = document.querySelector("#unidad").value;

  let datos_consulta = null;
  if (nombre != "" && unidad != "") {
    datos_consulta = {
      nombre: nombre,
      unidad: unidad,
    };
  }
  let ruta = funciones.rutas();
  funciones.write_json(ruta.datos_temporales, JSON.stringify(datos_consulta));
  ipcRenderer.send("acts_list", datos_consulta);
});
