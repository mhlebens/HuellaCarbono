const mongoose = require("mongoose");

const transporteSchema = new mongoose.Schema(
  {
    tipoTransporteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TipoTransporte"
    },
    distanciaKm: {
      type: Number,
      min: 0
    },
    emisionesCO2: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  { _id: false }
);

const alimentoRegistroSchema = new mongoose.Schema(
  {
    alimentoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alimento"
    },
    cantidadKg: {
      type: Number,
      min: 0
    },
    emisionesCO2: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  { _id: false }
);

const energiaRegistroSchema = new mongoose.Schema(
  {
    consumoEnergiaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConsumoEnergia"
    },
    cantidadConsumida: {
      type: Number,
      min: 0
    },
    emisionesCO2: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  { _id: false }
);

const registroDiarioSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    fecha: {
      type: Date,
      required: true
    },
    transporte: [transporteSchema],
    alimentos: [alimentoRegistroSchema],
    energia: [energiaRegistroSchema],
    observaciones: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RegistroDiario", registroDiarioSchema);