import Colaborador from '../models/Colaborador.model.js';
import authMiddleware from '../Middleware/authmiddleware.js';

const CadastrarColaborador = async (req, res) => {
    try {
        const { nome, email, telefone, setor, cargo, registro } = req.body;

        let novoColaborador = {
            nome,
            email,
            telefone,
            registro,
            setor,
            cargo,
            gestorId: req.userId,
            qtdOcorrencias: 0
        };

        if (req.file) {
            novoColaborador.foto = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const docColaborador = await Colaborador.create(novoColaborador);

        res.status(201).json(docColaborador);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getColaborador = async (req, res) => {
    try {
        const colaborador = await Colaborador.findById(req.params.id);

        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador não encontrado' });
        }

        res.json(colaborador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const ColaboradoresDoGestor = async (req, res) => {
    try {
        const colaboradores = await Colaborador.find({ gestorId: req.userId });

        res.status(200).json(colaboradores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { CadastrarColaborador, ColaboradoresDoGestor, getColaborador };
