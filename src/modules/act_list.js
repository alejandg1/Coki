const { ipcRenderer, ipcMain } = require("electron");
const funciones = require("../modules/funciones.js");
const actividades_funcs = require("../modules/actividades.js");
const paths_array = funciones.rutas();
let actividades_json = funciones.data(paths_array.json_actividades);
const Table = document.querySelector("Table");
const datos_unidad_nombre = funciones.data(paths_array.datos_unidad_nombre);
const filtro_tipo = document.querySelector("#filtro");

function agregar_listeners() {
  const btn_edit = document.querySelectorAll(".boton_lapiz");
  btn_edit.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      let actividad = funciones.obtener_act(funciones.formato_string(boton.id, "reverse"))
      ipcRenderer.send("editar", actividad);
    });
  });
  const btn_desc = document.querySelectorAll(".boton_descripcion");
  btn_desc.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      const id = boton.id
      let data = funciones.obtener_act(id)
      let desc_div = document.createElement("div")
      let parag = document.createElement("p")
      desc_div.id = id
      desc_div.style.display = "block"
      desc_div.style.zIndex = 999
      desc_div.style.height = 20
      desc_div.style.width = 20
      desc_div.blur(() => {
        desc_div.style.display = "none"
      })

      console.log(data)
      parag.innerHTML = data.descipcion
      desc_div.appendChild(parag)
      const div_padre = document.querySelector(".container-table")
      div_padre.appendChild(desc_div)

      //NOTE: mostrar Descripción
    });
  });
  const btn_push_act = document.querySelectorAll(".boton_agregar");
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
        let svgButton = `<button id="${funciones.formato_string(actividad.nombre, "reverse")}" class='boton_lapiz'> <img src="../../images/editar.png"></img>  </button>`;

        let svgButtonAdd = `<button id ="${funciones.formato_string(actividad.nombre, "reverse")}" class='boton_agregar'> <img src="../../images/agregar.png"></img>   </button>`;

        let svgButtonDesc = `<button id="${funciones.formato_string(actividad.nombre, "reverse")}" class='boton_descripcion'> <img src="../../images/meticuloso.png"></img> </button>`;
        let linea =
          "<tr> <td>" +
          actividad.duracion +
          " min </td><td>" +
          funciones.formato_string(actividad.nombre) +
          "</td><td>" +
          actividad.tipo +
          "</td><td>" +
          actividad.objetivo +
          "</td><td>" +
          actividad.necesidades +
          "</td><td>" + svgButtonAdd + "</td><td>" + svgButton + "</td><td>" + svgButtonDesc + "</td></tr>";
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

const crear_excel = document.querySelector("#crearCrono")
crear_excel.addEventListener("click", (event) => {
  event.preventDefault();
  funciones.crear_excel();
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

