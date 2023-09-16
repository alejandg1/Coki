
if (filtro_tipo.value == "todos" || filtro_tipo.val) {
  if (actividades_json != undefined && actividades_json != "[]") {
    JSON.parse(actividades_json).forEach((actividad) => {
      let linea =
        "<tr> <td>" +
        actividad.duracion +
        "</td><td>" +
        funciones.formato_string(actividad.nombre) +
        "</td><td>" +
        actividad.mision +
        "</td><td>" +
        actividad.tipo +
        "</td><td>" +
        actividad.objetivo +
        "</td><td>" +
        actividad.necesidades +
        "</td><td><button class='agregar' id=" +
        funciones.formato_string(actividad.nombre, "reverse") +
        " >añadir</button></td><td><button class='edit' id=" +
        funciones.formato_string(actividad.nombre, "reverse") +
        ">Editar actividad</button></td></tr>";
      Table.insertAdjacentHTML("beforeend", linea);
    });
  } else {
    Table.insertAdjacentHTML("beforeend", "No existen actividades guardadas");
  }
} else {
