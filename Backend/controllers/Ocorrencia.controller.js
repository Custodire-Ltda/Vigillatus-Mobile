import Ocorrencia from '../models/Ocorrencia.models.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registrarOcorrencia = async (req, res) => {
    try {
        const { className, probability, nomeColaborador, setor, motivo, gestorId } = req.body;
        const imageFile = req.file;

        // Criar diretório de upload se não existir
        const uploadDir = path.join(__dirname, '..', 'uploads', gestorId, 'pendente');
        fs.mkdirSync(uploadDir, { recursive: true });

        // Gerar nome único para o arquivo
        const fileName = `${Date.now()}-${imageFile.originalname}`;
        const filePath = path.join(uploadDir, fileName);

        // Salvar a imagem
        fs.writeFileSync(filePath, imageFile.buffer);

        // Criar registro no banco
        const ocorrencia = await Ocorrencia.create({
            className,
            probability,
            nomeColaborador,
            setor,
            motivo,
            imagePath: filePath,
            status: 'pendente'
        });

        res.status(201).json({
            message: 'Ocorrência registrada com sucesso',
            ocorrencia
        });

    } catch (error) {
        console.error('Erro ao registrar ocorrência:', error);
        res.status(500).json({ message: error.message });
    }
};

export { registrarOcorrencia };