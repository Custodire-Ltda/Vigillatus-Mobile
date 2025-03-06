import Colaborador from '../models/Colaborador.model.js';
import jwt from 'jsonwebtoken';
import authMiddleware from '../Middleware/authmiddleware.js';

const CadastrarColaborador = async (req, res) => {
    try {
        const { nome, email, telefone, setor, cargo, registro } = req.body;

        const emailExistente = await Colaborador.findOne({ email });

        if (emailExistente) {
            return res.status(400).json({ message: 'email já em uso' })
        }

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

const Login = async (req, res) => {
    try {
        const { nome, email } = req.body;
        
        const colaborador = await Colaborador.findOne({ email });
        
        if (!colaborador) {
            return res.status(400).json({ message: 'Email não encontrado' });
        }

        const nomeValido = nome == colaborador.nome;

        if (!nomeValido) {
            return res.status(400).json({ message: 'Credenciais incorretas' });
        }

        // Gera um token JWT com as informações do colaborador e define a expiração
        const token = jwt.sign(
            { id: colaborador._id, email: colaborador.email },
            'Secret', // Substituir 'Secret' por uma chave secreta mais segura em produção
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        // Cria um novo objeto colaborador sem a propriedade 'senha'
        const { senha: _, ...colaboradorTrimmed } = colaborador.toObject();

        res.status(200).json({ message: 'Login de colaborador realizado com sucesso', token, colaborador: colaboradorTrimmed });

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
        let ordenar = req.query.ordenar;

        let ordem = 1;
        if (ordenar === 'desc') {
            ordem = -1;
        }   

        const colaboradores = await Colaborador.find({ gestorId: req.userId }).sort({ nome: ordem });

        res.status(200).json(colaboradores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { CadastrarColaborador, ColaboradoresDoGestor, getColaborador, Login };
