const path = require("path");
const os = require("os");
const fs = require("fs");
/*
 - new_list crea un nuevo json vacio si se quiere ingresar datos desde 0  - delete_list elimina el json anterios al ingresar datos desde 0 o cuando el json anterior lleva mucho tiempo (3 dias aprox)

 */
const actividades = "./actividades.json";
const existpath = fs.existsSync(path.dirname(actividades));

function create_xlsx(json) {}
function add_activity(nombre, inicio, fin, desc = "") {}
function delete_activity(nombre) {}
function new_list() {
  if (existpath) {
  }
  fs.write("");
}
function delete_list(nombre) {}

module.exports = {
  excel: create_xlsx,
  add_act: add_activity,
  del_act: delete_activity,
  new_l: new_list,
  del_l: delete_list,
};
