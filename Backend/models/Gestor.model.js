import mongoose from 'mongoose';
import Bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const gestoresSchema = new Schema({
    nome: String,
    email: String,
    senha: String,

    foto: {
        data: Buffer,      // Foto armazenada como dados binários
        contentType: String // Tipo de conteúdo da foto (ex: 'image/jpeg')
    },

    setor: String,
    cargo: String  // Cargo do gestor
});

// Middleware pré-save para criptografar a senha antes de salvar no banco de dados
gestoresSchema.pre('save', async function(next){
    if(this.isModified('senha')){
        this.senha = await Bcrypt.hash(this.senha, 10);
    }
    next(); // Chama a próxima função middleware
});

const Gestor = mongoose.model("Gestores", gestoresSchema);

export default Gestor;