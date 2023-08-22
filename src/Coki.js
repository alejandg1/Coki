const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const funciones = require("./modules/funciones");
const { setMenu } = require("./modules/menu.js");
// recargar en cambios
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
  });
}

// generar ventana
let win;
app.on("ready", () => {
  let ruta = funciones.rutas();
  const json_exist = funciones.comprobar_json(ruta);
  if (!json_exist) {
    win = new BrowserWindow({
      width: 900,
      height: 700,
      title: "Coki",
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    win.loadFile("../index.html");
  } else {
    console.log("error interno");
  }
  setMenu();
  //cerrar toda ventana
  win.on("closed", () => {
    app.quit();
  });
});
//NOTE: ipc
ipcMain.on("new_act", (evento, new_act) => {
  console.log(new_act);
});

// si no existen ventanas abiertas crea una
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
// asegurar de cerrar proceso cuando no queden ventanas abiertas
app.on("window-all-closed", () => {
  app.quit();
});
