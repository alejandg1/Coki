const { ipcRenderer, ipcMain } = require("electron");
const funciones = require("../modules/funciones.js");
const actividades_funcs = require("../modules/actividades.js");
const paths_array = funciones.rutas();
let actividades_json = funciones.data(paths_array.json_actividades);
const Table = document.querySelector("Table");
const datos_unidad_nombre = funciones.data(paths_array.datos_unidad_nombre);
const filtro_tipo = document.querySelector("#filtro");

function agregar_listeners() {
  const btn_edit = document.querySelectorAll(".boton-lapiz");
  btn_edit.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      let actividad = funciones.obtener_act(funciones.formato_string(boton.id, "reverse"))
      ipcRenderer.send("editar", actividad);
    });
  });
  const btn_desc = document.querySelectorAll(".svgButtonDesc ");
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
  const btn_push_act = document.querySelectorAll(".boton-agregar");
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
let svgButton = `<button class='boton-lapiz'>
<svg class="edit-svgIcon" viewBox="0 0 512 512">
<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
</svg></button>`;

let svgButtonAdd = `<button class='boton-agregar' ><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 5v14m-7-7h14'/></svg></button>`;

let svgButtonDesc = `<button class='boton-descripcion'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 12h18M3 6h18M3 18h18'/></svg></button>`;
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

