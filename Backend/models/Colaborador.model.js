import mongoose from 'mongoose';
import Bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const colaboradoresSchema = new Schema({
    nome: String,
    email: String,

    foto: {
        data: Buffer,      // Foto armazenada como dados binários
        contentType: String // Tipo de conteúdo da foto (ex: 'image/jpeg')
    },

    telefone: String,
    registro: String,

    setor: String,  
    cargo: String,

    gestorId: {
        type: Schema.Types.ObjectId,
        ref: "Gestores", // Nome do modelo do gestor
        required: true
    },

    qtdOcorrencias:Number,
});

const Colaborador = mongoose.model("Colaboradores", colaboradoresSchema);

export default Colaborador;