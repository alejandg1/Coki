# Coki

#k resumen requerimientos establecidos por Milca

- Al inicial la aplicación se debe contar con la opción de crear cronograma y
  registrar actividades

  > - el usuario solo puede añadir actividades desde "registro de actividades"

- posibilidad de ingresar nuevas actividades (reduntante)

  > - el usuario puede editar, añadir, elimiar actividades del txt
  > - las actividades se registran por: duración - tipo - objetivo - materiales -
  >   encargado
  > - guardar datos en txt (quiza mejor en json)

- crear cronograma a partir de información ya guardada

  > - crear carpeta para guardar archivos
  > - si la carpeta existe seguir con la creación del excel
  > - preguntar al usuario por nombre para el excel (quiza mejor hacer un
  >   estandar para los nombres)
  > - si el excel existe pedir otro nombre (el estandar solucionaría eso)
  > - importantes para el cronograma: hora, tipo de actividad
  > - al crear cronograma crear excel

  ##############################################################################################

## index.js

al ejecutar "submit" del formulario se obtienen los valores del nombre
y unidad ingresadas por el usuario, con estos datos se escribe un archivo json
que será borrado al cerrar la aplicación, genera el evento (acts_list)

- acts_list (evento)

al ejecutar este evento se carga en la ventana la pagina "cronograma.html"
esta pagina muestra las actividades que se han añadido al cronograma que se
está creando, si no se añade aún ninguna entonces está en blanco

## crono.js

al cargar la pagina se agregan a la tabla de esta pagina con las actividades
que se hayan agregado al cronograma, se ejecuta el evento (agregar)

- agregar (evento)

al ejecutarse se carga en la ventana la pagina "acts_list.html"
en esta pagina se muestran todas las actividades disponibles, según el tipo
o mision que se ingrese en seleccione

### acts_list.js

al cargar la pagina se agregan las actividades existentes a la tabla de la
pagina, junto con 2 botones, uno para agregar dicha actividad al cronograma
y otro para editar dicha actividad con el evento (editar), permite regresar a la pagina anterior por
medio der boton con id "return" que ejecuta el evento (return), y agregar nuevas actividades con el boton
de id "new_act" que ejecutra el evento (redir_new)
con el boton de id "agregar" se guarda la actividad escogida en el cronograma
que se está creando

- editar (evento)
  redirige la ventana a la pagina "act_edit.html"

- return (evento)
  regresa a la pagina principal

- redir_new(evento)
  redirige la ventana a el documento html con el cual se crea una nueva actividad

### act_edit.js

obtienen la información guardad de la actividad que se quiere editar y todos los tipos y misiones disponibles, mostrandolos en los diferentes inputs de la pagina
con el botond e cancelar se ejecuta el evento (cancel_edit),con el boton aceptar
se guardan los cambios realizados a la actividad

### act_new.js

al ocurrir el evento submit del formulario obtiene los datos ingresados por el usuario para la nueva actividad, evalúa que el nombre igresado no se repita en otra actividad existente, si no existe entonces agrega la nueva actividad a el diccionario ya existente para guardarlo en el archivo

## menu.js
