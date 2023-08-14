const funciones = require("./modules/funciones");
const actividad = require("./modules/actividades.js");
const { app, BrowserWindow } = require("electron");
let win;
const newWindow = () => {
  // configurar la ventana
  win = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("../index.html");
};

// recargar en cambios
require("electron-reload")(__dirname);

// generar ventana
app.whenReady().then(() => {
  newWindow();
  // si no existen ventanas abiertas crea una
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// asegurar de cerrar proceso cuando no queden ventanas abiertas
app.on("window-all-closed", () => {
  app.quit();
});
