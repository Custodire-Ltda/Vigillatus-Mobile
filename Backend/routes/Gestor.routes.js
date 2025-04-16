import Express from 'express';

const gestorRouter  = Express.Router();

import authMiddleware from '../Middleware/authmiddleware.js';

// Importa o módulo Multer para lidar com uploads de arquivos
import Multer from 'multer';

const Storage = Multer.memoryStorage({});
const Upload = Multer({storage: Storage});

import {Cadastrar, Login, GestorDados, AtualizarGestor, AtualizarFotoGestor} from '../controllers/Gestor.controller.js';

gestorRouter.post('/', Upload.single('foto'), Cadastrar);
gestorRouter.post('/Login', Login);
gestorRouter.get('/Dados', authMiddleware, GestorDados);
gestorRouter.put('/:id', Upload.single('foto'), authMiddleware, AtualizarGestor);
gestorRouter.put('/:id/foto', Upload.single('foto'), authMiddleware, AtualizarFotoGestor);

export default gestorRouter;