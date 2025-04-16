import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import Ocorrencia from '../models/Ocorrencia.models.js';
import Gestor from '../models/Gestor.model.js';
import moment from 'moment-timezone';
import Colaborador from '../models/Colaborador.model.js';
import Setor from '../models/Setor.model.js';
import mongoose from 'mongoose';
import axios from 'axios'

// Função auxiliar para criar o storage
const createStorage = () => {
    return multer.diskStorage({
        destination: async (req, file, cb) => {
            try {
                const gestorId = req.userId || req.body.gestorId;
                console.log('ID do Gestor:', gestorId);

                const gestor = await Gestor.findById(gestorId);
                if (!gestor) {
                    console.error('Gestor não encontrado');
                    return cb(new Error('Gestor não encontrado'));
                }

                console.log('Dados do Gestor:', gestor);

                // Cria o caminho completo da pasta
                const folderPath = path.join('uploads', `${gestorId}_${gestor.nome}`, 'temp');
                console.log('Caminho da pasta:', folderPath);

                // Garante que a pasta existe usando fs.mkdir da versão promises
                await fs.mkdir(folderPath, { recursive: true });

                cb(null, folderPath);
            } catch (error) {
                console.error('Erro ao configurar destino:', error);
                cb(error);
            }
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    });
};

//Função para inserção e captura de imagem
export const uploadImage = async (req, res) => {

    // Ocorrencia.controller.js
    const gestorId = req.userId || req.body.gestorId; // Prioriza o token, mas aceita do body

    try {
        const upload = multer({ storage: createStorage() });

        await new Promise((resolve, reject) => {
            upload.single('image')(req, res, (err) => {
                if (err) {
                    console.error('Erro no upload:', err);
                    reject(err);
                    return;
                }
                resolve();
            });
        });

        if (!req.file) {
            throw new Error('Nenhum arquivo foi enviado');
        }

        // Ajustando o caminho da imagem para ser relativo ao diretório uploads
        const imagePath = req.file.path;
        const imageUrl = imagePath.replace(/\\/g, '/'); // Normaliza as barras

        const ocorrencia = new Ocorrencia({
            className: req.body.className,
            probability: req.body.probability,
            nomeColaborador: req.body.nomeColaborador,
            gestorId: gestorId,
            setor: req.body.setor,
            motivo: req.body.motivo,
            timestamp: new Date(),
            imagePath: imageUrl,
            status: 'Pendente'
        });

        await ocorrencia.save();
        res.status(200).json({
            message: 'Imagem e dados salvos com sucesso!',
            ocorrencia
        });

    } catch (error) {
        console.error('Erro no processamento:', error);
        res.status(500).json({
            error: 'Erro ao processar upload',
            details: error.message
        });
    }
};

//Função para buscar as ocorrências
export const listOcorrencias = async (req, res) => {
    try {
        console.log('Buscando ocorrências sem colaborador');

        // Busca ocorrências que NÃO têm colaboradorId preenchido
        const ocorrencias = await Ocorrencia.find({
            $or: [
                { colaboradorId: { $exists: false } },
                { colaboradorId: null }
            ]
        }).sort({ timestamp: -1 });

        console.log(`Encontradas ${ocorrencias.length} ocorrências pendentes`);
        res.json(ocorrencias);
    } catch (error) {
        console.error('Erro ao listar ocorrências:', error);
        res.status(500).json({
            message: 'Erro ao listar ocorrências',
            error: error.message
        });
    }
};

export const getOcorrenciaPorGestor = async (req, res) => {
    try {
        const gestorId = req.userId

        if (!gestorId) {
            return res.status(400).json({ message: "É necessário fornecer um gestorId." });
        }

        // Busca ocorrências relacionadas ao gestorId
        const ocorrencias = await Ocorrencia.find({ gestorId }).sort({ timestamp: -1 });

        if (!ocorrencias || ocorrencias.length === 0) {
            return res.status(404).json({ message: "Nenhuma ocorrência encontrada para este gestor." });
        }

        res.json(ocorrencias);
    } catch (error) {
        console.error("Erro ao buscar ocorrências por gestor:", error);
        res.status(500).json({
            message: "Erro ao buscar ocorrências por gestor",
            error: error.message
        });
    }
};

export const getOcorrencia = async (req, res) => {
    try {
        const ocorrencia = await Ocorrencia.findById(req.params.id);
        if (!ocorrencia) {
            return res.status(404).json({ message: 'Ocorrência não encontrada' });
        }
        res.json(ocorrencia);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ocorrência', error: error.message });
    }
};


/* Função para atualizar ocorrências */
export const updateOcorrencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { nomeColaborador, colaboradorId, status } = req.body;

        // Busca a ocorrência atual
        const ocorrenciaAtual = await Ocorrencia.findById(id);
        if (!ocorrenciaAtual) {
            return res.status(404).json({ message: 'Ocorrência não encontrada' });
        }

        // Se está vinculando um colaborador
        if (colaboradorId) {
            // Busca dados do colaborador e gestor
            const colaborador = await Colaborador.findById(colaboradorId);
            const gestor = await Gestor.findById(colaborador.gestorId);

            if (!colaborador || !gestor) {
                throw new Error('Colaborador ou Gestor não encontrado');
            }

            // Define os caminhos das pastas
            const gestorPath = path.join('uploads', `${gestor._id}_${gestor.nome}`);
            const colaboradorPath = path.join(gestorPath, `${colaborador._id}_${colaborador.nome}`);

            // Cria a pasta do colaborador se não existir
            await fs.mkdir(colaboradorPath, { recursive: true });

            // Se a ocorrência tem uma imagem
            if (ocorrenciaAtual.imagePath) {
                const oldPath = path.join(process.cwd(), ocorrenciaAtual.imagePath);
                const fileName = path.basename(ocorrenciaAtual.imagePath);
                const newPath = path.join(colaboradorPath, fileName);

                try {
                    // Move a imagem da pasta temp para a pasta do colaborador
                    await fs.rename(oldPath, newPath);
                    console.log('Imagem movida com sucesso para:', newPath);

                    // Atualiza o caminho da imagem na ocorrência
                    ocorrenciaAtual.imagePath = newPath.replace(/\\/g, '/').replace(process.cwd(), '');
                } catch (error) {
                    console.error('Erro ao mover imagem:', error);
                    throw new Error('Erro ao mover imagem para pasta do colaborador');
                }
            }

            // Se tinha um colaborador anterior, decrementa a contagem
            if (ocorrenciaAtual.colaboradorId) {
                await Colaborador.findByIdAndUpdate(
                    ocorrenciaAtual.colaboradorId,
                    { $inc: { qtdOcorrencias: -1 } }
                );
            }

            // Incrementa a contagem do novo colaborador
            await Colaborador.findByIdAndUpdate(
                colaboradorId,
                { $inc: { qtdOcorrencias: 1 } }
            );
        }

        // Atualiza a ocorrência com os novos dados
        const ocorrenciaAtualizada = await Ocorrencia.findByIdAndUpdate(
            id,
            {
                nomeColaborador,
                colaboradorId,
                status,
                imagePath: ocorrenciaAtual.imagePath // Usa o novo caminho da imagem
            },
            { new: true }
        );

        res.json(ocorrenciaAtualizada);

    } catch (error) {
        console.error('Erro ao atualizar ocorrência:', error);
        res.status(500).json({
            message: 'Erro ao atualizar ocorrência',
            error: error.message
        });
    }
};

