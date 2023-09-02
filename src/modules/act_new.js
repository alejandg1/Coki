const { ipcRenderer } = require("electron");
const { data, rutas } = require("../modules/funciones.js");

const form = document.querySelector("form");
let paths_array = rutas();
let actividades_json = data(paths_array.json_actividades);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name_act = document.querySelector("#nombre").value;
  let time_act = document.querySelector("#time").value;
  let necesidades_act = document.querySelector("#necesidades").value;
  let mision_act = document.querySelector("#mision").value;
  let tipo_act = document.querySelector("#tipo").value;

  let nueva_actividad = {
    nombre: name_act,
    duracion: time_act,
    necesidades: necesidades_act,
    tipo: tipo_act,
    mision: mision_act,
  };
  // comprobar no existencia
  let actividad_existe = false;
  if (actividades_json != undefined && actividades_json != []) {
    actividades_json.forEach((actividad) => {
      if (actividad.nombre == nueva_actividad.nombre) {
        actividad_existe = true;
        ipcRenderer.send("nombre_repetido", nueva_actividad.nombre);
      }
    });
  } else {
    actividades_json = [];
  }
  if (!actividad_existe) {
    if (nueva_actividad.nombre != null) {
      actividades_json.push(nueva_actividad);
      console.log(actividades_json);
    } else {
      ipcRenderer.send("nombre_vacio");
    }
    //escribir json
    //funciones.write_json(directorios.actividades, actividades);
  }
});
let datos_d_actividades = data(paths_array.mision_tipo);
let slt_mision = document.querySelector("#mision");
let slt_tipo = document.querySelector("#tipo");
if (slt_tipo != undefined && slt_tipo != []) {
}
if (datos_d_actividades != undefined && slt_tipo != []) {
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
} else {
  let option = document.createElement("option");
  option.textContent = "no existen opciones";
  option.value = "";
  slt_tipo.appendChild(option);
  slt_mision.appendChild(option);
}
