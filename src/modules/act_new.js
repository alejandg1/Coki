const { ipcRenderer } = require("electron");
const { add_checkboxes, data, rutas, formato_string } = require("../modules/funciones.js");
const {
  datos_incompletos,
  actividad_existe,
} = require("../modules/actividades.js");

const div_boxes = document.querySelector("#checkboxes")
add_checkboxes(div_boxes)
const cancel_btn = document.querySelector("#cancelar_act_new");
cancel_btn.addEventListener("click", (event) => {
  event.preventDefault()
  ipcRenderer.send("cancelar_new_act");
});

const form = document.querySelector("#form_add");
let paths_array = rutas();
let actividades_json = (data(paths_array.json_actividades))
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name_act = document.querySelector("#nombre").value;
  let time_act = document.querySelector("#time").value;
  //  let unidad_act = document.querySelector("#unidad").value;
  let necesidades_act = document.querySelector("#necesidades").value;
  let tipo_act = document.querySelector("#tipo").value;
  let objetivo_act = document.querySelector("#objetivo").value;
  let boxes = document.querySelectorAll(".unidades")
  let unidades = []
  boxes.forEach((box) => {
    if (box.checked) {
      unidades.push(box.value)
    }
  })
  let nueva_actividad = {
    nombre: formato_string(name_act, "reverse"),
    unidad: unidades,
    objetivo: objetivo_act,
    duracion: time_act,
    necesidades: necesidades_act,
    tipo: tipo_act,
  };
  if (actividades_json != undefined && actividades_json != "[]") {
    if (actividad_existe(nueva_actividad.nombre, actividades_json)) {
      ipcRenderer.send("nombre_repetido");
    } else {
      if (
        datos_incompletos([
          nueva_actividad.nombre,
          nueva_actividad.tipo,
          nueva_actividad.duracion,
        ])
      ) {
        ipcRenderer.send("datos_incompletos");
      } else {
        actividades_json.push(nueva_actividad);
        console.log(nueva_actividad)
        ipcRenderer.send("nueva_actividad", actividades_json);
      }
    }
  } else {
    actividades_json = [];
    if (
      datos_incompletos([
        nueva_actividad.nombre,
        nueva_actividad.tipo,
        nueva_actividad.duracion,
        nueva_actividad.unidad,
      ])
    ) {
      ipcRenderer.send("datos_incompletos");
    } else {
      actividades_json.append(nueva_actividad);
      ipcRenderer.send("nueva_actividad", actividades_json);
    }
  }
});
let datos_d_actividades = data(paths_array.mision_tipo)
let slt_tipo = document.querySelector("#tipo");
if (slt_tipo != undefined && slt_tipo != []) {
}
if (datos_d_actividades != undefined && slt_tipo != []) {
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
}
