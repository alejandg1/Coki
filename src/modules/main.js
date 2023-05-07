const { BrowserWindow } = require("electron");

let window;

function newWindow() {
  window = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.loadFile("src/pages/index.html");
}
module.exports = {
  newWindow,
};
