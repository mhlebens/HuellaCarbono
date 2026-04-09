require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const usuarioRoutes = require("./routes/UsuarioRoutes");
const logger = require("./middleware/logger");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API de Huella de Carbono funcionando");
});

// Rutas
app.use("/api/usuarios", usuarioRoutes);

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log("Error MongoDB:", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});