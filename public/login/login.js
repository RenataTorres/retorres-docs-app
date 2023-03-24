import { emitUserAuthenticate } from "./socket-front-login.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const name = form["input-usuario"].value;
  const password = form["input-senha"].value;

  emitUserAuthenticate({name, password});
});
