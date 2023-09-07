function actividad_existe(nombre, actividades) {
  let existe = false;
  actividades.forEach((actividad) => {
    if (nombre == actividad.nombre) {
      existe = true;
    }
  });
  return existe;
}
function datos_incompletos(array_act) {
  let dato_vacio = false;
  array_act.forEach((dato) => {
    if (dato == "") {
      dato_vacio = true;
    }
  });
  return dato_vacio;
}
function filtrar_acts() {}

module.exports = {
  actividad_existe: actividad_existe,
  datos_incompletos: datos_incompletos,
};
