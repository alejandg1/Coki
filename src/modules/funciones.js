const os = require("os");
const excel = require("xlsx");
const fs = require("fs");
const path = require("path");
const { ipcRenderer } = require("electron");

function rutas() {
  // devolver ruta segun el sistema
  const Systempath = os.homedir() + "/Coki";
  //const Systempath = require("os").homedir() + "/Coki";
  let directorios = {
    carpeta_coki: Systempath,
    json_actividades: path.join(Systempath, "actividades.json"),
    mision_tipo: path.join(Systempath, "mision_tipo.json"),
    datos_unidad_nombre: path.join(Systempath, "datos_consulta.json"),
    actividad_a_editar: path.join(Systempath, "datos_edit.json"),
    cronograma: path.join(Systempath, "cronograma.json"),
  };
  return directorios;
}

function directory(dir) {
  const LBool_extdir = fs.existsSync(dir);
  if (!LBool_extdir) {
    console.log("creando ruta...");
    fs.mkdir(dir, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  } else {
    console.log("ruta existe");
  }
}

function comprobar_json(ruta, contenido = []) {
  fs.access(ruta, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("creando archivo..");
      write_json(ruta, contenido);
    } else {
      console.log("archivo existente");
    }
  });
}
function datosjson(ruta) {
  try {
    let jsondata = fs.readFileSync(ruta);
    //  comprobar si está vaio el archivo
    if (jsondata != "") {
      // convertir datos a obtejo js
      jsondata = JSON.parse(jsondata);
      return jsondata;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
function write_json(ruta, contenido = []) {
  fs.writeFile(ruta, JSON.stringify(contenido), (error) => {
    if (error) {
      console.log(error);
    }
  });
}

function obtener_act(id) {
  let path = rutas();
  let actividades = datosjson(path.json_actividades);
  let encontrado = 0;
  actividades.forEach((actividad) => {
    if (actividad.nombre == id) {
      encontrado = actividad;
    }
  });
  return encontrado;
}

function formato_string(palabra, modo) {
  let nueva_palabra;
  let eliminar = /_/g;
  let agregar = " ";
  if (modo == "reverse") {
    eliminar = / /g;
    agregar = "_";
  }
  nueva_palabra = palabra.replace(eliminar, agregar);

  return nueva_palabra;
}
function xlsx() {
  const ruta_cronograma = rutas();
  let array_actividades = datosjson(ruta_cronograma.cronograma);
  let nombre_descargas = "Cronogramas";
  const dir_descargas = path.join(
    os.homedir(),
    nombre_descargas,
    "Cronograma.xlsx"
  );
  directory(path.join(os.homedir(), nombre_descargas));
  if (
    array_actividades != [] &&
    array_actividades != undefined &&
    typeof array_actividades != "string"
  ) {
    const workbook = excel.utils.book_new();
    const hoja = excel.utils.json_to_sheet(array_actividades);
    let ruta = path.join(os.homedir(), nombre_descargas)
    excel.utils.book_append_sheet(workbook, hoja, "cronograma");
    excel.writeFileSync(workbook, dir_descargas);
    ipcRenderer.send("cronograma_guardado", ruta);
  } else {
    ipcRenderer.send("cronograma_vacio");
  }
}

function editar_actividad(actividad_editada, indice, actividades) {
  actividades[indice].nombre = actividad_editada.nombre;
  actividades[indice].duracion = actividad_editada.duracion;
  actividades[indice].tipo = actividad_editada.tipo;
  actividades[indice].objetivo = actividad_editada.objetivo;
  actividades[indice].necesidades = actividad_editada.necesidades;
  actividades[indice].unidad = actividad_editada.unidad;
  return actividades;
}

function obtener_indice(nombre, actividades) {
  let count = 0;
  let ret;
  actividades.forEach((actividad) => {
    if (actividad.nombre == nombre) {
      ret = count;
    }
    count++;
  });
  return ret;
}

function add_checkboxes(padre, activos = []) {
  const unidades = ["Clan", "Familia", "Tropa", "Manada"]
  unidades.forEach(unidad => {
    let option = document.createElement("input")
    let label = document.createElement("label")
    label.textContent = unidad
    option.type = "checkbox"
    option.className = "unidades"
    option.value = unidad
    if (activos.includes(unidad)) {
      option.checked = true
    }
    label.appendChild(option)
    padre.appendChild(label)
  });
}
module.exports = {
  add_checkboxes: add_checkboxes,
  obtener_indice: obtener_indice,
  editar_actividad: editar_actividad,
  comprobar_json: comprobar_json,
  write_json: write_json,
  rutas: rutas,
  dir: directory,
  data: datosjson,
  obtener_act: obtener_act,
  formato_string: formato_string,
  crear_excel: xlsx,
};
