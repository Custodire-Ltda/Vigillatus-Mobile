// models/Prediction.js
import mongoose from 'mongoose';

const Ocorrencia = new mongoose.Schema({
    className: String,
    probability: Number,
    colaboradorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colaboradores'
    },
    gestorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gestores'
    },
    nomeColaborador: String,
    setor: String,
    motivo: String,
    timestamp: { type: Date, default: Date.now },
    imagePath: String,
    status: String
});

export default mongoose.model('Ocorrencia', Ocorrencia);