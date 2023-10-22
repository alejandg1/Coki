const { Menu } = require("electron");
function setMenu() {
  let template = [
    {
      label: "Coki",
      submenu: [{ role: "quit" }],
    },
  ];
  // //TODO: quitar DevTools al pasar a prod
  // if (process.env.NODE_ENV !== "production") {
  //   template.push({
  //     label: "DevTools",
  //     submenu: [
  //       {
  //         label: "Show/Hide",
  //         click(item, focWin) {
  //           focWin.toggleDevTools();
  //         },
  //       },
  //       { role: "reload" },
  //     ],
  //   });
 // }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = {
  setMenu,
};