/* Listar o histórico de oncorrências */
export const listOcorrenciasHistorico = async (req, res) => {
    try {
        console.log('Iniciando busca de histórico de ocorrências');

        // Busca ocorrências que têm colaboradorId preenchido
        const ocorrencias = await Ocorrencia.find({
            colaboradorId: { $exists: true, $ne: null }
        })
            .populate('colaboradorId', 'nome foto cargo')
            .sort({ timestamp: -1 });

        console.log(`Encontradas ${ocorrencias.length} ocorrências no histórico`);

        res.json(ocorrencias);
    } catch (error) {
        console.error('Erro ao buscar histórico de ocorrências:', error);
        res.status(500).json({
            message: 'Erro ao buscar histórico de ocorrências',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export const getOcorrenciasPorColaborador = async (req, res) => {
    try {
        const { colaboradorId } = req.params;

        const ocorrencias = await Ocorrencia.find({
            colaboradorId: colaboradorId
        }).sort({ timestamp: -1 });

        res.json(ocorrencias);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar ocorrências do colaborador',
            error: error.message
        });
    }
};

export const deleteOcorrencia = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca a ocorrência para obter o caminho da imagem
        const ocorrencia = await Ocorrencia.findById(id);

        if (!ocorrencia) {
            return res.status(404).json({ message: 'Ocorrência não encontrada' });
        }

        // Se houver um colaborador vinculado, decrementa a contagem
        if (ocorrencia.colaboradorId) {
            await Colaborador.findByIdAndUpdate(
                ocorrencia.colaboradorId,
                { $inc: { qtdOcorrencias: -1 } }
            );
        }

        // Deleta a imagem se existir
        if (ocorrencia.imagePath) {
            const fullPath = path.join(process.cwd(), ocorrencia.imagePath);
            try {
                await fs.unlink(fullPath);
                console.log('Imagem deletada com sucesso:', fullPath);
            } catch (error) {
                console.error('Erro ao deletar imagem:', error);
                // Continua mesmo se houver erro ao deletar a imagem
            }
        }

        // Deleta a ocorrência
        await Ocorrencia.findByIdAndDelete(id);

        res.json({
            message: 'Ocorrência deletada com sucesso',
            deletedId: id
        });
    } catch (error) {
        console.error('Erro ao deletar ocorrência:', error);
        res.status(500).json({
            message: 'Erro ao deletar ocorrência',
            error: error.message
        });
    }
};


