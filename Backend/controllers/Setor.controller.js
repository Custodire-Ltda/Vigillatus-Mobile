import Setor from "../models/Setor.model.js";

export async function criarSetores() {

    const setorCount = await Setor.countDocuments();
    if (setorCount === 0) {
        const setores = [
            { nome: "Caldeira" },
            { nome: "Elétrica" },
            { nome: "Mecânica" }
        ]

        await Setor.insertMany(setores)
        console.log("Setores padrão criados com sucesso!");
    } else {
        console.log("A coleção de setores já possui dados.");
    }
}

export async function getSetores(req, res) {
    try {
        const setores = await Setor.find({})

        res.status(200).json({ setores })
    }
     catch(error) {
        res.status(500).json({ message: error.message})
     }
}