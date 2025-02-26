import Cargo from "../models/Cargo.model.js"

export async function criarCargos() {
    const cargoCount = await Cargo.countDocuments();
    if (cargoCount === 0) {
        const cargos = [
            { nome: "Gestor" },
            { nome: "Mecânico" },
            { nome: "Soldador" },
        ]
        await Cargo.insertMany(cargos)
        console.log("Cargos padrão criados com sucesso!");
    } else {
        console.log("A coleção de cargos já possui dados.");
    }
}

export async function getCargos(req, res) {
    try {
        const cargos = await Cargo.find({})
    
        res.status(200).json({ cargos })
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}