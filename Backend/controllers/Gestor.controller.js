import Gestor from '../models/Gestor.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleware from '../Middleware/authmiddleware.js';


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Cadastrar = async (req, res) => {
    try {
        const { nome, email, senha, setor, cargo } = req.body;

        let novoGestor = { nome, email, senha, setor, cargo };
        if (req.file) {
            novoGestor.foto = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const docGestor = await Gestor.create(novoGestor);

        res.status(201).json(docGestor);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const gestor = await Gestor.findOne({ email });

        if (!gestor) {
            return res.status(400).json({ message: 'Email não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, gestor.senha);

        if (!senhaValida) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gera um token JWT com as informações do gestor e define a expiração
        const token = jwt.sign(
            { id: gestor._id, email: gestor.email },
            'Secret', // Substituir 'Secret' por uma chave secreta mais segura em produção
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        // Cria um novo objeto gestor sem a propriedade 'senha'
        const { senha: _, ...gestorTrimmed } = gestor.toObject();

        // Modificar a criação do diretório
        const folderName = `${gestor._id}_${gestor.nome}/temp`;
        const gestorPath = path.join(__dirname, '..', 'uploads', folderName);

        // Criar diretório de forma recursiva
        try {
            fs.mkdirSync(gestorPath, { recursive: true });
            console.log(`Pasta criada: ${gestorPath}`);
        } catch (error) {
            console.error(`Erro ao criar pasta: ${error.message}`);
            // Continuar execução mesmo se houver erro na criação da pasta
        }

        res.status(200).json({ message: 'Login realizado com sucesso', token, gestor: gestorTrimmed });



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const GestorDados = async (req, res) => {
    try {
        const gestor = await Gestor.findById(req.userId).select('-senha');

        if (!gestor) {
            return res.status(404).json({ message: 'Gestor não encontrado' });
        }

        res.json(gestor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const AtualizarGestor = async (req, res) => {
    try {
        const { nome, email, setor, cargo } = req.body;
        const gestorId = req.params.id;
        
        let dadosAtualizados = { nome, email, setor, cargo };

        // Se houver upload de nova foto
        if (req.file) {
            dadosAtualizados.foto = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const gestor = await Gestor.findByIdAndUpdate(
            gestorId,
        dadosAtualizados,       
            { new: true }
        ).select('-senha');

        if (!gestor) {
            return res.status(404).json({ message: 'Gestor não encontrado' });
        }

        // Atualizar o gestor no localStorage
        const gestorAtualizado = gestor.toObject();
        delete gestorAtualizado.senha;

        res.json({
            message: "Gestor atualizado com sucesso",
            gestor: gestorAtualizado
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const AtualizarFotoGestor = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhuma foto fornecida' });
        }

        const gestor = await Gestor.findByIdAndUpdate(
            req.params.id,
            {
                foto: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            },
            { new: true }
        ).select('-senha');

        if (!gestor) {
            return res.status(404).json({ message: 'Gestor não encontrado' });
        }

        res.json(gestor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const atualizarGestor = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    // Se houver upload de nova foto
    if (req.file) {
      dadosAtualizados.foto = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    // Remover campos sensíveis que não devem ser atualizados
    delete dadosAtualizados.senha;

    const gestorAtualizado = await Gestor.findByIdAndUpdate(
      id,
      dadosAtualizados,
      { new: true, runValidators: true }
    );

    if (!gestorAtualizado) {
      return res.status(404).json({ message: "Gestor não encontrado" });
    }

    // Remover dados sensíveis antes de enviar resposta
    const gestorResponse = gestorAtualizado.toObject();
    delete gestorResponse.senha;

    res.status(200).json({
      message: "Gestor atualizado com sucesso",
      gestor: gestorResponse
    });

  } catch (error) {
    console.error("Erro ao atualizar gestor:", error);
    res.status(500).json({ message: "Erro ao atualizar gestor", error: error.message });
  }
};

export { Cadastrar, Login, GestorDados, AtualizarGestor, AtualizarFotoGestor };