import Express from 'express';
import { criarSetores } from './controllers/Setor.controller.js';
import { criarCargos } from './controllers/Cargo.controller.js';
import ocorrenciaRouter from './routes/Ocorrencia.routes.js';

criarSetores() // Criar e popular o banco de Setores.
criarCargos() // Criar e popular a tabela de Cargos.

const app = Express();

import Cors from 'cors';

/* imports para tornar uploads a pasta estática */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* Configurando uploads como pasta estática */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, 'uploads');

// Configuração do CORS antes das rotas estáticas
app.use(Cors());
app.use(Express.json());

// Configuração mais específica para servir arquivos estáticos
app.use('/uploads', Express.static(uploadsPath));

// Middleware para debug das requisições de imagem
app.use('/uploads', (req, res, next) => {
    console.log('Requisição de imagem:', req.url);
    next();
});

// Middleware para verificar se o arquivo existe
app.use('/uploads', (req, res, next) => {
    const filePath = path.join(uploadsPath, req.url);
    if (fs.existsSync(filePath)) {
        next();
    } else {
        console.error('Arquivo não encontrado:', filePath);
        res.status(404).send('Arquivo não encontrado');
    }
});

// Define a porta em que o servidor irá escutar
const port = 5000;

import Mongoose from 'mongoose';

import gestorRouter from './routes/Gestor.routes.js';
import colaboradorRouter from './routes/Colaborador.routes.js';
import setorRouter from './routes/Setor.routes.js'
import cargoRouter from './routes/Cargo.routes.js'

app.listen(port, () => {
    console.log(`Server on: http://localhost:${port}`);

    /* mongodb+srv://admin:admin@vigillatus.b1syd.mongodb.net/Vigillatus?retryWrites=true&w=majority&appName=Vigillatus */

    Mongoose.connect('mongodb://127.0.0.1:27017/Vigillatus')
        .then(() => {
            console.log('Connected to database');
        })
        .catch((error) => {
            console.log('Error: ', error);
        });

        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath, { recursive: true, mode: 0o755 });
            console.log('Pasta uploads criada com sucesso');
        } else {
            try {
                fs.accessSync(uploadsPath, fs.constants.R_OK | fs.constants.W_OK);
                console.log('Pasta uploads com permissões corretas');
            } catch (err) {
                console.error('Erro de permissão na pasta uploads:', err);
                fs.chmodSync(uploadsPath, 0o755);
            }
        }
});

app.use('/Gestor', gestorRouter);
app.use('/Colaborador', colaboradorRouter)
app.use('/Ocorrencia', ocorrenciaRouter)
app.use('/Setor', setorRouter)
app.use('/Cargo', cargoRouter)

// Adicione isso após a criação da pasta uploads
const checkUploadsStructure = () => {
    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true, mode: 0o755 });
        console.log('Pasta uploads criada com sucesso');
    }

    // Lista todos os arquivos na pasta uploads
    const files = fs.readdirSync(uploadsPath, { recursive: true });
    console.log('Arquivos na pasta uploads:', files);

    // Verifica permissões
    try {
        fs.accessSync(uploadsPath, fs.constants.R_OK | fs.constants.W_OK);
        console.log('Permissões da pasta uploads OK');
    } catch (err) {
        console.error('Erro de permissão na pasta uploads:', err);
        fs.chmodSync(uploadsPath, 0o755);
    }
};

checkUploadsStructure();