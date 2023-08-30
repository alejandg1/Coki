const os = require("os");
const fs = require("fs");
const path = require("path");

function rutas() {
  // devolver ruta segun el sistema
  const Systempath = os.homedir() + "/Coki";
  //const Systempath = require("os").homedir() + "/Coki";
  let directorios = {
    carpeta: Systempath,
    actividades: path.join(Systempath, "actividades.json"),
    data_act: path.join(Systempath, "datos_actividades.json"),
    datos_temporales: path.join(Systempath, "datos_consulta.json"),
    act_edit: path.join(Systempath, "datos_edit.json"),
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

function comprobar_json(ruta, nombre = "", contenido = "") {
  if (nombre != "") {
    ruta += "/" + nombre + ".json";
  }
  fs.access(ruta, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("creando archivo..");
      write_json(ruta, contenido);
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
function write_json(ruta, contenido = "") {
  console.log(ruta);
  fs.writeFile(ruta, contenido, (error) => {
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
};
