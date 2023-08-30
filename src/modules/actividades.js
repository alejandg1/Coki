class actividad {
  constructor(actividad) {
    this.duracion = actividad.duracion;
    this.nombre = actividad.nombre;
  }
  comprobar() {}
}

function add_activity(array, nombre, inicio, fin, desc = "") {
  //NOTE: añadir actividades al json obtenido
  array.push({});
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
  actividad,
};
