require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./middleware/logger");

const app = express();
app.use(logger);
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo DB Conectado"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

//Routes CRUD
app.use("/api/cursos", require("./routes/cursoRoutes"));

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
