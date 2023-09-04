const os = require("os");
const fs = require("fs");
const path = require("path");
const { systemPreferences } = require("electron");

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
  //NOTE: crear el directorio de la aplicación
  const LBool_extdir = fs.existsSync(dir);
  if (!LBool_extdir) {
    console.log("ruta no existe");
    fs.mkdir(dir, { recursive: true }, (error) => {
      if (error) {
        alert(
          "{directory} error creando el mensaje consulte con el equipo de desarrollo..",
          error
        );
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
      write_json(ruta, JSON.stringify(contenido));
    } else {
      console.log("archivo validado correctamente");
    }
  });
}
function datosjson(ruta, nombre = "") {
  //NOTE: obtener datos del json guardado
  if (nombre != "") {
    ruta += "/" + nombre + ".json";
  }
  try {
    const jsondata = fs.readFileSync(ruta, "utf8");
    // NOTE: comprobar si está vaio el archivo
    if (jsondata != "") {
      // NOTE: convertir datos a obtejo js
      const data = JSON.parse(jsondata);
      return data;
    }
  } catch (error) {
    console.log(
      "Error al obtener datos del cronograma, contacte al equipo de desarrollo {datosjson} " +
        error
    );
    return false;
  }
}
function write_json(ruta, contenido = {}) {
  fs.writeFile(ruta, JSON.stringify(contenido), (error) => {
    if (error) {
      console.log(
        "Se produjo un problema al escribir en el archivo de actividades {write_json}" +
          error
      );
    }
  });
}

function obtener_act(id) {
  let path = rutas();
  let actividades = datosjson(path.json_actividades);
  let encontrado;
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
function eliminar_actividad() {
  fs.writeFile(ruta, JSON.stringify(contenido), (error) => {
    if (error) {
      console.log(
        "Se produjo un problema al escribir en el archivo de actividades {write_json}" +
          error
      );
    }
  });
}
module.exports = {
  comprobar_json: comprobar_json,
  write_json: write_json,
  rutas: rutas,
  dir: directory,
  data: datosjson,
  obtener_act: obtener_act,
  formato_string: formato_string,
};
