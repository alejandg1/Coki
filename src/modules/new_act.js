const { ipcRenderer } = require("electron");

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name_act = document.querySelector("#nombre").value;
  let time_act = document.querySelector("#time").value;
  let desc_act = document.querySelector("#desc").value;

  let act_data = {
    nombre: name_act,
    duracion: time_act,
    desc: desc_act,
  };
  ipcRenderer.send("new_act", act_data);
  //NOTE: comprobar no existencia

  //NOTE: agregar al json
});