/* Função para listar as ocorrências por setor */
export const countOcorrenciasPorSetorDoGestor = async (req, res) => {
    try {
        const gestorId = req.userId;

        if (!gestorId) {
            return res.status(400).json({ message: "É necessário fornecer um gestorId." });
        }

        // Obtém todos os setores disponíveis
        const setores = await Setor.find({}, "nome"); // Busca todos os setores com o campo "nome"

        // Obtém todas as ocorrências agrupadas por setor para o gestor
        const resultados = await Ocorrencia.aggregate([
            { $match: { gestorId: new mongoose.Types.ObjectId(gestorId) } },
            { $group: { _id: "$setor", Ocorrências: { $sum: 1 } } },
        ]);

        // Combina os setores com os resultados das ocorrências
        const OcorrenciasPorSetor = setores.map(setor => {
            const ocorrencia = resultados.find(r => r._id === setor.nome);
            return { setor: setor.nome, Ocorrências: ocorrencia ? ocorrencia.Ocorrências : 0 };
        });

        const resposta = await axios.post("http://127.0.0.1:3000/GraficoOcorrenciasPorSetor", OcorrenciasPorSetor)

        res.status(200).json(resposta.data);
    } catch (error) {
        console.error("Erro ao contar ocorrências por setor para o gestor:", error);
        res.status(500).json({
            message: "Erro ao contar ocorrências por setor para o gestor",
            error: error.message,
        });
    }
};

/* Função para as última ocorrências */
export const contarOcorrenciasUltimaSemana = async (req, res) => {
    try {
        const { id } = req.params;
        const gestorId = id || req.userId;

        if (!gestorId) {
            console.error("Gestor ID ausente.");
            return res.status(400).json({ message: "É necessário fornecer um gestorId." });
        }

        console.log("Gestor ID recebido:", gestorId);

        const colaboradores = await Colaborador.find({ gestorId });
        if (!colaboradores || colaboradores.length === 0) {
            return res.status(404).json({ message: "Nenhum colaborador encontrado." });
        }

        const colaboradorIds = colaboradores.map(colaborador => colaborador._id);

        const inicioDoDia = moment().startOf("day").toDate();
        const fimDoDia = moment().endOf("day").toDate();

        const ocorrencias = await Ocorrencia.find({
            gestorId,
            timestamp: { $gte: inicioDoDia, $lte: fimDoDia }
        })
            .sort({ timestamp: -1 });

        if (!ocorrencias || ocorrencias.length === 0) {
            return res.status(200).json({ message: "Nenhuma ocorrência registrada hoje." });
        }

        res.status(200).json(ocorrencias);
    } catch (error) {
        console.error("Erro ao buscar ocorrências do dia:", error);
        res.status(500).json({
            message: "Erro ao buscar ocorrências do dia",
            error: error.message
        });
    }
};

export const topColaboradoresComOcorrencias = async (req, res) => {
    try {
        const gestorId = req.userId;

        if (!gestorId) {
            return res.status(400).json({ message: "É necessário fornecer um gestorId." });
        }

        // Agregação para buscar colaboradores com mais ocorrências
        const resultados = await Ocorrencia.aggregate([
            { $match: { gestorId: new mongoose.Types.ObjectId(gestorId) } },
            { $group: { _id: "$nomeColaborador", quantidade: { $sum: 1 } } },
            { $sort: { quantidade: -1 } },
            { $limit: 5 }
        ]);

        // Verifica se existem dados
        if (!resultados || resultados.length === 0) {
            return res.status(404).json({ message: "Nenhuma ocorrência encontrada." });
        }

        const resposta = await axios.post("http://127.0.0.1:3000/GraficoOcorrenciasPorColaborador", resultados)

        res.status(200).json(resposta.data);
    } catch (error) {
        console.error("Erro ao buscar top colaboradores:", error);
        res.status(500).json({
            message: "Erro ao buscar top colaboradores.",
            error: error.message
        });
    }
};
