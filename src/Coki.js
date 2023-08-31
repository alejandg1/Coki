const fs = require("fs");
const path = require("path");
const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const funciones = require("./modules/funciones.js");
const { setMenu } = require("./modules/menu.js");
const { actividad } = require("./modules/actividades");
// recargar en cambios
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
  });
}

app.on("ready", () => {
  // instancia de ventana
  let win = new BrowserWindow({
    width: 900,
    height: 700,
    title: "Coki",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  let ruta = funciones.rutas();
  const json_exist = funciones.comprobar_json(ruta.actividades);
  funciones.comprobar_json(ruta.data_act);
  if (!json_exist) {
    // generar ventana
    win.loadFile("../index.html");
  } else {
    dialog.showErrorBox(
      "Error interno",
      "contactar con el equipo de desarrollo"
    );
  }
  setMenu();
  //cerrar toda ventana
  win.on("closed", () => {
    app.quit();
    let directorios = funciones.rutas();
    // elimiar archivos temporales
    if (fs.existsSync(directorios.datos_temporales)) {
      fs.unlinkSync(directorios.datos_temporales);
    }
    if (fs.existsSync(directorios.act_edit)) {
      fs.unlinkSync(directorios.act_edit);
    }
  });
  // actividad nueva
  ipcMain.on("new_act", (evento, new_act) => {
    let act = new actividad(new_act);
  });
  // regresar a la pagina principal
  ipcMain.on("return", (evento, data) => {
    win.loadFile("../index.html");
  });
  //realizar consulta de las actividades
  ipcMain.on("acts_list", (evento, data) => {
    if (data != null) {
      win.loadFile("./pages/cronograma.html");
      // editar actividad
    } else {
      dialog.showErrorBox("Falta información", "debe llenar todos los campos");
      console.log("datos de consulta nulos coki.js");
    }
    ipcMain.on("editar", (evento, id_elemento) => {
      id_elemento = { nombre: id_elemento };
      funciones.write_json(ruta.act_edit, JSON.stringify(id_elemento));
      win.loadFile("./pages/act_edit.html");
    });
    // cancelar edición
    ipcMain.on("cancel_edit", (evento, data) => {
      win.loadFile("./pages/act_list.html");
    });
    ipcMain.on("redir_new", () => {
      win.loadFile("./pages/act_new.html");
    });
    ipcMain.on("consulta", (evento) => {
      win.loadFile("./pages/act_list.html");
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
