const { Menu, app, BrowserWindow } = require("electron");
const funciones = require("./funciones");

function new_act() {
  let new_Act = new BrowserWindow({
    width: 700,
    height: 550,
    title: "nueva actividad",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  new_Act.loadFile("../src/pages/new_act.html");
  //NOTE: descomentar al parar a prod
  //  new_Act.setMenu(null);
  new_Act.on("closed", () => {
    new_Act == null;
  });
}

function setMenu() {
  let template = [
    {
      label: "Coki",
      submenu: [{ role: "quit" }],
    },
  ];
  if (process.env.NODE_ENV !== "production") {
    template.push(
      {
        label: "DevTools",
        submenu: [
          {
            label: "Show/Hide",
            click(item, focWin) {
              focWin.toggleDevTools();
            },
          },
          { role: "reload" },
        ],
      },
      {
        label: "Nueva actividad",
        click: () => {
          new_act();
        },
      }
    );
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = {
  setMenu,
};
