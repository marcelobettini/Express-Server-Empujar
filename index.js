const PORT = process.env.PORT ?? 3000;
const express = require("express");
const app = express();

//--> starting point: convert relative yo absolute path
app.get("/", (req, res) => {
  res.sendFile("G:/UTN-Empujar/server-express/public/index.html");
});
app.get("/json", (req, res) => {
  res.json({ message: "esto es un json" });
});
app.get("/html", (req, res) => {
  res.send(`
  <h1>Soy HTML</h1>
  <p>Ah... no me había dado cuenta 😣. Mirá vos</p>
  `);
});
//catch-all route
app.get("*", (req, res) => {
  res.json({
    "te digo": "Mo me queméees",
    "type error": "Not Found",
    "status code": 404,
  });
});

app.listen(PORT, err => {
  err
    ? console.log(`Error in server setup ${err.code}`)
    : console.log(`Server running on http://localhost:${PORT}`);
});
