const { ipcRenderer } = require("electron");
const funciones = require("../modules/funciones.js");
const actividades_funcs = require("../modules/actividades.js");
const paths_array = funciones.rutas();
let actividades_json = funciones.data(paths_array.json_actividades);
const Table = document.querySelector("Table");
const datos_unidad_nombre = funciones.data(paths_array.datos_unidad_nombre);
const filtro_tipo = document.querySelector("#filtro");

function agregar_listeners() {
  const btn_edit = document.querySelectorAll(".edit");
  btn_edit.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      let id_element = boton.id;
      ipcRenderer.send("editar", id_element);
    });
  });
  const btn_push_act = document.querySelectorAll(".agregar");
  btn_push_act.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      const ruta_cronograma = funciones.rutas().cronograma;
      let actividad = funciones.obtener_act(boton.id)
      let cronograma = (funciones.data(ruta_cronograma))
      if (cronograma == [] || cronograma == "[]") {
        cronograma = []
        cronograma.push(actividad);
        funciones.write_json(ruta_cronograma, cronograma);
        ipcRenderer.send("agregada_crono");
      } else {
        if (actividades_funcs.actividad_existe(actividad.nombre, cronograma)) {
          ipcRenderer.send("repetida_cronograma", boton.id);
        } else {
          cronograma.push(actividad);
          funciones.write_json(ruta_cronograma, cronograma);
          ipcRenderer.send("agregada_crono");
        }
      }
    });
  });
}
// mostrar actividades segun el tipo de actividad escogido
filtro_tipo.addEventListener("change", () => {
  while (Table.rows.length > 1) {
    Table.deleteRow(1)
  }
  if (actividades_json != undefined && actividades_json != "[]") {
    (actividades_json).forEach((actividad) => {
      if ((actividad.unidad.includes(datos_unidad_nombre.unidad)
      ) &&
        (actividad.tipo == filtro_tipo.value || filtro_tipo.value == "todos")
      ) {
        let linea =
          "<tr> <td>" +
          actividad.duracion +
          "</td><td>" +
          funciones.formato_string(actividad.nombre) +
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
  agregar_listeners()
})
//NOTE: ver si es q esto se queda pq repite funcionalidad
const crono_btn = document.querySelector("#verCrono")
crono_btn.addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send("return")
})

const p = document.querySelector("p");
p.insertAdjacentHTML(
  "afterend",
  "Tabla de actividades de " + datos_unidad_nombre.nombre
);
const btn = document.querySelector("#return");
btn.addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send("return_init");
});
let datos_d_actividades = funciones.data(paths_array.mision_tipo);
datos_d_actividades.tipos.forEach((tipo) => {
  let option = document.createElement("option");
  option.textContent = tipo;
  option.value = tipo;
  filtro_tipo.appendChild(option);
});

