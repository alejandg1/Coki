const { data, rutas } = require("../modules/funciones.js");
const funciones = require("../modules/funciones.js");

const form = document.querySelector("form");
let directorios = rutas();
let actividades = data(directorios.actividades);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name_act = document.querySelector("#nombre").value;
  let time_act = document.querySelector("#time").value;
  let necesidades_act = document.querySelector("#necesidades").value;
  let mision_act = document.querySelector("#mision").value;
  let tipo_act = document.querySelector("#tipo").value;

  let new_act = {
    nombre: name_act,
    duracion: time_act,
    necesidades: necesidades_act,
    tipo: tipo_act,
    mision_act: mision_act,
  };
  // comprobar no existencia
  actividades.forEach((actividad) => {
    if (actividad.nombre == new_act.nombre) {
      console.log("ya existe");
    } else {
      // agregar al json
      actividades.push(new_act);
      console.log(actividades);
      //escribir json
      //funciones.write_json(directorios.actividades, actividades);
    }
  });
});
let datos_d_actividades = data(directorios.data_act);
let slt_mision = document.querySelector("#mision");
let slt_tipo = document.querySelector("#tipo");
datos_d_actividades.misiones.forEach((mision) => {
  let option = document.createElement("option");
  option.textContent = mision;
  option.value = mision;
  slt_mision.appendChild(option);
});
datos_d_actividades.tipos.forEach((tipo) => {
  let option = document.createElement("option");
  option.textContent = tipo;
  option.value = tipo;
  slt_tipo.appendChild(option);
});
