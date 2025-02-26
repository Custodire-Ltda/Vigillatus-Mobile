import Gestor from '../models/Gestor.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleware from '../Middleware/authmiddleware.js';

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

export { Cadastrar, Login, GestorDados };