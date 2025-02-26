import Express from 'express';
import { criarSetores } from './controllers/Setor.controller.js';
import { criarCargos } from './controllers/Cargo.controller.js';
import ocorrenciaRouter from './routes/Ocorrencia.routes.js';

criarSetores() // Criar e popular o banco de Setores.
criarCargos() // Criar e popular a tabela de Cargos.

const app = Express();

import Cors from 'cors';

app.use(Express.json());
app.use(Cors());

// Define a porta em que o servidor irá escutar
const port = 5000;

import Mongoose from 'mongoose';

import gestorRouter from './routes/Gestor.routes.js';
import cookieParser from 'cookie-parser';
import colaboradorRouter from './routes/Colaborador.routes.js';
import setorRouter from './routes/Setor.routes.js'
import cargoRouter from './routes/Cargo.routes.js'

app.listen(port, () => {
    console.log(`Server on: http://localhost:${port}`);

    Mongoose.connect('mongodb+srv://admin:admin@vigillatus.b1syd.mongodb.net/Vigillatus?retryWrites=true&w=majority&appName=Vigillatus')
        .then(() => {
            console.log('Connected to database');
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
});

app.use('/Gestor', gestorRouter);
app.use('/Colaborador', colaboradorRouter)
app.use('/Ocorrencia', ocorrenciaRouter)
app.use('/Setor', setorRouter)
app.use('/Cargo', cargoRouter)