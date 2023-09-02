const { ipcRenderer } = require("electron");
const btn_cancel = document.querySelector("#cancelar");
const btn_acep = document.querySelector("#aceptar");
const inpt_nombre = document.querySelector("#nombre");
const inpt_duracion = document.querySelector("#duracion");
const slct_mision = document.querySelector("#mision");
const slct_tipo = document.querySelector("#tipo");
const { rutas, data } = require("../modules/funciones.js");
let paths_array = rutas();

btn_cancel.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("cancelando");
  ipcRenderer.send("cancel_edit");
});

// datos de actividad en los inputs
let actividad_actual = data(paths_array.actividad_a_editar);
let actividades = data(paths_array.json_actividades);
let datos_d_actividades = data(paths_array.mision_tipo);
actividades.forEach((actividad) => {
  if (actividad.nombre == actividad_actual.nombre) {
    inpt_nombre.value = actividad.nombre;
    inpt_duracion.value = actividad.duracion;
  }
});
datos_d_actividades.misiones.forEach((mision) => {
  let option = document.createElement("option");
  option.textContent = mision;
  option.value = mision;
  slct_mision.appendChild(option);
});
datos_d_actividades.tipos.forEach((tipo) => {
  let option = document.createElement("option");
  option.textContent = tipo;
  option.value = tipo;
  slct_tipo.appendChild(option);
});
// escribir lo editado
btn_acep.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("guardado");
});
