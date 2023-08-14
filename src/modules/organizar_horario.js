function comparar_hora(
  new_act_start_h,
  new_act_start_m,
  new_act_end_h,
  new_act_end_m,
  actividades
) {
  let tiempo_valido = true;
  if (new_act_end_h < new_act_start_h) {
    tiempo_valido = false;
  } else if (new_act_end_h == new_act_start_h) {
    if (new_act_end_m <= new_act_start_m) {
      tiempo_valido = false;
    }
  }

  return tiempo_valido;
}

// NOTE: no se deben sobreponer las actividades
function controlar_horario(activities = [], newactivity) {
  let Lnum_actividades = 0;
  //NOTE: separat horas y minutos de inicio y fin
  let LInt_inicio_hora,
    LInt_inicio_min = newactivity.inicio.split(":");
  let LInt_fin_hora,
    LInt_fin_min = newactivity.fin.split(":");
  if (activities != "") {
    //NOTE: por cada actividad guardada se compara su inicio y fin
    activities.forEach((activity) => {
      let inicio_hora,
        inicio_min = activity.inicio.split(":");
      let fin_hora,
        fin_min = activity.fin.split(":");
      //////////////////////////////////////////////////////////////////////////
    });
  } else {
    Lnum_actividades++;
    newactivity.posicion = Lnum_actividades;
  }
}
