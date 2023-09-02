const fs = require("fs");
const path = require("path");
const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const funciones = require("./modules/funciones.js");
const { setMenu } = require("./modules/menu.js");
// recargar en cambios
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
});

app.on("ready", () => {
  let main_window = new BrowserWindow({
    width: 900,
    height: 700,
    title: "Coki",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  let paths_array = funciones.rutas();
  // crear la carpeta coki
  funciones.dir(paths_array.carpeta_coki);
  const json_actividades_exist =
    funciones.comprobar_json(paths_array.json_actividades) &&
    funciones.comprobar_json(paths_array.mision_tipo);
  //NOTE: si funciona borrar linea  funciones.comprobar_json(paths_array.mision_tipo);
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
  //cerrar toda ventana
  main_window.on("closed", () => {
    app.quit();
    //NOTE: SI FUNCIONA ELIMINA ESTA LINEA   let paths_array = funciones.rutas();
    // eliminar archivos temporales
    if (fs.existsSync(paths_array.datos_unidad_nombre)) {
      fs.unlinkSync(paths_array.datos_unidad_nombre);
    }
    if (fs.existsSync(paths_array.actividad_a_editar)) {
      fs.unlinkSync(paths_array.actividad_a_editar);
    }
  });
  //NOTE: por ahora esto no lo uso
  /* ipcMain.on("new_act", (evento, nueva_actividad) => {
    let datos_new_act = new actividad(nueva_actividad);
  }); */
  // regresar a la pagina principal
  ipcMain.on("return", (evento, data) => {
    main_window.loadFile("./index.html");
  });
  //realizar consulta de las actividades
  ipcMain.on("acts_list", (evento, data) => {
    if (data != null) {
      main_window.loadFile("./src/pages/cronograma.html");
      // editar actividad
    } else {
      dialog.showErrorBox("Falta información", "debe llenar todos los campos");
    }
    ipcMain.on("editar", (evento, id_elemento) => {
      id_elemento = { nombre: id_elemento };
      funciones.write_json(
        paths_array.actividad_a_editar,
        JSON.stringify(id_elemento)
      );
      main_window.loadFile("./src/pages/act_edit.html");
    });
    // cancelar edición
    ipcMain.on("cancel_edit", (evento, data) => {
      main_window.loadFile("./src/pages/act_list.html");
    });
    ipcMain.on("nombre_vacio", () => {
      dialog.showErrorBox("error", "no puede dejar el nombre vacío");
    });
    ipcMain.on("nombre_repetido", () => {
      dialog.showErrorBox(
        "error",
        "la actividad ingresada tiene nombre repetido"
      );
    });
    ipcMain.on("redir_new", () => {
      main_window.loadFile("./src/pages/act_new.html");
    });
    ipcMain.on("agregar", (evento) => {
      main_window.loadFile("./src/pages/act_list.html");
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
});
