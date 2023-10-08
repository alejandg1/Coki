const { ipcRenderer } = require("electron");
const btn_cancel = document.querySelector("#cancelar");
const btn_acep = document.querySelector("#aceptar");
const inpt_nombre = document.querySelector("#nombre");
const inpt_duracion = document.querySelector("#duracion");
const slct_tipo = document.querySelector("#tipo");
const { rutas, data, obtener_act, formato_string, editar_actividad, obtener_indice, write_json } = require("../modules/funciones.js");
let paths_array = rutas();

btn_cancel.addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send("cancel_edit");
});

// datos de actividad en los inputs
let actividad_actual = data(paths_array.actividad_a_editar);
let actividades_json = data(paths_array.json_actividades);
inpt_nombre.value = formato_string(actividad_actual.nombre, "");
inpt_duracion.value = actividad_actual.duracion
let datos_d_actividades = data(paths_array.mision_tipo)
datos_d_actividades.tipos.forEach((tipo) => {
  let option = document.createElement("option");
  option.textContent = tipo;
  option.value = tipo;
  slct_tipo.appendChild(option);
});
// escribir lo editado
btn_acep.addEventListener("click", (event) => {
  event.preventDefault();
  let actividad_editada = {
    nombre: formato_string(inpt_nombre.value, "reverse"),
    tipo: slct_tipo.value,
    duracion: inpt_duracion.value
  }
  let indice = obtener_indice(actividad_actual.nombre, actividades_json)
  let actividades_editadas = editar_actividad(actividad_editada, indice, actividades_json)
  write_json(paths_array.json_actividades, actividades_editadas)
  ipcRenderer.send("editado")
});
