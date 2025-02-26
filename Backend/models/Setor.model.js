import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const setorSchema = new Schema({
    nome: String,

});

const Setor = mongoose.model("Setores", setorSchema);

export default Setor;