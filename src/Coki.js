const fs = require("fs");
const child = require("child_process")
const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const funciones = require("./modules/funciones.js");
const { setMenu } = require("./modules/menu.js");
// obtener datos guardados
const mision_tipo = funciones.data("./src/data/mision_tipo.json");
const actividades = funciones.data("./src/data/actividades.json");
let main_window
let paths_array = funciones.rutas();
app.on("ready", () => {
  main_window = new BrowserWindow({
    width: 900,
    height: 700,
    icon: "./images/logo.png",
    title: "Coki",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // crear la carpeta coki
  funciones.dir(paths_array.carpeta_coki);
  const json_actividades_exist = funciones.comprobar_json(
    paths_array.json_actividades,
    actividades
  );
  funciones.comprobar_json(paths_array.cronograma, []);
  funciones.comprobar_json(paths_array.mision_tipo, mision_tipo);
  if (!json_actividades_exist) {
    // generar ventana
    main_window.loadFile("./index.html");
  } else {
    dialog.showErrorBox(
      "Error interno",
      "contactar con el equipo de desarrollo"
    );
  }
  setMenu();
  main_window.on("closed", () => {
    app.quit();
    if (fs.existsSync(paths_array.datos_unidad_nombre)) {
      fs.unlinkSync(paths_array.datos_unidad_nombre);
    }
    if (fs.existsSync(paths_array.actividad_a_editar)) {
      fs.unlinkSync(paths_array.actividad_a_editar);
    }
    process.exit();
  });
});
///////////////////////// manejo de eventos
ipcMain.on("return", () => {
  main_window.loadFile("./src/pages/cronograma.html");
});
ipcMain.on("return_init", () => {
  main_window.loadFile("./index.html");
});
// cronograma
ipcMain.on("acts_list", (data) => {
  if (data != null) {
    main_window.loadFile("./src/pages/act_list.html");
  } else {
    dialog.showErrorBox("Falta información", "debe llenar todos los campos");
  }
});

ipcMain.on("imprimir", (event, dato) => {
  console.log(dato);
});
ipcMain.on("editar", (event, elemento) => {
  funciones.write_json(paths_array.actividad_a_editar, elemento);
  main_window.loadFile("./src/pages/act_edit.html");
});
ipcMain.on("delete", (event, elemento) => {
  funciones.eliminar(paths_array.json_actividades, elemento);
  main_window.loadFile("./src/pages/act_list.html");
});
ipcMain.on("cancel_edit", () => {
  main_window.loadFile("./src/pages/act_list.html");
});
ipcMain.on("datos_incompletos", () => {
  dialog.showErrorBox("error", "no puede dejar datos importantes vacíos");
});
ipcMain.on("nombre_repetido", () => {
  dialog.showErrorBox(
    "error",
    "la actividad ingresada tiene nombre repetido"
  );
});
ipcMain.on("cronograma_vacio", () => {
  dialog.showErrorBox(
    "error",
    "no puede guardar un cronograma vacío, agregue actividades"
  );
});
ipcMain.on("repetida_cronograma", () => {
  dialog.showErrorBox(
    "",
    "la actividad seleccionada ya está en su cronograma"
  );
});
ipcMain.on("editado", () => {
  dialog.showMessageBox({
    type: "info",
    title: "",
    message: "se guardaron los cambios",
    buttons: ["OK"],
  });
  main_window.loadFile("./src/pages/act_list.html");
});
ipcMain.on("actividad_eliminada", () => {
  main_window.reload();
});
ipcMain.on("cronograma_guardado", (event, ruta_descarga) => {
  dialog.showMessageBox({
    type: "info",
    title: "",
    message:
      "El cronograma ha sido guardado",
    buttons: ["OK"],
  });
  child.exec(("open " + ruta_descarga), (error, stdout, stderr) => {
    if (error) {
      console.log(error.message);
      return;
    }
    console.log(stdout);
  })
});
ipcMain.on("nueva_actividad", (event, array_editado) => {
  funciones.write_json(paths_array.json_actividades, array_editado);
  dialog.showMessageBox({
    type: "info",
    title: "",
    message: "actividad creada",
    buttons: ["ok"],
  });
});
ipcMain.on("cancelar_new_act", () => {
  main_window.loadFile("./src/pages/cronograma.html");
});
ipcMain.on("redir_new", () => {
  main_window.loadFile("./src/pages/act_new.html");
});
ipcMain.on("agregar", () => {
  main_window.loadFile("./src/pages/act_list.html");
});
ipcMain.on("agregada_crono", () => {
  dialog.showMessageBox({
    type: "info",
    title: "",
    message: "actividad agregada",
    buttons: ["ok"],
  });
});
// si no existen ventanas abiertas crea una
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
// asegurar de cerrar proceso cuando no queden ventanas abiertas
app.on("window-all-closed", () => {
  app.quit();
});
