import Colaborador from '../models/Colaborador.model.js';
import authMiddleware from '../Middleware/authmiddleware.js';
import Ocorrencia from '../models/Ocorrencia.models.js';
import { Buffer } from 'buffer';

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

export const atualizarQuantidadeOcorrencias = async (req, res) => {
    try {
        console.log('Iniciando atualização de quantidade de ocorrências');

        // Busca todos os colaboradores
        const colaboradores = await Colaborador.find({});
        
        // Para cada colaborador, conta suas ocorrências
        for (const colaborador of colaboradores) {
            // Conta ocorrências vinculadas a este colaborador
            const qtdOcorrencias = await Ocorrencia.countDocuments({
                colaboradorId: colaborador._id
            });

            console.log(`Colaborador ${colaborador.nome}: ${qtdOcorrencias} ocorrências`);

            // Atualiza o colaborador com a quantidade correta
            await Colaborador.findByIdAndUpdate(
                colaborador._id,
                { qtdOcorrencias: qtdOcorrencias }
            );
        }

        res.json({ 
            message: 'Quantidade de ocorrências atualizada com sucesso',
            totalColaboradores: colaboradores.length
        });

    } catch (error) {
        console.error('Erro ao atualizar quantidade de ocorrências:', error);
        res.status(500).json({ 
            message: 'Erro ao atualizar quantidade de ocorrências', 
            error: error.message 
        });
    }
};

const deletarColaborador = async (req, res) => {
    try {
        const colaborador = await Colaborador.findByIdAndDelete(req.params.id);
        
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador não encontrado' });
        }

        res.status(200).json({ message: 'Colaborador deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const atualizarColaborador = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, registro, setor, cargo } = req.body;

        const colaborador = await Colaborador.findById(id);
        
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador não encontrado' });
        }
        colaborador.nome = nome;
        colaborador.email = email;
        colaborador.telefone = telefone;
        colaborador.registro = registro;
        colaborador.setor = setor;
        colaborador.cargo = cargo;

        await colaborador.save();

        res.status(200).json(colaborador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const atualizarFotoColaborador = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhuma foto foi enviada' });
        }

        const colaborador = await Colaborador.findById(id);
        
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador não encontrado' });
        }

        colaborador.foto = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };

        await colaborador.save();
        res.status(200).json({ message: 'Foto atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { CadastrarColaborador, ColaboradoresDoGestor, getColaborador, deletarColaborador, atualizarColaborador, atualizarFotoColaborador };