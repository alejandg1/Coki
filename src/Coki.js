const { newWindow } = require("./modules/main");
const { app } = require("electron");

require("electron-reload")(__dirname)
app.whenReady().then(newWindow);
