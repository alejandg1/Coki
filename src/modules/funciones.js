const os = require("os");
const fs = require("fs");

function rutas() {
  // devolver ruta segun el sistema
  const Systempath = os.homedir() + "/Coki";
  //const Systempath = require("os").homedir() + "/Coki";
  return Systempath;
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

function comprobar_json(ruta) {
  ruta += "/actividades.json";
  fs.access(ruta, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("creando archivo..");
      new_list(ruta);
    } else {
      console.log("archivo validado correctamente");
    }
  });
}
function datosjson(ruta) {
  //NOTE: obtener datos del json guardado
  ruta += "/actividades.json";
  try {
    const jsondata = fs.readFileSync(ruta, "utf8");
    // NOTE: comprobar si está vaio el archivo
    if (jsondata != "") {
      // NOTE: convertir datos a obtejo js
      const data = JSON.parse(jsondata);
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(
      "Error al obtener datos del cronograma, contacte al equipo de desarrollo {datosjson} " +
        error
    );
  }
}
/*
 - new_list crea un nuevo json vacio si se quiere ingresar datos desde 0  - delete_list elimina el json anterios al ingresar datos desde 0 o cuando el json anterior lleva mucho tiempo (3 dias aprox)

 */

function write_json(ruta, contenido = "") {
  ruta += "/actividades.json";
  console.log(ruta);
  fs.writeFile(ruta, contenido, (error) => {
    if (error) {
      alert(
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
