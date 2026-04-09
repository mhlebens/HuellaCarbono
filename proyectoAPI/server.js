require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./middleware/logger");

const usuarioRoutes = require("./routes/UsuarioRoutes");
const tipoTransporteRoutes = require("./routes/tipoTransporteRoutes");
const alimentoRoutes = require("./routes/alimentoRoutes");
const consumoEnergiaRoutes = require("./routes/ConsumoEnergiaRoutes");
const habitoRoutes = require("./routes/habitoRoutes");
const registroDiarioRoutes = require("./routes/registroDiarioRoutes");
const calculoCO2Routes = require("./routes/calculoCO2Routes");
const retoRoutes = require("./routes/retoRoutes");
const participacionRetoRoutes = require("./routes/participacionRetoRoutes");
const recomendacionRoutes = require("./routes/recomendacionRoutes");
const categoriaRetoRoutes = require("./routes/categoriaRetoRoutes");
const factorPaisRoutes = require("./routes/factorPaisRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("API de Huella de Carbono funcionando");
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/tipos-transporte", tipoTransporteRoutes);
app.use("/api/alimentos", alimentoRoutes);
app.use("/api/consumos-energia", consumoEnergiaRoutes);
app.use("/api/habitos", habitoRoutes);
app.use("/api/registros-diarios", registroDiarioRoutes);
app.use("/api/calculos-co2", calculoCO2Routes);
app.use("/api/retos", retoRoutes);
app.use("/api/participaciones-retos", participacionRetoRoutes);
app.use("/api/recomendaciones", recomendacionRoutes);
app.use("/api/categorias-retos", categoriaRetoRoutes);
app.use("/api/factores-paises", factorPaisRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error de conexión:", err);
  });