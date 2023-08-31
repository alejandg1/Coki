const { ipcRenderer } = require("electron");

const btn_list = document.querySelector("#list_act");
btn_list.addEventListener("click", (event) => {
  event.preventDefault();
  ipcRenderer.send("agregar");
});
