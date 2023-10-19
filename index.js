const PORT = process.env.PORT ?? 3000;
const express = require("express");
const hbs = require("express-handlebars");
const path = require("node:path");
const users = require("./data");

const app = express();
//seteamos la carpeta de recursos estáticos
app.use(express.static("public"));

//Express-Handlebars config
app.engine(".hbs", hbs.engine({ extname: "hbs" })); // modificar extensión
app.set("view engine", "hbs");
app.set("views", "./views");

//--> starting point: convert relative to absolute path
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(usr => usr.id === Number(id));
  user
    ? res.status(200).json(user)
    : res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
});

//catch-all route
app.get("*", (req, res, next) => {
  const error = new Error("Ruta no implementada");
  error.status = 404;

  next(error);
});

//error handler
app.use((err, req, res, next) => {
  const message = err.message || "Error interno del servidor 😣";
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.render("error", { message, statusCode });
});

app.listen(PORT, err => {
  err
    ? console.log(`Error in server setup ${err.code}`)
    : console.log(`Server running on http://localhost:${PORT}`);
});
