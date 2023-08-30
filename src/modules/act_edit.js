const { ipcRenderer } = require("electron");
const fs = require("fs");
const btn_cancel = document.querySelector("#cancelar");
const btn_acep = document.querySelector("#aceptar");
const inpt_nombre = document.querySelector("#nombre");
const inpt_duracion = document.querySelector("#duracion");
const slt_mision = document.querySelector("#mision");
const slt_tipo = document.querySelector("#tipo");
const { rutas, data } = require("../modules/funciones.js");
let direcorios = rutas();

btn_cancel.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("cancelando");
  ipcRenderer.send("cancel_edit");
});

let actividad_actual = data(direcorios.act_edit);
let actividades = data(direcorios.actividades);
actividades.forEach((actividad) => {
  if (actividad.nombre == actividad_actual.nombre) {
    inpt_nombre.value = actividad.nombre;
    inpt_duracion.value = actividad.duracion;
  }
});
