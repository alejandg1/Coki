class actividad {
  constructor(nombre, desc) {
    this.nombre = nombre;
    this.desc = desc;
  }
  comprobar(array) {}
}

function add_activity(array, nombre, inicio, fin, desc = "") {
  //NOTE: añadir actividades al json obtenido
  array.push({
    nombre: nombre,
    inicio_h: inicio.split(":")[0],
    inicio_m: inicio.split(":")[1],
    fin_h: fin.split(":")[0],
    fin_m: fin.split(":")[1],
    descripción: desc,
  });
}
function delete_activity(array, nombre) {
  //NOTE: crear nuevo array sin el elemento a eliminar
  let LArray_newdata = [];
  if (array) {
    array.forEach((element) => {
      if (element.nombre != nombre) {
        LArray_newdata.push(element);
      }
    });
  }
  return LArray_newdata;
}

module.exports = {
  new_actividad: add_activity,
  del_actividad: delete_activity,
};
