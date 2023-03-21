import { emitUserRegistration } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form["input-usuario"].value;
  const password = form["input-senha"].value;

  emitUserRegistration({name, password});
});
