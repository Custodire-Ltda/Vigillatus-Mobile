import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cargoSchema = new Schema({
    nome: String,

});

const Cargo = mongoose.model("Cargos", cargoSchema);

export default Cargo;